from .base import BaseByListeHandler, BaseHandler
from flask_restful import Resource
from models.correlations import DataCorellator
from models.datasets import DatasetManager



class RetrieveDatasetsHandler(Resource):
    """Fournit la liste des datasets déjà disponibles"""
    def get(self):
        return DatasetManager.get_datasets_list()

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
                 for k, v in DatasetManager.from_id(self.dataset_id).items()]


class RetrieveCorrellationHandler(BaseByListeHandler, BaseByDatasetIdHandler):
    """Retourne la liste des points pour le graphe en ligne, pour un tour, une liste et un dataset donné"""

    def get(self):
        self.do_request_parsing()
        return DataCorellator().get_correlation_data(self.round_number,
                                                     self.liste_ids,
                                                     DatasetManager.from_id(self.dataset_id))
