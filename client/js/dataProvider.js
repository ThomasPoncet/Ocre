angular.module('ProjectOpenData')
.factory('dataProvider', ['$http', function(http) {
    var dataProvider = {};


    /**
     * Vote first tour management
     **/
    this.voteT1 = {}
    this.getVoteT1 = function(codeDep, codeParti) {
        if (typeof(voteT1.codeDep) != undefined) {
            if (typeof(voteT1.codeDep.codeParti) != undefined) {
            } else {
                // voteT1.codeDep.codeParti = http.get("localhost:300/getVoteT1/?codeDep="+"codeDep&codeParti="+codeParti);
            }
        } else {
            voteT1.codeDep = {};
            // voteT1.codeDep.codeParti = http.get("localhost:300/getVoteT1/?codeDep="+"codeDep&codeParti="+codeParti);
        }
        return voteT1.codeDep.codeParti;
    };

    /**
     * Vote second tour management
     **/
     this.voteT2 = {}
     this.getVoteT2 = function(codeDep, codeParti) {
         if (typeof(voteT2.codeDep) != undefined) {
             if (typeof(voteT2.codeDep.codeParti) != undefined) {
             } else {
                 // voteT2.codeDep.codeParti = http.get("localhost:300/getVoteT2/?codeDep="+"codeDep&codeParti="+codeParti);
             }
         } else {
             voteT2.codeDep = {};
             // voteT2.codeDep.codeParti = http.get("localhost:300/getVoteT2/?codeDep="+"codeDep&codeParti="+codeParti);
         }
         return voteT2.codeDep.codeParti;
     };

      /**
       * Gestion fond de carte des régions
       **/
      this.getRegion = function(codeReg){
          var completeGeog = http.get("static/DEPARTEMENTmin.json");
          var regionGeog = completeGeog;
          completeGeog.features = [];
          for (var reg in completeGeog.features) {
              if (reg.properties.CODE_REG.parseInt() === codeReg) {
                  regionGeog.features.push(reg);
              }
          }
      };

});
