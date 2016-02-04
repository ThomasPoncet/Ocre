# L'API rest d'OCRE

Voici les instructions tant attendues pour faire tourner l'API rest nécessaire au bon fonctionnement du frontend web d'OCRE.

## Les dépendances logicielles

Il faut installer mongodb, mais la version 3.0. Donc, pour Ubuntu et le reste, en général pas encore dans les dépôts!
Aller ici pour apprendre à faire l'installation https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04

Ensuite, il faut python3. Pour ubuntu c'est comme ça:

`sudo apt-get install python3 python3-pip python3-numpy python3-matplotlib`

(oui tant qu'à faire, on en profite pour installer numpy)
Ensuite, il faut installer les bibliothèques pymongo, flask-restful, et sklearn. Allons-y.

`sudo pip3 install pymongo sklearn flask-restful`

Si des erreurs sortent à l'install du module sklearn, vérifiez que vous avez les bons paquets nécessaires à la compilation des éventuels binaires C.

## Le Remplissage de la base

D'abord, téléchargez les fichiers CSV des données:

### Façon 1 : à la mano
Pour insérer les données brutes dans la base (à partir des deux CSV), il faut faire

`mongoimport --db polldata --collection t1_full --type csv --headerline regionales-2015-communes.csv`
Pour le tour 1

`mongoimport --db polldata --collection t2_full --type csv --headerline Reg_15_Resultats_Communes_T2.csv`

Pour le tour 2.

C'est pas fini. Trouvez le script "database_loader.py", et lancez le avec

`python3 database_loader.py`

###Façon 2 : en automatique

Lancez le script de chargement *automatique* des données dans la base avec

```bash
cd restful_api/
./reload_db.sh fichier_tour1.csv fichier_tour2.csv
```

C'est bon pour la base

## Lancer le serveur de l'API

lol y'a quasi rien à faire en fait:

`python3 app.py`

## Configuraton nécessaire pour avoir l'API et le client sur la même machine

En fait, il faut faire deux petites configs avec NGINX et le fichier /etc/hosts. D'avance, virez apache (ou désactivez le)

```bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/ocre
```

Puis coller le code suivant, en veillant à ce que le contenu de "ROOT DIRECTORY" soit le chemin absolu 
vers le dossier qui contient "index.html"

```nginx
server {
    listen      4000;
    server_name ocre.fr;

    root "ROOT_DIRECTORY";

    location / {
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

Après, faut ln en soft la config, et recharger le serveur nginx

```bash
sudo ln -s /etc/nginx/site-available/ocre /etc/nginx/sites-enabled/ocre
sudo service nginx restart
```

Puis rajouter dans /etc/hosts cette ligne

`127.0.0.1 ocre.fr`


## Recharger les bases

Si les données ont pu changer, ou que vous avez planté la base pour une raison ou une autre, il est toujours possible 
de recharger la base: il suffit de lancer le script `reload_db.sh`.
