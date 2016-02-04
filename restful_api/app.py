from flask import Flask
from flask_restful import Api

from handlers import RetrieveListesHandler, RetrieveVotesHandler, RetrieveDatasetsHandler, \
    RetrieveCorrellationHandler, RetrieveVotesByDeptsHandler, RetrieveGlobalDataHandler

app = Flask(__name__)
api = Api(app)

### This is the api's routing table

# récupération des listes, params : tour = 1 | 2
api.add_resource(RetrieveListesHandler, '/api/listes')

# récupération du total des votes pour une liste de liste_id, pour un tour donné
api.add_resource(RetrieveVotesHandler, "/api/total_votes")

# récupération de données de base pour un tour, par département (taux blanc, abstention, pourcentage pour chaque liste)
api.add_resource(RetrieveVotesByDeptsHandler, "/api/basic_data")

# récupération des stats globales à la france
api.add_resource(RetrieveGlobalDataHandler, "/api/global")

#récupération de la liste des datasets
api.add_resource(RetrieveDatasetsHandler, "/api/datasets")

#récupération de la liste des datasets
api.add_resource(RetrieveCorrellationHandler, "/api/correlation")

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0") # served on the local network