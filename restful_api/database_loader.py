from db_scripts.aggregate_depts import aggregate_per_depts, db
from db_scripts.remodel_db import remodel_poll_data
from models.constants import *


def collection_exists(collection_name):
    return db[collection_name].count() != 0

if not collection_exists(FIRST_ROUND_PER_DEPTS_COLLECTION):
    remodel_poll_data("t1_full", "t1_clean", FIRST_ROUND_LISTES_COLLECTION)
print("Done cleaning up the first turn data")

if not collection_exists(FIRST_ROUND_PER_DEPTS_COLLECTION):
    aggregate_per_depts("t1_clean",FIRST_ROUND_PER_DEPTS_COLLECTION)
print("Done aggregating to departement data for first turn")

if not collection_exists(SECOND_ROUND_LISTES_COLLECTION):
    remodel_poll_data("t2_full", "t2_clean", SECOND_ROUND_LISTES_COLLECTION)
print("Done cleaning up the second turn data")

if not collection_exists(SECOND_ROUND_PER_DEPTS_COLLECTION):
    aggregate_per_depts("t2_clean", SECOND_ROUND_PER_DEPTS_COLLECTION)
print("Done aggregating to departement data for second turn")
