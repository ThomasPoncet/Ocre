from pymongo import MongoClient

from models.constants import SECOND_ROUND_LISTES_COLLECTION, SECOND_ROUND_PER_DEPTS_COLLECTION
from .constants import DB_ADDRESS, FIRST_ROUND_PER_DEPTS_COLLECTION, RoundNumber, FIRST_ROUND_LISTES_COLLECTION

class DBConnector(object):
    """Automatically connects when instantiated"""

    def __init__(self):
        self.client = MongoClient(DB_ADDRESS) # connecting to the db
        self.db = self.client['polldata'] # opening a DB
        self.first_ballot_dept = self.db[FIRST_ROUND_PER_DEPTS_COLLECTION]
        self.second_ballot_dept = self.db[SECOND_ROUND_PER_DEPTS_COLLECTION]
        self.listes_t1 = self.db[FIRST_ROUND_LISTES_COLLECTION]
        self.listes_t2 = self.db[SECOND_ROUND_LISTES_COLLECTION]

    def dept_col(self, ballot_number):
        if ballot_number == RoundNumber.FIRST:
            return self.first_ballot_dept
        else:
            return self.second_ballot_dept


class ListesQueries(DBConnector):

    def retrieve_listes_for_poll(self, round_number):
        if round_number == RoundNumber.FIRST:
            collection = self.listes_t1
        else:
            collection = self.listes_t2
        return [entry for entry in collection.find({}, {"head" : 0})]


class VotesQueries(DBConnector):

    def retrieve_total_votes_for_liste(self, round_number, liste_ids):
        """Récupérer les pourcentages de vote aggrégés pour plusieurs listes"""
        pipeline = [
            {"$project" : {"_id" : 1, "poll_outcome" : 1}},
            {"$unwind" : "$poll_outcome"},
            {"$match" : { "poll_outcome.liste_id" : { "$in" : liste_ids}}},
            {"$group" : { "_id" : "$_id", "vote_percentage" : {"$sum" : "$poll_outcome.liste_percentage"}}}
        ]

        return list(self.dept_col(round_number).aggregate(pipeline))


    def retrieve_basic_vote_data(self, round_number):
        """Données de base pour toutes les listes, par département"""

        data_by_dept = list(self.dept_col(round_number).find())
        return [{"dept_code" : dept_data["_id"],
                 "poll_outcome" : dept_data["poll_outcome"], # donnée par liste candidate
                 "pourcentage_absention" : dept_data["non_voters"] / dept_data["registered_voters"],
                 "pourcentage_votants" : dept_data["voters"] / dept_data["registered_voters"],
                 "pourcentage_blancs" : dept_data["voters"] / dept_data["expressed"],
                 "pourcentage_exprimes" : dept_data["expressed"] / dept_data["expressed"]
                 }
                for dept_data  in data_by_dept]

    def retrieve_global_data(self, round_number):
        """Données pour toute la france"""

        pipeline_global_stats = [
            {"$group" : { "_id" : 1,
                          "total_inscrit" : {"$sum" : "$registered_voters"},
                          "total_abstention" : {"$sum" : "$non_voters"},
                          "total_blanc" : {"$sum" : "$blank"},
                          "total_exprime" : {"$sum" : "$expressed"},
                          "total_votants" : {"$sum" : "$voters"}}}
        ]
        result = next(self.dept_col(round_number).aggregate(pipeline_global_stats))
        del result["_id"]
        result.update({"pourcentage_abstention" :result["total_abstention"] / result["total_inscrit"],
                       "pourcentage_votants" : result["total_votants"] / result["total_inscrit"],
                       "pourcentage_blanc" :  result["total_blanc"] / result["total_votants"]})
        return result


