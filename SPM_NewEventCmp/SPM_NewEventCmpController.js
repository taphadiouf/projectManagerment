({
    doInit : function(component, event, helper) {
        helper.doInit(component);
    },
    selectProjectHandler : function(component, event, helper) {
        var selectedProjectId = event.getSource().get('v.value');
        helper.setProjectTasks(component, selectedProjectId);
    },
    selectTaskHandler : function(component, event, helper) {
        console.log(event.getSource().get('v.value'));
        var selectedTaskId = event.getSource().get('v.value');
        helper.setTaskActivities(component, selectedTaskId);
    },
    close : function(component, event, helper) {
        component.set('v.createNewEvent', false);
    },
    save : function(component, event, helper) {
        var valideDatas = component.find('select').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if(valideDatas){
            helper.saveTimeSheet(component);
        }
    },
    startTimeHandler : function(component, event, helper) {
        helper.incrementEndTimeValue(component);
    }
})