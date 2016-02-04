from .base import BaseByListeHandler, BaseHandler
from flask_restful import Resource
from models.constants import DatasetType
from models.correlations import DataCorellator, DATASET_TYPE_TO_OBJECTS

DATASETS_NAMES = {DatasetType.UNEMPLOYMENT: "Chômage",
                  DatasetType.WEDDINGS : "Taux de Nuptialité",
                  DatasetType.EVOLUTION_JOB : "Taux d'Emploi",
                  DatasetType.NATALITY : "Taux de Natalité",
                  DatasetType.ABSTENTION: "Pourcentage moyen d'abstention"}


class RetrieveDatasetsHandler(Resource):
    """Fournit la liste des datasets déjà disponibles"""
    def get(self):
        return [{"id" : k.value, "name" : v } for k,v in DATASETS_NAMES.items()]

class BaseByDatasetIdHandler(BaseHandler):
    """Pour toutes les requêtes qui sont paramétrées par un tour"""
    def __init__(self):
        super().__init__()
        self.reqparse.add_argument("dataset_id", type=int, default=1)

    def do_request_parsing(self):
        super().do_request_parsing()
        self.dataset_id = self.args["dataset_id"]


class RetrieveDatasetDataHandler(BaseByDatasetIdHandler):
    """Renvoie les données brutes d'un dataset donné"""

    def get(self):
        self.do_request_parsing()
        return [ {"id": k, "percentage" : v }
                 for k, v in DATASET_TYPE_TO_OBJECTS[DatasetType(self.dataset_id)].items()]


class RetrieveCorrellationHandler(BaseByListeHandler, BaseByDatasetIdHandler):
    """Retourne la liste des points pour le graphe en ligne, pour un tour, une liste et un dataset donné"""

    def get(self):
        self.do_request_parsing()
        return DataCorellator().get_correlation_data(self.round_number,
                                                     self.liste_ids,
                                                     DatasetType(self.dataset_id))