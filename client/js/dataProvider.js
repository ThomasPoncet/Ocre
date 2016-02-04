angular.module('ProjectOpenData')
.factory('dataProvider', ['$http', function($http) {
    var apiAddress = "http://localhost:4000/api";
    var dataProvider = {};


    /**
     * Vote first tour management OBSELETE
     **/
    // dataProvider.voteT1 = {};
    // dataProvider.getVoteT1Reg = function(codeReg, codeParti, callback) {
    //     if (typeof(voteT1[codeReg]) != undefined) {
    //         if (typeof(voteT1[codeReg][codeParti]) != undefined) {
    //             callback(teT1[codeReg][codeParti]);
    //         } else {
    //             $http.get(apiAddress+"/getVoteT1/?codeReg="+"codeReg&codeParti="+codeParti).success(function(data){
    //                 voteT1[codeReg][codeParti] = data;
    //                 callback(voteT1[codeReg][codeParti]);
    //             });
    //         }
    //     } else {
    //         voteT1[codeReg] = {};
    //         $http.get(apiAddress+"/getVoteT1/?codeReg="+"codeReg&codeParti="+codeParti).success(function(data){
    //             voteT1[codeReg][codeParti] = data;
    //             callback(voteT1[codeReg][codeParti]);
    //         });
    //     }
    // };

    /**
     * Vote second tour management OBSELET
     **/
    //  dataProvider.voteT2 = {};
    //  dataProvider.getVoteT2Reg = function(codeReg, codeParti, callback) {
    //      if (typeof(voteT2[codeReg]) != undefined) {
    //          if (typeof(voteT2[codeReg][codeParti]) != undefined) {
    //              callback(voteT2[codeReg].codeParti);
    //          } else {
    //              $http.get(apiAddress+"/getVoteT2/?codeReg="+"codeReg&codeParti="+codeParti).success(function(data){
    //                  voteT2[codeReg][codeParti] = data;
    //                  callback(voteT2[codeReg][codeParti]);
    //              });
    //          }
    //      } else {
    //          voteT2[codeReg] = {};
    //          $http.get(apiAddress+"/getVoteT2/?codeReg="+"codeReg&codeParti="+codeParti).success(function(data){
    //              voteT2[codeReg][codeParti] = data;
    //              callback(voteT2[codeReg][codeParti]);
    //          });
    //      }
    //  };
    //  OBSELETE
    //  dataProvider.votesDep = {};
    //  dataProvider.getVote = function(tour, codesPartisListe, dept, callback){
    //      for (codeParti of codesPartisListe) {
    //          if (dataProvider.votesDep[codeParti] !== "undefined"){
    //
    //          }
    //      }
    //      if (typeof(dataProvider.listes[tour]) !== "undefined"){
    //          callback(dataProvider.listes[tour]);
    //      } else {
    //          $http.get(apiAddress+"/listes?tour="+tour).success(function(data){
    //              dataProvider.listes[tour] = data;
    //              callback(dataProvider.listes[tour]);
    //          });
    //      }
    //  };

    /**
     * Informations pour la carte et le graphe (tout y est précalculé)
     **/
    dataProvider.allCorrelations = {};
    dataProvider.getAllCorrelations = function(tour, codesPartiListe, datasetId, callback){
        if (codesPartiListe.length == 0 || typeof(datasetId) == "undefined") {
            callback(null);
        }
        if (typeof(dataProvider.allCorrelations[tour]) != "undefined"){
            if (typeof(dataProvider.allCorrelations[tour][JSON.stringify(codesPartiListe)]) != "undefined") {
                if (typeof(dataProvider.allCorrelations[tour][JSON.stringify(codesPartiListe)][datasetId]) != "undefined") {
                    callback(dataProvider.allCorrelations[tour][JSON.stringify(codesPartiListe)][datasetId]);
                } else {
                    $http.get(apiAddress+"/correlation?tour="+tour+"&dataset_id="+datasetId+"&liste_ids="+JSON.stringify(codesPartiListe)).success(function(data){
                        dataProvider.allCorrelations[tour][JSON.stringify(codesPartiListe)][datasetId] = data;
                        callback(dataProvider.allCorrelations[tour][JSON.stringify(codesPartiListe)][datasetId]);
                    });
                }
            } else {
                $http.get(apiAddress+"/correlation?tour="+tour+"&dataset_id="+datasetId+"&liste_ids="+JSON.stringify(codesPartiListe)).success(function(data){
                    dataProvider.allCorrelations[tour][JSON.stringify(codesPartiListe)] = {};
                    dataProvider.allCorrelations[tour][JSON.stringify(codesPartiListe)][datasetId] = data;
                    callback(dataProvider.allCorrelations[tour][JSON.stringify(codesPartiListe)][datasetId]);
                });
            }
        } else {
            $http.get(apiAddress+"/correlation?tour="+tour+"&dataset_id="+datasetId+"&liste_ids="+JSON.stringify(codesPartiListe)).success(function(data){
                dataProvider.allCorrelations[tour] = {};
                dataProvider.allCorrelations[tour][JSON.stringify(codesPartiListe)] = {};
                dataProvider.allCorrelations[tour][JSON.stringify(codesPartiListe)] = {};
                dataProvider.allCorrelations[tour][JSON.stringify(codesPartiListe)][datasetId] = data;
                callback(dataProvider.allCorrelations[tour][JSON.stringify(codesPartiListe)][datasetId]);
            });
        }
    };

    /**
     * Pour avoir toutes les informations sur le scrutin (abstention, votant, résultats, ...)
     **/
    dataProvider.allVoteInfos = {};
    dataProvider.getAllVoteInfos = function(tour, callback){
        if (typeof(dataProvider.allVoteInfos[tour]) !== "undefined"){
            callback(dataProvider.allVoteInfos[tour]);
        } else {
            $http.get(apiAddress+"/basic_data?tour="+tour).success(function(data){
                dataProvider.allVoteInfos[tour] = data;
                callback(dataProvider.allVoteInfos[tour]);
            });
        }
    };
    dataProvider.getDeptVoteInfos = function(tour, dept, callback){
        dataProvider.getAllVoteInfos(tour, function(data){
            for (deptVoteInfos of data) {
                if (''+deptVoteInfos.dept_code == dept){
                    callback(deptVoteInfos);
                }
            }
        });
    };

    // Les listes presentes pour le premier ou second tour. (tour 1 ou 2)
    dataProvider.listes = {};
    // Attention  : tour doit etre une chaine de caracteres
    dataProvider.getListes = function(tour, callback){
        if (typeof(dataProvider.listes[tour]) !== "undefined"){
            callback(dataProvider.listes[tour]);
        } else {
            $http.get("static/list_tour"+tour+".json").success(function(data){
                dataProvider.listes[tour] = data;
                callback(dataProvider.listes[tour]);
            });
        }
    };

    dataProvider.getFrance = function(callback){
        $http.get("static/DEPARTEMENTmin.json").success(function(data){
        // $http.get("/static/regions-20140306-100m.json").success(function(data){
            callback(data);
     	});
    };


      /**
       * Gestion fond de carte des régions
       **/
    dataProvider.getRegion = function(codeReg, callback){
        $http.get("static/DEPARTEMENTmin.json").success(function(data){
            var regionGeog = data;
            var regionFeatures = [];
            for (reg of regionGeog.features) {
                if (parseInt(reg.properties.CODE_REG) === codeReg) {
                    regionFeatures.push(reg);
                }
            }
            regionGeog.features = regionFeatures;
            callback(regionGeog);
        });
    };

      // Dataset list !
    dataProvider.datasetList = null;
    dataProvider.getDatasetList = function(callback){
        if (dataProvider.datasetList == null){
            $http.get(apiAddress+"/datasets").success(function(data){
                dataProvider.datasetList = data;
                callback(dataProvider.datasetList);
            });
        } else {
            callback(dataProvider.datasetList);
        }
    };

    dataProvider.allResVotes = {};
    /**
     * Problem : the API gives the sum of the votes for the selectedPartisList, so we've got to retrieve
     * the partis one by one.
     **/
    dataProvider.loadAllResVotes = function(tour, selectedPartisList, callback){
        var parti = selectedPartisList.pop();
        var onePartiArray = [];
        onePartiArray.push(parti);
        if (typeof(dataProvider.allResVotes[tour]) != "undefined"){
            if (typeof(dataProvider.allResVotes[tour][parti]) != "undefined") {
                // If there is no more parti in the list, we execute callback
                if (selectedPartisList.length == 0) {
                    callback();
                // Else we rexecute the method with the new selectedPartisList (one element has been taken)
                } else {
                    dataProvider.loadAllResVotes(tour, selectedPartisList, callback);
                }
            } else {
                $http.get(apiAddress+"/total_votes?tour="+tour+"&liste_ids="+JSON.stringify(onePartiArray)).success(function(data){
                    dataProvider.allResVotes[tour][parti] = data;
                    if (selectedPartisList.length == 0) {
                        callback();
                    } else {
                        dataProvider.loadAllResVotes(tour, selectedPartisList, callback);
                    }
                });
            }
        } else {
            $http.get(apiAddress+"/total_votes?tour="+tour+"&liste_ids="+JSON.stringify(onePartiArray)).success(function(data){
                dataProvider.allResVotes[tour] = {};
                dataProvider.allResVotes[tour][parti] = data;
                if (selectedPartisList.length == 0) {
                    callback();
                } else {
                    dataProvider.loadAllResVotes(tour, selectedPartisList, callback);
                }
            });
        }
    };

    //Load on the client the dataset with datasetId
    dataProvider.allDataSets = {};
    dataProvider.loadDataset = function(datasetId, callback){
        if (typeof(dataProvider.allDataSets[''+datasetId]) != "undefined"){
            callback();
        } else {
            $http.get(apiAddress+"/dataset_raw?dataset_id="+datasetId).success(function(data){
                dataProvider.allDataSets[''+datasetId] = data;
                callback();
            });
        }
    };

    dataProvider.getResVote = function(tour, dept, parti){
        for (resParti of dataProvider.allResVotes[''+tour][''+parti]) {
            if (''+resParti._id == ''+dept) {
                return resParti.vote_percentage;
            }
        }
    };
    dataProvider.getValueInDataSet = function(datasetId, dept){
        for (dataDept of dataProvider.allDataSets[''+datasetId]) {
            if (''+dataDept.id == ''+dept) {
                return dataDept.percentage;
            }
        }
    };


    return dataProvider;


}]);
