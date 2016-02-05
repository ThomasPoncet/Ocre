# L'API REST d'Ocre

Voici les instructions pour faire fonctionner l'API nécessaire au bon fonctionnement du front-end web d'Ocre.

___

**Table des matières**
- [Dépendances logicielles](#dépendances-logicielles)
- [Peuplement de la base](#peuplement-de-la-base)
    - [Première méthode : à la main](#première-méthode--à-la-main)
	- [Deuxième méthode : en automatique](#deuxième-méthode--en-automatique)
- [Lancement du serveur de l'API](#lancement-du-serveur-de-l'API)
- [Configuration nécessaire pour avoir l'API et le client sur la même machine](#configuration-nécessaire-pour-avoir-lAPI-et-le-client-sur-la-même-machine)
- [Recharger les bases](#recharger-les-bases)

___

## Dépendances logicielles

Il faut installer mongodb en version 3.0. Donc, pour Ubuntu et le reste, c'est en général pas encore dans les dépôts!
Cliquer sur le lien suivant pour apprendre à faire l'installation :  https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04

Ensuite, il faut installer python3 et numpy. Pour ubuntu, utiliser la commande :

```bash
sudo apt-get install python3 python3-pip python3-numpy python3-matplotlib
```


Ensuite, il faut installer les bibliothèques pymongo, flask-restful, et sklearn. Allons-y :

```bash
sudo pip3 install pymongo sklearn flask-restful
```

Si des erreurs sortent à l'installation  du module sklearn et vérifiez que vous avez les bons paquets nécessaires à la compilation des éventuels binaires C.

## Peuplement de la base

D'abord, téléchargez les fichiers CSV des données

### Première méthode : à la main
Pour insérer les données brutes dans la base (à partir des deux CSV), il faut faire

Pour le tour 1 :
```bash
mongoimport --db polldata --collection t1_full --type csv --headerline regionales-2015-communes.csv
```

Pour le tour 2 :
```bash
mongoimport --db polldata --collection t2_full --type csv --headerline Reg_15_Resultats_Communes_T2.csv
```


Ensuite, trouvez le script "database_loader.py", et lancez le avec

```bash
python3 database_loader.py
```
### Deuxième méthode : en automatique

Lancez le script de chargement *automatique* des données dans la base avec

```bash
cd restful_api/
./reload_db.sh fichier_tour1.csv fichier_tour2.csv
```


## Lancement du serveur de l'API

Il n'y a qu'à lancer le script suivant :
```bash
python3 app.py
```

## Configuration nécessaire pour avoir l'API et le client sur la même machine

En fait, il faut faire une configurations sur le serveur NGINX qui sert le front-end web d'Ocre pour éviter des problèmes avec le CORS.
D'avance, arrêter Apache.
Installer NGINX et créer une configuration pour Ocre :

```bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/ocre
```

Puis coller le code suivant, en veillant à ce que le contenu de "ROOT DIRECTORY" soit le chemin absolu vers le dossier qui contient "index.html"

```nginx
server {
    listen      4000;

    root "ROOT_DIRECTORY";

    location / {
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

Enfin, il faut faire un lien en soft de la configuration ainsi crée vers les sites activés, et recharger le serveur nginx

```bash
sudo ln -s /etc/nginx/site-available/ocre /etc/nginx/sites-enabled/ocre
sudo service nginx restart
```


## Recharger les bases

Si les données ont changé, ou la base de donnée a planté pour une raison ou une autre, il est toujours possible de recharger la base. Il suffit de lancer le script `reload_db.sh`.
