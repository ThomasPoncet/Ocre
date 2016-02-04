from numpy import dot
import matplotlib as mpl
import matplotlib.cm as cm
from matplotlib.colors import rgb2hex
from matplotlib.colors import colorConverter
from sklearn import preprocessing
from numpy import array

from .base_queries import DBConnector, VotesQueries
from .constants import DatasetType
from .datasets import POURCENTAGE_CHOMAGE_PAR_DEPTS, POURCENTAGE_TAUX_NUPTIALITE_PAR_MILLE_PAR_DEPTS, POURCENTAGE_EVOLUTION_EMPLOI_PAR_DEPTS, POURCENTAGE_TAUX_NATALITE_BRUT_PAR_MILLE_PAR_DEPTS


DATASET_TYPE_TO_OBJECTS = {DatasetType.UNEMPLOYMENT: POURCENTAGE_CHOMAGE_PAR_DEPTS,
                            DatasetType.WEDDINGS : POURCENTAGE_TAUX_NUPTIALITE_PAR_MILLE_PAR_DEPTS,
                            DatasetType.EVOLUTION_JOB : POURCENTAGE_EVOLUTION_EMPLOI_PAR_DEPTS,
                            DatasetType.NATALITY : POURCENTAGE_TAUX_NATALITE_BRUT_PAR_MILLE_PAR_DEPTS}

class DataCorellator(VotesQueries):

    def _compute_colors(self, array_x, array_y):
        # on calcule le maximum absolu de toutes valeurs pour former un carré
        abs_maximum = max([map(abs,array_x), map(abs,array_y)])
        diagonal_length = norm(array([abs_maximum, abs_maximum])) # longueur de la projection
        diag = array([diagonal_length, diagonal_length])

        # on instancie le gradient de couleur sur le modèle "seismic_r"
        norm = mpl.colors.Normalize(vmin=-abs_maximum, vmax=abs_maximum)
        color_map = cm.seismic_r

        color_gradient = cm.ScalarMappable(norm=norm, cmap=color_map)

        # on calcule le produit scalaire de chaque valeur avec la diagonale
        # ensuite, on calcule la couleur à partir de la valeur de la projection sur la diagonale
        scalar_products = []
        for i, x in enumerate(array_x):
            scal_p = dot(array([array_x[i]], array_y[i]), diagonal_length) / diagonal_length
            scalar_products.append(rgb2hex(colorConverter.to_rgb(color_gradient.to_rgba(scal_p))))

        return scalar_products

    def get_correlation_data(self,round_number, liste_id, dataset_type):
        points = []
        dataset = DATASET_TYPE_TO_OBJECTS[dataset_type]
        poll_data = self.retrieve_total_votes_for_liste(round_number, liste_id)
        #extraction des données dans un dico propre
        data_x, data_y = [],[]
        for dept_data in poll_data:
            data_x.append(dept_data["vote_percentage"])
            data_y.append(dataset[dept_data["_id"]])
            points.append({"dept_id" : dept_data["_id"],
                           "votes_percentage" : dept_data["vote_percentage"],
                           "other_percentage" : dataset[dept_data["_id"]]})

        rescaled_x = preprocessing.scale(array(data_x))
        rescaled_y = preprocessing.scale(array(data_y))
        colors = self._compute_colors(rescaled_x, rescaled_y)

        # plt.plot(rescaled_x, rescaled_y, "ro")
        # plt.axhline(y=0, color='k')
        # plt.axvline(x=0, color='k')
        # plt.show()

        for i, x in enumerate(rescaled_x):
            points[i]["votes_normalized"] = rescaled_x[i]
            points[i]["other_normalized"] = rescaled_y[i]
            points[i]["color"] = colors

        return points
