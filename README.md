# Ocre
Observation et comparaison des résultats des élections

## Données
### Fonds de carte
Nous avons récupéré le shapefile des départements français sur le site IGN ([GEOFLA](http://professionnels.ign.fr/geofla)). Nous les avons ensuite converti avec en geoJSON en changeant le réferentiel pour WGS84) avec [mygeodata converter](http://converter.mygeodata.eu/). Enfin nous les avons simplifiés en éliminant des éléments de géométrie inutiles pour notre utilisation pour gagner en taille (de 8.4 Mo à 370 ko) avec [mapshaper](http://www.mapshaper.org/).
