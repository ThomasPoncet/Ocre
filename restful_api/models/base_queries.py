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

    def retrieve_total_votes_for_liste(self, round_number, liste_id):
        pipeline = [
            {"$project" : {"_id" : 1, "poll_outcome" : 1}},
            {"$unwind" : "$poll_outcome"},
            {"$match" : { "poll_outcome.liste_id" : liste_id}},
        ]

        return list(self.dept_col(round_number).aggregate(pipeline))


