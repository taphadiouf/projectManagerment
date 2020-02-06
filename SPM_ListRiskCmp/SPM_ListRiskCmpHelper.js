({
    
    deleteRisk: function (component, row) {
        var action = component.get("c.deleteRisks");
        var riskes = [JSON.parse(JSON.stringify(row))];
        console.log(riskes[0]);
        action.setParams({ risks: riskes });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var risk = component.get('v.numberOfRiskToDisplay');
                    var risksAfterDelete = risk.filter(riske=>riske.Id != risk[0].Id);
                     console.log(risksAfterDelete);
                     component.set('v.numberOfRiskToDisplay',risksAfterDelete);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The record has been deleted successfully.",
                        "type": "Success"
                    });
                    toastEvent.fire();
                } else {
                    for (var message in customResponse.messages) {
                        console.log(message);
                    }
                }
            }
            else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);

    },

    

    editRisk: function(component, row){
        var risk = JSON.parse(JSON.stringify(row));
        component.set('v.isModal',true);
        component.set('v.riskId',risk.Id);
        var action = component.get("c.getRiskById");
            action.setParams({ id: risk.Id });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.risk', customResponse.data);
                    } else {
                        for (var message in customResponse.messages) {
                            console.log(message);
                        }
                    }
                }
                else {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +
                                errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
    },

    getAllRisk: function(component,pageSize){
        var action = component.get("c.getAllRisks");
        
        action.setCallback(this, function (response) {
            
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS") {
                var risks = response.getReturnValue().data;
                component.set('v.risks', risks);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.risks").length);
                
                component.set("v.start", 0);
                
                component.set("v.end", pageSize - 1);
                
                var numberOfRiskToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {
                    
                    for (var i = 0; i < component.get('v.totalSize'); i++) {
                        
                        numberOfRiskToDisplay.push(risks[i]);
                        
                    }
                }else{
                    for (var i = 0; i < pageSize; i++) {
                        
                        numberOfRiskToDisplay.push(risks[i]);
                        
                    }
                }
                
                component.set('v.numberOfRiskToDisplay', numberOfRiskToDisplay);
                
                
                
            }
            
        });
        
        $A.enqueueAction(action);
        
    },
    
    getAllRiskByProject: function(component,pageSize, projectId){
        var action = component.get("c.getRiskByProject");
        action.setParams({projectId: projectId});
        action.setCallback(this, function (response) {
            
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS") {
                var risks = response.getReturnValue().data;
                component.set('v.risks', risks);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.risks").length);
                
                component.set("v.start", 0);
                
                component.set("v.end", pageSize - 1);
                
                var numberOfRiskToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {
                    
                    for (var i = 0; i < component.get('v.totalSize'); i++) {
                        
                        numberOfRiskToDisplay.push(risks[i]);
                        
                    }
                }else{
                    for (var i = 0; i < pageSize; i++) {
                        
                        numberOfRiskToDisplay.push(risks[i]);
                        
                    }
                }
                
                component.set('v.numberOfRiskToDisplay', numberOfRiskToDisplay);               
            }
            
        });
        
        $A.enqueueAction(action);
        
    },
 
        
        
    


})