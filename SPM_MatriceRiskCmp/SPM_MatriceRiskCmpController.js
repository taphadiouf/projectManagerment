({
	doInit  : function(component, event, helper) {
       
        var filter = event.getParam('filtre');
        console.log('the record id '+component.get('v.recordId'))
        var action = component.get("c.getRiskByProject");
        action.setParams({projectId: component.get('v.recordId')});
        action.setCallback(this, function (response) {
            
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS") {
                var risks = response.getReturnValue().data;
                component.set('v.risks', risks);
                 console.log('list of risk '+JSON.stringify(risks));
                 helper.insertRisk(component,risks);
            }
        });
        $A.enqueueAction(action);
    },
    
    
    displayProjectFiltered  : function(component, event, helper) {
        var filter = event.getParam('filtre');
        var action = component.get("c.getAllRisks");
        action.setCallback(this, function (response) {
            
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS") {
                var risks = response.getReturnValue().data;
                component.set('v.risks', risks);
                
                 var dataTemp = risks.filter((risk) =>risk.AccountId.includes(filter) );
                
                 component.set('v.risks', dataTemp);
                 console.log('list of risk '+JSON.stringify(dataTemp));
                 helper.insertRisk(component,dataTemp);
            }
        });
        $A.enqueueAction(action);
    }
})