from flask import Flask
from flask_restful import Api

from handlers import RetrieveListesHandler, RetrieveTotalVotesHandler

app = Flask(__name__)
api = Api(app)

### This is the api's routing table

# récupération des listes, params : tour = 1 | 2
api.add_resource(RetrieveListesHandler, '/listes')

# récupération du total des votes pour une liste_id donnée, pour un tour donné
api.add_resource(RetrieveTotalVotesHandler, "/total_votes")

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0") # served on the local network