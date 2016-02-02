# Ocre
Observation et comparaison des résultats des élections

____

## Le projet
Nous avons d'abord souhaité répondre à la demande de l'école de journalisme de Grenoble, pour visualiser et interpréter les résultats des dernières élections. N'ayant plus eu de contact avec l'école de journalisme nous avons décidé de proposer un outil permettant de comparer les résultats de ces élections, avec un autre jeu de donnée OpenData. Le but étant de proposer un outil qui, dans sa version finale, accepte n'importe quel jeu de donnée géolocalisé (suivant une norme) en entrée. Pour comparer ces jeux de donnée, nous proposons de les visualiser en même temps sur une carte de France, avec un zoom par pas (les pas suivant le découpage administratif français).

## Récupération des différents jeux de données
### Résultat des élections
Nous avons récupéré les données des élections régionales (premier et second tour) de 2015 en France via un contact de l'école de journalisme de Grenoble.

### Base de données gouvernementale
Nous avons utilisé les données de l'INSEE et du ministère de l'éducation national pour pouvoir les confronter aux résultats des élections

### Fonds de carte
Nous avons récupéré le shapefile des départements français sur le site IGN ([GEOFLA](http://professionnels.ign.fr/geofla)). Nous les avons ensuite converti avec en geoJSON en changeant le réferentiel pour WGS84) avec [mygeodata converter](http://converter.mygeodata.eu/). Enfin nous les avons simplifiés en éliminant des éléments de géométrie inutiles pour notre utilisation pour gagner en taille (de 8.4 Mo à 370 ko) avec [mapshaper](http://www.mapshaper.org/).
