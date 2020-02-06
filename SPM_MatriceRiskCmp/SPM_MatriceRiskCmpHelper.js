({
	insertRisk : function(component,dataTemp) {
        //component.set('v.tableData','');
        var tableData = component.get('v.tableData');
        for(i = 0; i < 20; i++){
            tableData[i] = '';
        }
        var i;
        var n= 0;
        var valCriticite;
        for(i = 0; i < dataTemp.length; i++){
            valCriticite=dataTemp[i].Criticite__c;
            //console.log(JSON.stringify(valCriticite));
            if(dataTemp[i].Criticite__c<4){
                var j;
        		for(j = 0; j <5; j++){
                    if(tableData[j]=='' && n == 0){
                		tableData[j]=valCriticite;
                		//component.set('v.tableData',valCriticite);
                		n = 1;
            		}
        		}
                n = 0;
            }
            else if(valCriticite >=4 && valCriticite < 8){
                //this.tolerable(component, dataTemp[i].Criticite__c);
               var j;
        		for(j = 5; j <10 ; j++){
                    if(tableData[j]=='' && n == 0){
                		tableData[j]=valCriticite;
                		//component.set('v.tableData',valCriticite);
                		n = 1;
            		}
        		}
                n = 0;
            }
            else if(dataTemp[i].Criticite__c>=8 && dataTemp[i].Criticite__c<12){
                //this.inacceptable(component, dataTemp[i].Criticite__c);
                var j;
                for(j = 10; j<12; j++){
                    if(tableData[j]=='' && n == 0){
                        tableData[j]=valCriticite;
                        n = 1;
                }
            }
             n = 0;
            }
            else if (dataTemp[i].Criticite__c>=12){
                var j;
                for(j = 12; j<17; j++){
                    if(tableData[j]=='' && n == 0){
                        tableData[j]=valCriticite;
                        n = 1;
                }
            }
             n = 0;
            }
            else{
                    
            }
        }
        console.log(tableData)
        component.set('v.tableData',tableData);
        
	}  
    
})