({
    displayeProjects : function(component, event, helper) {
        component.set('v.isDisplayProject',true);
        component.set('v.itemFlown','project');
    },
    displayeAbsence : function(component, event, helper) {
        component.set('v.isDisplayProject',true);
        component.set('v.itemFlown','absence');
    },

    hideProjects : function(component, event, helper) {
        component.set('v.isDisplayProject',false);
    }
})