import csv
import os, sys

import json





print sys.argv
print len(sys.argv)
FichierCSV = 2

##creation du fichier ou sera stocke l'ensemble des variables
newFichierPython = open(sys.argv[1] + ".json", "a")
os.remove(sys.argv[1] + ".json")
newFichierPython = open(sys.argv[1] + ".json", "a")
	
while FichierCSV < len(sys.argv):

	##creation des variables python dans le fichier
	###on recupere la premiere ligne avec tous les noms
	nameVarPython = ""
	firstRaw = 1
	csvfile = csv.reader(open(sys.argv[FichierCSV],"rb"))
	print sys.argv[FichierCSV]
	for row in csvfile:
		if firstRaw == 1:
			nameVarPython = row
			print row
		break
	###on ecrit toutes les variables du fichier
	print sys.argv[FichierCSV]
	csvfile = open(sys.argv[FichierCSV],"rb")
	reader = csv.DictReader( csvfile, nameVarPython)
	firstRaw = 0
	for row in reader:
		if firstRaw != 0:
  			json.dump(row, newFichierPython)
			newFichierPython.write('\n')
		firstRaw = firstRaw + 1 
		print row
	
	
	##on passe au fichier suivant
	newFichierPython.write("\n\n\n\n\n\n")
	FichierCSV = FichierCSV + 1

newFichierPython.close()
