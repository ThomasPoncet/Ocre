from pymongo import MongoClient

client = MongoClient()
db = client["polldata"]

basic_poll_data_fields_name = ["registered_voters", "non_voters" , "voters", "blank",
                                                      "nones","expressed"]
group_instruction = {"_id" : "$code_dept"}
group_instruction.update({key : {"$sum" : "$" + key} for key in basic_poll_data_fields_name})
pipeline = [
    {"$group": group_instruction}
]

depts_data = {entry["_id"]: entry for entry in db.tour1_clean.aggregate(pipeline)}
for dept_id in depts_data:
    depts_data[dept_id]["poll_outcome"] = []
pipeline_votes = [
    {"$unwind" : "$poll_outcome"},
    {"$group" : { "_id" : {"code_dept" : "$code_dept", "liste_id" : "$poll_outcome.liste_id"},
                  "votes_total" : {"$sum" : "$poll_outcome.liste_votes"}}}
]

for entry in db.tour1_clean.aggregate(pipeline_votes):
    liste_poll_outcome = {"liste_id" : entry["_id"]["liste_id"],
                          "liste_votes" : entry["votes_total"]}
    depts_data[entry["_id"]["code_dept"]]["poll_outcome"].append(liste_poll_outcome)

depts_data = [v for k,v in depts_data.items()]
print(depts_data)
print(len(depts_data))

#db.tour1_dept.insert_many(depts_data)