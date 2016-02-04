from .data_chomage import POURCENTAGE_CHOMAGE_PAR_DEPTS
from .data_nuptialite import POURCENTAGE_TAUX_NUPTIALITE_PAR_MILLE_PAR_DEPTS
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

from ..constants import DatasetType

DATASET_TYPE_TO_OBJECTS = {DatasetType.UNEMPLOYMENT: POURCENTAGE_CHOMAGE_PAR_DEPTS,
                           DatasetType.WEDDINGS : POURCENTAGE_TAUX_NUPTIALITE_PAR_MILLE_PAR_DEPTS,
                           DatasetType.EVOLUTION_JOB : POURCENTAGE_EVOLUTION_EMPLOI_PAR_DEPTS,
                           DatasetType.NATALITY : POURCENTAGE_TAUX_NATALITE_BRUT_PAR_MILLE_PAR_DEPTS,
                           DatasetType.ABSTENTION: POURCENTAGES_ABSTENTION_MOYEN().data,
                           DatasetType.PACS: POURCENTAGE_PACS_PAR_DEPTS,
                           DatasetType.DIPLOME: DIPLOME_ENSEIGNEMENT_SUPERIEUR_PAR_DEPTS,
                           DatasetType.NON_DIPLOME: NON_DIPLOME_PAR_DEPTS,
                           DatasetType.LOGEMENT_SECONDAIRE: LOGEMENT_SECONDAIRE_PAR_DEPTS,
                           DatasetType.LOGEMENT_SOCIAUX: LOGEMENT_SOCIAUX_PAR_DEPTS,
                           DatasetType.MINIMA: MINIMA_SOCIAUX_PAR_DEPTS,
                           DatasetType.NIVEAU_DE_VIE: NIVEAU_DE_VIE_EN_EUROS_PAR_DEPTS }