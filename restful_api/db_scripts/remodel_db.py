from pymongo import MongoClient

client = MongoClient()
db = client["polldata"]



pipeline = [
    {"$project": {"liste_%i_caption" % i : 1 for i in range(1,13)}},
]

all_poll_data = []
all_lists_data = {}
for entry in db.tour1.find():
    #extaction des entrées "utiles"
    commune_poll_data = {k : entry.get(k, None) for k in ["code_dept","dept_name","commune_code","commune_name",
                                                      "registered_voters","non_voters" ,"voters","blank",
                                                      "nones","expressed"]}
    commune_poll_data["poll_outcome"] = []

    #extraction des votes des listes, et création d'un index des listes
    for i in range(1,13):
        try:
            if entry["liste_%i_caption" % i ]:
                if entry["liste_%i_caption" % i ] not in all_lists_data:
                    all_lists_data[entry["liste_%i_caption" % i ]] = {"name" : entry["liste_%i_name" % i ],
                                                                      "full_name" : entry["liste_%i_full_name" % i ],
                                                                      "head" : entry["liste_%i_head" % i ]}
                commune_poll_data["poll_outcome"].append({"liste_id" : entry["liste_%i_caption" % i ],
                                                      "liste_votes" : entry["liste_%i_votes" % i]})
        except KeyError:
            pass
    all_poll_data.append(commune_poll_data)

# dernier remodelage du dico des listes, et insertion en base des données
all_lists_data_list = []
for k, v in all_lists_data.items():
    liste_data = {"_id" : k}
    liste_data.update(v)
    all_lists_data_list.append(liste_data)

print(all_lists_data_list)
#db.listes.insert_many(all_lists_data_list)
#db.tour1_clean.insert_many(all_poll_data)