({
    closeDetails : function(component){
        component.set('v.showDetails', false);
    },
    editTimeSheet : function(component){
        var timeSheet = component.get('v.timeSheet');
        var activities = component.get('v.activities');
        timeSheet.activities__c = activities;
        component.set('v.timeSheet', timeSheet);
        component.set('v.editTimeSheet', true);
        // component.set('v.showDetails', false);
    },
    showDetails : function(component){
        var id = component.get('v.timeSheet.Task__c');
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            recordId: id,
            slideDevName: "detail"
        });
        navEvt.fire();
    },
    deleteTimeSheet : function(component){
        component.set('v.showConfirmation', true);
    },
    cancel : function(component){
        component.set('v.showConfirmation', false);
    },
    delete : function(component){
        component.set('v.showConfirmation', false);
        component.set('v.showDetails', false);
        var event = component.getEvent('deleteTimeSheet');
        event.setParam('timeSheet', component.get('v.timeSheet'));
        event.fire();
    }
})