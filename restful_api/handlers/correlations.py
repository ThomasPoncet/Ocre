from .base import BaseByListeHandler
from flask_restful import Resource
from models.constants import DatasetType
from models.correlations import DataCorellator

DATASETS_NAMES = {DatasetType.UNEMPLOYMENT: "Chômage",
                  DatasetType.WEDDINGS : "Taux de Nuptialité",
                  DatasetType.EVOLUTION_JOB : "Taux d'Emploi",
                  DatasetType.NATALITY : "Taux de Natalité"}


class RetrieveDatasetsHandler(Resource):
    """Fournit la liste des datasets déjà disponibles"""
    def get(self):
        return [{"id" : k.value, "name" : v } for k,v in DATASETS_NAMES.items()]


class RetrieveCorrellationHandler(BaseByListeHandler):
    """Retourne la liste des points pour le graphe en ligne, pour un tour, une liste et un dataset donné"""

    def get(self):
        self.reqparse.add_argument("dataset_id", type=int, default=1)
        self.do_request_parsing()
        return DataCorellator().get_correlation_data(self.round_number,
                                                     self.liste_ids,
                                                     DatasetType(self.args["dataset_id"]))