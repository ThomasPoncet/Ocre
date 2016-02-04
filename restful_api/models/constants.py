import enum

DB_ADDRESS = "mongodb://localhost:27017/"
FIRST_ROUND_PER_DEPTS_COLLECTION = "t1_per_dept"
SECOND_ROUND_PER_DEPTS_COLLECTION = "t2_per_dept"
FIRST_ROUND_LISTES_COLLECTION = "t1_listes"
SECOND_ROUND_LISTES_COLLECTION = "t2_listes"

class RoundNumber(enum.Enum):
    FIRST = 1
    SECOND = 2

class DatasetType(enum.Enum):
    UNEMPLOYMENT = 1
    WEDDINGS = 2
    EVOLUTION_JOB = 3
    NATALITY = 4
    ABSTENTION = 5
