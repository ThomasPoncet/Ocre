# s'utilise en passant db_tour1.cvs et db_tour2.cvs en argument

mongo db_scripts/drop_db.sh
mongoimport --db polldata --collection t1_full --type csv --headerline $1
mongoimport --db polldata --collection t2_full --type csv --headerline $2
python3 database_loader.py