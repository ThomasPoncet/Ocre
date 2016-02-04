#!/usr/bin/env mongo
var db = new Mongo().getDB("polldata");
db.dropDatabase();