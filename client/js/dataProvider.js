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

      /**
       * Gestion fond de carte des régions
       **/
      dataProvider.getRegion = function(codeReg, callback){
          $http.get("/static/DEPARTEMENTmin.json").success(function(data){
              var regionGeog = data;
              var regionFeatures = [];
              for (reg of regionGeog.features) {
                  if (parseInt(reg.properties.CODE_REG) === codeReg) {
                      console.log(reg);
                      console.log(reg.properties);
                      console.log(reg.properties.CODE_REG);
                      regionFeatures.push(reg);
                  }
              }
              regionGeog.features = regionFeatures;
              callback(regionGeog);
          });
      };

      return dataProvider;

}]);
