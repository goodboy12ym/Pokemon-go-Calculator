/* Theme Name: Worthy - Free Powerful Theme by HtmlCoder
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Version:1.0.0
 * Created:November 2014
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 * File Description: Place here your custom scripts
 */

   function pokemon(Type, Stam, Atk, Def,Cp,Hp,Dust,Power) {
	   
	        this.Type = Type;
	        this.Stam = Stam;
	        this.Atk =  Atk;
	        this.Def = Def;
	        this.Cp=Cp;
	        this.Hp=Hp;
	        this.Dust=Dust;
	        if (Power=="Yes"){this.Power=1;}
	        else{this.Power=0;}
       
	    }	
	function pokeresult(calculation,level,attack,defense,stamina,prefection){
		this.calculation=calculation;
		this.level=level;
		this.attack=attack;
		this.defense=defense;
		this.stamina=stamina;
		this.prefection=prefection;
		
		
	}
  var app = angular.module('myApp', []);
         app.controller('customersCtrl', function($scope, $http, $filter) {	 
         $http.get("js/pokemon.json")
         .success(function (response) {
        	 $scope.names = response.records;
        	
         });  
        
         $http.get("js/cpmuti.json")
         .success(function (response) {
        	 $scope.cps = response.records;
        	
         });
         $scope.calculate= function(){
        	 var type=$scope.pokemon;
        	 var hp=$scope.hp;
        	 var cp=$scope.cp;
        	 var dust=$scope.dust;
          	 var power=$scope.power;
          	 var data=$scope.names;
          	 var lvdata=$scope.cps;
        	// alert(type);
            // alert($scope.names[0].Name);
             var poke = $filter('filter')( data,  function (d) {return d.Name === type;})[0];
            // $scope.result=poke;
             var Pokemon=new pokemon(type, poke.Stam, poke.Atk, poke.Def,cp,hp,dust,power);
             //alert(Pokemon.Type);
             //alert(Pokemon.Stam);
            // alert(Pokemon.Atk);
            // alert(Pokemon.Def);
            // alert(Pokemon.Cp);
            // alert(Pokemon.Hp);
            // alert(Pokemon.Dust);
            // alert(Pokemon.Power);
            // alert(dust);
             //Start calculate
             var poke2 = $filter('filter')( lvdata,  function (d) {return d.Dust === parseInt(dust);});
             var results=[];
           //  $scope.result=poke2;
            // alert(poke2.length);
             for(var i=0;i<poke2.length;i++){
            	 var lv=poke2[i].Level;
            	 if(Pokemon.Power==0 & !Number.isInteger(lv)){
            		 continue;		 
            	 }
       
                // alert(typeof lv);
            	 var Muti=poke2[i].CPMuti;
            	// alert(typeof Muti);
            	// alert(typeof parseFloat(hp));
            	// alert(typeof Pokemon.Stam);
            	 var addstam= parseFloat(hp)/Muti-parseFloat(Pokemon.Stam);
            	 for(var addstam=0;addstam<=15;addstam++){
            		 if(Math.floor((addstam+parseFloat(Pokemon.Stam))*Muti)-parseFloat(hp)==0){
            			//console.log(addstam+" "+Muti+" "+hp+" "+Pokemon.Stam+" "+lv);
            			 for(var addatk=0.0;addatk<=15.0;addatk++){
                    		 for (var adddef=0.0;adddef<=15.0;adddef++){
                    			 Attack=(parseFloat(Pokemon.Atk)+addatk);
                    			 Defense=(parseFloat(Pokemon.Def)+adddef);
                    			 Stamina=(addstam+parseFloat(Pokemon.Stam));
                    			 calculation=(Attack*Math.pow(Defense,0.5)*Math.pow(Stamina,0.5))*Math.pow(Muti,2)/10;
                    			 
                    			if(Math.floor(calculation)==Pokemon.Cp){
                    				 //console.log( calculation);
                    				 var prefection=(addatk+adddef+addstam)/45.0; 
                    				 results.push(new pokeresult(calculation,lv,addatk,adddef,addstam,prefection));
                    			}
                 		 
                    		 }
                    		 
                    	 }
                   	
            			 
            		 }
            	 }
       
            	// alert(addstam);
            	 // 计算出addstam
            	
            	
            	 
            	 
            	 
             }
             console.log(results.length);
             $scope.result=results;
            
             
             
         }
         
         $scope.saveresult= function(){
        	 $scope.savedata= $scope.result;
        	 
         }
         
        
         
});
