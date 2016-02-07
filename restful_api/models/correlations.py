from numpy import dot, array
from numpy.linalg.linalg import norm
import matplotlib as mpl
import matplotlib.cm as cm
from matplotlib.colors import rgb2hex, colorConverter
from sklearn import preprocessing, linear_model

from models.colormap import redtoblue, make_white_gradient
from .base_queries import VotesQueries

class DataCorellator(VotesQueries):
    """Utilisé pour afficher des corrélations entre un dataset et un pourcentage de vote pour un groupe de listes donné.
    Hérite de VoteQueries pour utiliser la requête de votes pour un groupe de listes"""

    def _compute_colors(self, array_x, array_y):

        # on calcule le maximum absolu de toutes valeurs pour former un carré
        abs_maximum = max([max(map(abs,array_x)), max(map(abs,array_y))])
        diagonal_length = norm(array([abs_maximum, abs_maximum])) # longueur de la projection
        diag = array([diagonal_length, diagonal_length])
        anti_diag = array([-diagonal_length, diagonal_length])

        # on instancie le gradient de couleur sur le modèle de couleur du centre
        linear_normalizer = mpl.colors.Normalize(vmin=-abs_maximum, vmax=abs_maximum)
        log_normalizer = mpl.colors.SymLogNorm(abs_maximum/5, vmin=-abs_maximum, vmax=abs_maximum)
        r_to_b_gradient = cm.ScalarMappable(norm=linear_normalizer, cmap=redtoblue)

        # on calcule le produit scalaire de chaque valeur avec la diagonale
        # ensuite, on calcule la couleur à partir de la valeur de la projection sur la diagonale
        hex_color_values = []
        for i, x in enumerate(array_x):
            # on calcule les produits scalaire du point avec la diagonale et l'antidiagonale
            scal_p_diag = dot(array([array_x[i], array_y[i]]), diag) / diagonal_length
            scal_p_antidiag = dot(array([array_x[i], array_y[i]]), anti_diag) / diagonal_length

            #on calcule le gradient de couleur sur la diagonale
            on_diag_color = colorConverter.to_rgb(r_to_b_gradient.to_rgba(scal_p_diag))
            # puis on utilise cette couleur (en rgb) pour définir un gradient, dont la valeur sera estimée
            # sur l'antidiagonale
            on_diag_gradient = make_white_gradient(on_diag_color, log_normalizer)
            final_color = on_diag_gradient.to_rgba(scal_p_antidiag)

            #on traduit en HEX
            hex_color_values.append(rgb2hex(colorConverter.to_rgb(final_color)))

        return hex_color_values, abs_maximum

    def _linear_regression(self, array_x, array_y):
        """calcule les coefficients de la droite issus de la régression linéaire"""

        array_x_reshaped = array_x.reshape((len(array_x),1))
        model = linear_model.LinearRegression()
        model.fit(array_x_reshaped, array_y)

        return model.coef_[0], model.intercept_

    def get_correlation_data(self, round_number, liste_id, dataset):
        points = []

        #On récupère d'abord les pourcentages de vote pour la liste donnée
        poll_data = self.retrieve_total_votes_for_liste(round_number, liste_id)

        # on range les des données dans un dico propre
        data_x, data_y = [],[]
        for dept_data in poll_data:
            data_x.append(dept_data["vote_percentage"])
            data_y.append(dataset[dept_data["_id"]] / 100)
            points.append({"dept_id" : dept_data["_id"],
                           "votes_percentage" : dept_data["vote_percentage"],
                           "other_percentage" : dataset[dept_data["_id"]] / 100})

        array_x, array_y = array(data_x), array(data_y)

        # on normalise les données de vote et du dataset
        rescaled_x, rescaled_y  = preprocessing.scale(array_x), preprocessing.scale(array_y)

        #on calcule les couleurs pour chacun des départements
        colors, max_val = self._compute_colors(rescaled_x, rescaled_y)

        #surles données non normalisées, on calcule les coefficients de la droite de régression
        reg_slope, reg_y_intercept = self._linear_regression(array_x, array_y)

        for i, x in enumerate(rescaled_x):
            points[i]["votes_normalized"] = rescaled_x[i]
            points[i]["other_normalized"] = rescaled_y[i]
            points[i]["color"] = colors[i]

        return {"points" : points,
                "graph_metadata": {"max" : max_val,
                                   "regression": {"slope" : reg_slope,
                                                  "intercept" : reg_y_intercept}}}
