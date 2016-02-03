# L'API rest d'OCRE

Voici les instructions tant attendues pour faire tourner l'API rest nécessaire au bon fonctionnement du frontend web d'OCRE.

## Les dépendances logicielles

Il faut installer mongodb, mais la version 3.0. Donc, pour Ubuntu et le reste, en général pas encore dans les dépôts!
Aller ici pour apprendre à faire l'install https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04

Ensuite, il faut python3. Pour ubuntu c'est comme ça:

`sudo apt-get install python3 python3-pip python3-numpy`

(oui tant qu'à faire, on en profite pour installer numpy)
Ensuite, il faut installer les bibliothèques pymongo, flask-restful, et sklearn. Allons-y.

`sudo pip3 install pymongo sklearn flask-restful`

Si des erreurs sortent à l'install du module sklearn, vérifiez que vous avez les bons paquets nécessaires à la compilation des éventuels binaires C.

## Le Remplissage de la base

Pour insérer les données brutes dans la base (à partir des deux CSV), il faut faire

`mongoimport --db polldata --collection t1_full --type csv --headerline regionales-2015-communes.csv`
Pour le tour 1
`mongoimport --db polldata --collection t2_full --type csv --headerline Reg_15_Resultats_Communes_T2.csv`
Pour le tour 2.

C'est pas fini. Trouvez le script "database_loader.py", et lancez le avec

`python3 database_loader.py`

C'est bon pour la base

## Lancer le serveur de l'API

lol y'a quasi rien à faire en fait:

`python3 app.py`
