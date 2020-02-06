({
    doInit : function(component) {
        var action = component.get('c.getProjectById');
        action.setParam('id', component.get('v.recordId'));
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var serverResponse = response.getReturnValue();
                if(!serverResponse.hasError){
                    var project = serverResponse.data;
                    var startDate = new Date(project.Start_Date__c);
                    var endDate = new Date(project.End_Date__c);
                    var today = new Date();
                    var nbDay = Math.abs(endDate - startDate);
                    var nbDaysPassed = Math.abs(today - startDate);
                    var nbDayProject = Math.ceil(nbDay / (1000 * 60 * 60 * 24)); 
                    var nbDaysPassed = Math.ceil(nbDaysPassed / (1000 * 60 * 60 * 24)); 
                    var evolution = (nbDaysPassed/nbDayProject)*100;
                    component.set('v.evolution', evolution);
                    console.log(evolution)
                }
            }
        });
        $A.enqueueAction(action);
    }
})