from flask_restful import Resource

class FakeHandler(Resource):

    def get(self):
        return "<h1> Hello </h1>"