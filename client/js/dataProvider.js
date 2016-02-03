angular.module('ProjectOpenData')
.factory('dataProvider', ['$http', function($http) {
    var dataProvider = {};


    /**
     * Vote first tour management
     **/
    dataProvider.voteT1 = {};
    dataProvider.getVoteT1 = function(codeDep, codeParti) {
        if (typeof(voteT1.codeDep) != undefined) {
            if (typeof(voteT1.codeDep.codeParti) != undefined) {
            } else {
                // voteT1.codeDep.codeParti = $http.get("localhost:300/getVoteT1/?codeDep="+"codeDep&codeParti="+codeParti);
            }
        } else {
            voteT1.codeDep = {};
            // voteT1.codeDep.codeParti = $http.get("localhost:300/getVoteT1/?codeDep="+"codeDep&codeParti="+codeParti);
        }
        return voteT1.codeDep.codeParti;
    };

    /**
     * Vote second tour management
     **/
     dataProvider.voteT2 = {};
     dataProvider.getVoteT2 = function(codeDep, codeParti) {
         if (typeof(voteT2.codeDep) != undefined) {
             if (typeof(voteT2.codeDep.codeParti) != undefined) {
             } else {
                 // voteT2.codeDep.codeParti = $http.get("localhost:3000/getVoteT2/?codeDep="+"codeDep&codeParti="+codeParti);
             }
         } else {
             voteT2.codeDep = {};
             // voteT2.codeDep.codeParti = $http.get("localhost:3000/getVoteT2/?codeDep="+"codeDep&codeParti="+codeParti);
         }
         return voteT2.codeDep.codeParti;
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
