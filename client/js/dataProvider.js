angular.module('ProjectOpenData')
.factory('dataProvider', ['$http', function($http) {
    var apiAddress = "http://localhost:4000/api"
    var dataProvider = {};


    /**
     * Vote first tour management
     **/
    dataProvider.voteT1 = {};
    dataProvider.getVoteT1Reg = function(codeReg, codeParti, callback) {
        if (typeof(voteT1[codeReg]) != undefined) {
            if (typeof(voteT1[codeReg][codeParti]) != undefined) {
                callback(teT1[codeReg][codeParti]);
            } else {
                $http.get(apiAddress+"/getVoteT1/?codeReg="+"codeReg&codeParti="+codeParti).success(function(data){
                    voteT1[codeReg][codeParti] = data;
                    callback(voteT1[codeReg][codeParti]);
                });
            }
        } else {
            voteT1[codeReg] = {};
            $http.get(apiAddress+"/getVoteT1/?codeReg="+"codeReg&codeParti="+codeParti).success(function(data){
                voteT1[codeReg][codeParti] = data;
                callback(voteT1[codeReg][codeParti]);
            });
        }
    };

    /**
     * Vote second tour management
     **/
     dataProvider.voteT2 = {};
     dataProvider.getVoteT2Reg = function(codeReg, codeParti, callback) {
         if (typeof(voteT2[codeReg]) != undefined) {
             if (typeof(voteT2[codeReg][codeParti]) != undefined) {
                 callback(voteT2[codeReg].codeParti);
             } else {
                 $http.get(apiAddress+"/getVoteT2/?codeReg="+"codeReg&codeParti="+codeParti).success(function(data){
                     voteT2[codeReg][codeParti] = data;
                     callback(voteT2[codeReg][codeParti]);
                 });
             }
         } else {
             voteT2[codeReg] = {};
             $http.get(apiAddress+"/getVoteT2/?codeReg="+"codeReg&codeParti="+codeParti).success(function(data){
                 voteT2[codeReg][codeParti] = data;
                 callback(voteT2[codeReg][codeParti]);
             });
         }
     };
    //  EN ATTENTE DE LA DECISION
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
        //  $http.get("/static/regions-20140306-100m.json").success(function(data){
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

      dataProvider.getValueInDefaultDataSet = function(partie, regionIndice) {
        return Math.random();
      };

      dataProvider.getValueInDataSet = function(dataSet, regionIndice) {
        return Math.random();
      };

      dataProvider.codeToIndiceRegion = function(code) {
        return ;
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

      // Datasets
      dataProvider.datasets = {};
      dataProvider.getDataset = function(datasetName, callback){
          if (typeof(dataProvider.datasets[datasetName]) == undefined){
              $http.get("????").success(function(data){
                  dataProvider.datasets[datasetName] == data;
                  callback(dataProvider.datasets[datasetName]);
              });
          } else {
              callback(dataProvider.datasets[datasetName]);
          }
      };

      return dataProvider;


}]);
