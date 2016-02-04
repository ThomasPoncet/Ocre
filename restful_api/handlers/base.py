import json

from flask_restful import Resource, reqparse

from models import ListesQueries, RoundNumber
from models.base_queries import VotesQueries


class BaseHandler(Resource):
    def __init__(self):
            """The constructor for this abstract class just creates a request_parser"""
            super().__init__()
            self.reqparse = reqparse.RequestParser()

    def do_request_parsing(self):
        self.args = self.reqparse.parse_args()

class BaseByRoundHandler(BaseHandler):
    """Pour toutes les requêtes qui sont paramétrées par un tour"""
    def __init__(self):
        super().__init__()
        self.reqparse.add_argument("tour", type=int, default=1)

    def do_request_parsing(self):
        super().do_request_parsing()
        self.round_number = RoundNumber.FIRST if self.args["tour"] == 1 else RoundNumber.SECOND


class RetrieveListesHandler(BaseByRoundHandler):
    """Permet de récupérer les listes électorales pour un tour donné"""
    def get(self):
        self.do_request_parsing()
        return ListesQueries().retrieve_listes_for_poll(self.round_number)

class BaseByListeHandler(BaseByRoundHandler):
    def __init__(self):
        super().__init__()
        self.reqparse.add_argument("liste_ids", type=str, required=True)

    def do_request_parsing(self):
        super().do_request_parsing()
        self.liste_ids = json.loads(self.args["liste_ids"])

class RetrieveVotesHandler(BaseByListeHandler):
    """Permet de récupérer le total des votes pour un parti donné, pour un tour donné"""
    def get(self):
        self.do_request_parsing()
        return VotesQueries().retrieve_total_votes_for_liste(self.round_number, self.liste_ids)

class RetrieveVotesByDeptsHandler(BaseByRoundHandler):
    """Recupère les totaux de votes pour un département par tour"""
    def get(self):
        self.do_request_parsing()
        return VotesQueries().retrieve_basic_vote_data(self.round_number)

class RetrieveGlobalDataHandler(BaseByRoundHandler):
    """Récupère les données globales à la france, pour un tour donnée"""

    def get(self):
        self.do_request_parsing()
        return VotesQueries().retrieve_global_data(self.round_number)
