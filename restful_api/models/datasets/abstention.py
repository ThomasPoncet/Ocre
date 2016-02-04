from ..base_queries import DBConnector

class POURCENTAGES_ABSTENTION_MOYEN(DBConnector):
    """Classe qui retourne un tableau des pourcentages d'abstention"""

    @property
    def data(self):

        data_turn_1 = list(self.first_ballot_dept.find({}, {"registered_voters" : 1, "non_voters" : 1}))
        data_turn_2 = list(self.second_ballot_dept.find({}, {"registered_voters" : 1, "non_voters" : 1}))
        return { dept_turn1["_id"] : ((dept_turn1["non_voters"] / dept_turn1["registered_voters"])
                                      +
                                      (dept_turn2["non_voters"] / dept_turn2["registered_voters"])
                                      ) / 2
                for dept_turn1,dept_turn2  in zip(data_turn_1,  data_turn_2)}

