import enum

from .data_chomage import POURCENTAGE_CHOMAGE_PAR_DEPTS
from .data_evolution_emploi_2014 import POURCENTAGE_EVOLUTION_EMPLOI_PAR_DEPTS
from .data_taux_natalite_par_mille_2013 import POURCENTAGE_TAUX_NATALITE_BRUT_PAR_MILLE_PAR_DEPTS
from .abstention import POURCENTAGES_ABSTENTION_MOYEN
from .data_enseignement_superieur import DIPLOME_ENSEIGNEMENT_SUPERIEUR_PAR_DEPTS
from .data_non_diplome import NON_DIPLOME_PAR_DEPTS
from .data_taux_nuptialite_par_mille_2013 import POURCENTAGE_TAUX_NUPTIALITE_PAR_MILLE_PAR_DEPTS
from .data_niveau_de_vie import NIVEAU_DE_VIE_EN_EUROS_PAR_DEPTS
from .data_minima_sociaux import MINIMA_SOCIAUX_PAR_DEPTS
from .data_pourcentage_pacs import POURCENTAGE_PACS_PAR_DEPTS
from .data_logement_sociaux import LOGEMENT_SOCIAUX_PAR_DEPTS
from .data_residence_secondaire import LOGEMENT_SECONDAIRE_PAR_DEPTS

class DatasetManager():

    class DatasetType(enum.Enum):
        UNEMPLOYMENT = 1
        WEDDINGS = 2
        EVOLUTION_JOB = 3
        NATALITY = 4
        ABSTENTION = 5
        PACS = 6
        DIPLOME = 7
        NON_DIPLOME = 8
        LOGEMENT_SECONDAIRE = 9
        LOGEMENT_SOCIAUX = 10
        MINIMA = 11
        NIVEAU_DE_VIE = 12

    _dataset_table = {DatasetType.UNEMPLOYMENT: {"name" : "Chômage",
                                                 "object" : POURCENTAGE_CHOMAGE_PAR_DEPTS},
                      DatasetType.WEDDINGS : {"name" : "Taux de Nuptialité",
                                              "object" : POURCENTAGE_TAUX_NUPTIALITE_PAR_MILLE_PAR_DEPTS},
                      DatasetType.EVOLUTION_JOB : {"name" : "Taux d'Emploi",
                                                   "object" : POURCENTAGE_EVOLUTION_EMPLOI_PAR_DEPTS},
                      DatasetType.NATALITY : {"name" : "Taux de Natalité",
                                              "object" : POURCENTAGE_TAUX_NATALITE_BRUT_PAR_MILLE_PAR_DEPTS},
                      DatasetType.ABSTENTION:{"name" :  "Pourcentage moyen d'abstention",
                                              "object" : POURCENTAGES_ABSTENTION_MOYEN().data},
                      DatasetType.PACS: {"name" : "Pourcentage de pacs en 2013",
                                         "object" : POURCENTAGE_PACS_PAR_DEPTS} ,
                      DatasetType.DIPLOME: {"name" : "Nombre de diplomés de l'enseignement supérieur",
                                            "object" : DIPLOME_ENSEIGNEMENT_SUPERIEUR_PAR_DEPTS},
                      DatasetType.NON_DIPLOME: {"name" : "Nombre de non-diplomés",
                                                "object" : NON_DIPLOME_PAR_DEPTS} ,
                      DatasetType.LOGEMENT_SECONDAIRE: {"name" : "Nombre de logements secondaires",
                                                        "object" : LOGEMENT_SECONDAIRE_PAR_DEPTS} ,
                      DatasetType.LOGEMENT_SOCIAUX: {"name" : "Nombre de logements sociaux",
                                                     "object" : LOGEMENT_SOCIAUX_PAR_DEPTS} ,
                      DatasetType.MINIMA: {"name" : "Part des minima sociaux sur la moyenne des revenus",
                                           "object" : MINIMA_SOCIAUX_PAR_DEPTS} ,
                      DatasetType.NIVEAU_DE_VIE: {"name" : "Niveau de vie",
                                                  "object" : NIVEAU_DE_VIE_EN_EUROS_PAR_DEPTS}}
    @staticmethod
    def from_id(id):
        return DatasetManager._dataset_table[DatasetManager.DatasetType(id)]["object"]

    @staticmethod
    def get_datasets_list():
        return [{"id" : k.value, "name" : v["name"] } for k,v in DatasetManager._dataset_table.items()]
