from .base_queries import DBConnector, VotesQueries
from .constants import DatasetType
from .datasets import POURCENTAGE_CHOMAGE_PAR_DEPTS, POURCENTAGE_TAUX_NUPTIALITE_PAR_MILLE_PAR_DEPTS, POURCENTAGE_EVOLUTION_EMPLOI_PAR_DEPTS, POURCENTAGE_TAUX_NATALITE_BRUT_PAR_MILLE_PAR_DEPTS
from sklearn import preprocessing
from numpy import array

DATASET_TYPE_TO_OBJECTS = {DatasetType.UNEMPLOYMENT: POURCENTAGE_CHOMAGE_PAR_DEPTS,
                            DatasetType.WEDDINGS : POURCENTAGE_TAUX_NUPTIALITE_PAR_MILLE_PAR_DEPTS}

class DataCorellator(VotesQueries):

    def get_correlation_data(self,round_number, liste_id, dataset_type):
        points = []
        dataset = DATASET_TYPE_TO_OBJECTS[dataset_type]
        poll_data = self.retrieve_total_votes_for_liste(round_number, liste_id)
        #extraction des données dans un dico propre
        data_x, data_y = [],[]
        for dept_data in poll_data:
            data_x.append(dept_data["poll_outcome"]["liste_votes"])
            data_y.append(dataset[dept_data["_id"]])
            points.append({"dept_id" : dept_data["_id"],
                           "votes_percentage" : dept_data["poll_outcome"]["liste_votes"],
                           "other_percentage" : dataset[dept_data["_id"]]})

        rescaled_x = preprocessing.scale(array(data_x))
        rescaled_y = preprocessing.scale(array(data_y))

        for x, i in enumerate(rescaled_x):
            points[i]["votes_normalized"] = rescaled_x[i]
            points[i]["other_normalized"] = rescaled_y[i]

        return points
