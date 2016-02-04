# Ocre
Observation et comparaison des résultats des élections

____



## Démarche pour le projet
Nous avons d'abord souhaité répondre à la demande de l'école de journalisme de Grenoble, pour visualiser et interpréter les résultats des dernières élections. N'ayant plus eu de contact avec l'école de journalisme nous avons décidé de proposer un outil permettant de comparer les résultats de ces élections, avec un autre jeu de donnée OpenData. Le but étant de proposer un outil qui, dans sa version finale, accepte n'importe quel jeu de donnée géolocalisé (suivant une norme) en entrée. Pour comparer ces jeux de donnée, nous proposons de les visualiser en même temps sur une carte de France.
Le rendu final sera la dernière itération éffectuée et ne sera peut être pas identique au projet initial.

Le projet s'est déroulé sur plusieurs phases :
  1. récupérer les données et générer notre propre base de données
  2. Créer un template et un premier visuel de l'application
  3. Relier la base de données (serveur - back-end) avec l'application (client - front-end)
  4. Afficher plusieurs outils de visualisation
  5. Permettre l'ajout de nouvelles données par le client

## Récupération des différents jeux de données
### Résultat des élections
Nous avons récupéré les données des élections régionales (premier et second tour) de 2015 en France via un contact de l'école de journalisme de Grenoble. Pour plus de compréhension, il est important de savoir que les différents parties et rassemblements politiques sont définis par un libéllé bien précis :
  - LDIV : Liste Divers
  - LECO : Liste Ecologistes Indépendantes
  - LUDI : Liste Union des Démocrates et
des Indépendants
  - LUG : Liste d'Union de la gauche
  - LCOM : Liste présentée par le PCF hors de l'alliance du Front de gauche
  - LDVG : Liste divers gauche
  - LEXG : Liste d'extrême gauche
  - LRDG : Liste Corse "La Garantie Républicaine"
  - LREG : Liste régionaliste
  - LSOC : Liste du parti socialiste
  - LEXD : Liste d'extrême droite
  - LLR : Liste Les Républicains
  - LMDM : Liste Modem
  - LFN : Liste du Front National
  - LVEC : Liste présentée par Europe Écologie Les Verts
  - LFG : Liste Front de Gauche
  - LUD : Liste Union de la Droite
  - LDVD : Liste divers droite
  - LVEG : liste d'un rassemblement citoyen comprenant Europe Écologie Les Verts, le Parti de gauche (PG) du Front de Gauche, la Nouvelle gauche socialiste (parti composé de dissidents venant du Parti socialiste) et de Nouvelle Donne
  - LDLF : Liste Debout La France

Avec les sources :
  - http://www.localtis.info/cs/BlobServer?blobkey=id&blobnocache=true&blobwhere=1250168333702&blobheader=application%2Fpdf&blobcol=urldata&blobtable=MungoBlobs
  - http://www.senat.fr/senatoriales_2011/liste_des_nuances_politiques_des_candidats_et_des_listes.html
  - http://www.gironde.gouv.fr/content/download/19597/118216/file/GRILLE%20DES%20NUANCES%20POLITIQUES%20DES%20LISTES.pdf


### Base de données gouvernementale
Nous avons utilisé les données de l'INSEE pour pouvoir les confronter aux résultats des élections. Nous avons fait le choix de prendre le taux de nuptialité, de chomage, de natalité et l'évolution des l'emploi en France. Ce sont des données départemantales.

## Traitements opérés



## Architecture
L'Architecture de ce projet est assez simple. Celle du serveur est visible sur le schéma suivant :

<img src = "serveur.png" title = "Serveur" alt = "Serveur">


Celle du client est présentée sur le schéma suivant :
[image]

## Outils utilisés
### Client (Front-end)
#### Fonds de carte
Nous avons récupéré le shapefile des départements français sur le site IGN ([GEOFLA](http://professionnels.ign.fr/geofla)). Nous les avons ensuite converti avec en geoJSON en changeant le réferentiel pour WGS84) avec [mygeodata converter](http://converter.mygeodata.eu/). Enfin nous les avons simplifiés en éliminant des éléments de géométrie inutiles pour notre utilisation pour gagner en taille (de 8.4 Mo à 370 ko) avec [mapshaper](http://www.mapshaper.org/).

#### Angular

#### D3JS



### Serveur (Back-end)
#### MongoDB
#### Python
