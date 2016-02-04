from numpy import dot, array, mean, ndarray
from numpy.linalg.linalg import norm
import matplotlib as mpl
import matplotlib.cm as cm
import matplotlib.pyplot as plt
from matplotlib.colors import rgb2hex, colorConverter
from sklearn import preprocessing, linear_model

from models.base_queries import DBConnector, VotesQueries
from models.constants import DatasetType, RoundNumber
from models.datasets import POURCENTAGE_CHOMAGE_PAR_DEPTS, \
    POURCENTAGE_TAUX_NUPTIALITE_PAR_MILLE_PAR_DEPTS, \
    POURCENTAGE_EVOLUTION_EMPLOI_PAR_DEPTS, \
    POURCENTAGE_TAUX_NATALITE_BRUT_PAR_MILLE_PAR_DEPTS


DATASET_TYPE_TO_OBJECTS = {DatasetType.UNEMPLOYMENT: POURCENTAGE_CHOMAGE_PAR_DEPTS,
                            DatasetType.WEDDINGS : POURCENTAGE_TAUX_NUPTIALITE_PAR_MILLE_PAR_DEPTS,
                            DatasetType.EVOLUTION_JOB : POURCENTAGE_EVOLUTION_EMPLOI_PAR_DEPTS,
                            DatasetType.NATALITY : POURCENTAGE_TAUX_NATALITE_BRUT_PAR_MILLE_PAR_DEPTS}

class DataCorellator(VotesQueries):

    def _compute_colors(self, array_x, array_y):
        # on calcule le maximum absolu de toutes valeurs pour former un carré
        abs_maximum = max([max(map(abs,array_x)), max(map(abs,array_y))])
        diagonal_length = norm(array([abs_maximum, abs_maximum])) # longueur de la projection
        diag = array([diagonal_length, diagonal_length])

        # on instancie le gradient de couleur sur le modèle "seismic_r"
        normalized = mpl.colors.Normalize(vmin=-abs_maximum, vmax=abs_maximum)
        color_map = cm.seismic_r

        color_gradient = cm.ScalarMappable(norm=normalized, cmap=color_map)

        # on calcule le produit scalaire de chaque valeur avec la diagonale
        # ensuite, on calcule la couleur à partir de la valeur de la projection sur la diagonale
        hex_color_values = []
        for i, x in enumerate(array_x):
            scal_p = dot(array([array_x[i], array_y[i]]), diag) / diagonal_length
            hex_color_values.append(rgb2hex(colorConverter.to_rgb(color_gradient.to_rgba(scal_p))))

        return hex_color_values, abs_maximum

    def get_correlation_data(self,round_number, liste_id, dataset_type):
        points = []
        # on sélectionne le dataset en fonction de l'argument
        dataset = DATASET_TYPE_TO_OBJECTS[dataset_type]
        poll_data = self.retrieve_total_votes_for_liste(round_number, liste_id)

        # on range les des données dans un dico propre
        data_x, data_y = [],[]
        for dept_data in poll_data:
            data_x.append(dept_data["vote_percentage"])
            data_y.append(dataset[dept_data["_id"]] / 100)
            points.append({"dept_id" : dept_data["_id"],
                           "votes_percentage" : dept_data["vote_percentage"],
                           "other_percentage" : dataset[dept_data["_id"]] / 100})

        data_x_array = array(data_x).reshape((len(data_x),1))
        data_y_array = array(data_y)

        data_x_train = data_x_array[:-10]
        data_x_test = data_x_array[-10:]
        data_y_train = data_y_array[:-10]
        data_y_test = data_y_array[-10:]

        # plt.plot(rescaled_x, rescaled_y, "ro")
        # plt.axhline(y=0, color='k')
        # plt.axvline(x=0, color='k')
        # plt.show()

        model = linear_model.LinearRegression()
        model.fit(data_x_array, data_y_array)
        # The coefficients
        print('Coefficients: \n', model.coef_)
        # The mean square error
        print("Residual sum of squares: %f"
              % mean((model.predict(data_x_test) - data_y_test) ** 2))

        # Explained variance score: 1 is perfect prediction
        print('Variance score: %.2f' % model.score(data_x_test, data_y_test))

        # Plot outputs
        plt.scatter(data_x_test, data_y_test,  color='black')
        plt.scatter(data_x_train, data_y_train,  color='red')
        plt.scatter(data_x_array, model.predict(data_x_array), color='blue')

        plt.xticks(())
        plt.yticks(())

        plt.show()



correlator = DataCorellator()
correlator.get_correlation_data(RoundNumber.FIRST, ["LFN"], DatasetType.UNEMPLOYMENT)