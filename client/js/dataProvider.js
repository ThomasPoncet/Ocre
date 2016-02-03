angular.module('ProjectOpenData')
.factory('dataProvider', ['$http', function($http) {
    var dataProvider = {};


    /**
     * Vote first tour management
     **/
    dataProvider.voteT1 = {};
    dataProvider.getVoteT1 = function(codeReg, codeParti, callback) {
        if (typeof(voteT1.[codeReg]) != undefined) {
            if (typeof(voteT1.[codeReg].[codeParti]) != undefined) {
                callback(teT1.[codeReg].[codeParti]);
            } else {
                $http.get("localhost:3000/getVoteT1/?codeReg="+"codeReg&codeParti="+codeParti).success(function(data){
                    voteT1.[codeReg].[codeParti] = data;
                    callback(voteT1.[codeReg].[codeParti]);
                });
            }
        } else {
            voteT1.[codeReg] = {};
            $http.get("localhost:3000/getVoteT1/?codeReg="+"codeReg&codeParti="+codeParti).success(function(data){
                voteT1.[codeReg].[codeParti] = data;
                callback(voteT1.[codeReg].[codeParti]);
            });
        }
    };

    /**
     * Vote second tour management
     **/
     dataProvider.voteT2 = {};
     dataProvider.getVoteT2 = function(codeReg, codeParti, callback) {
         if (typeof(voteT2.[codeReg]) != undefined) {
             if (typeof(voteT2.[codeReg].[codeParti]) != undefined) {
                 callback(voteT2.[codeReg].codeParti);
             } else {
                 $http.get("localhost:3000/getVoteT2/?codeReg="+"codeReg&codeParti="+codeParti).success(function(data){
                     voteT2.[codeReg].[codeParti] = data;
                     callback(voteT2.[codeReg].[codeParti]);
                 });
             }
         } else {
             voteT2.[codeReg] = {};
             $http.get("localhost:3000/getVoteT2/?codeReg="+"codeReg&codeParti="+codeParti).success(function(data){
                 voteT2.[codeReg].[codeParti] = data;
                 callback(voteT2.[codeReg].[codeParti]);
             });
         }
     };

     // Les listes presentes pour le premier ou second tour. (tour 1 ou 2)
     dataProvider.getListes = function(tour, callback){
         $http.get('localhost:3000/listes/?tour='+tour).success(function(data){
             callback(data);
         });
     };

     dataProvider.getFrance = function(callback){
        //  $http.get("/static/DEPARTEMENTmin.json").success(function(data){
         $http.get("/static/regions-20140306-100m.json").success(function(data){
     		callback(data);
     	});
    };

      /**
       * Gestion fond de carte des régions
       **/
      dataProvider.getRegion = function(codeReg, callback){
          $http.get("/static/DEPARTEMENTmin.json").success(function(data){
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

      return dataProvider;

      // Dataset list !
      dataProvider.datasetList = null;
      dataProvider.getDatasetList = function(callback){
          if (dataProvider.datasetList == null){
              $http.get("????").success(function(data){
                  dataProvider.datasetList == data;
                  callback(dataProvider.datasetList);
              });
          } else {
              callback(dataProvider.datasetList);
          }
      };

      // Datasets
      dataProvider.datasets = {};
      dataProvider.getDataset(datasetName, callback){
          if (typeof(dataProvider.datasets[datasetName]) == undefined){
              $http.get("????").success(function(data){
                  dataProvider.datasets[datasetName] == data;
                  callback(dataProvider.datasets[datasetName]);
              });
          } else {
              callback(dataProvider.datasets[datasetName]);
          }
      };


}]);
