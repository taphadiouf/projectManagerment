({

    doInit: function (component, event, helper) {
        helper.getAllProjects(component);
    },

    filtrer: function (component, event) {
        var project = component.get('v.project') 
        var evt = $A.get("e.c:SPM_FilterMembersByProjectEvt");
        evt.setParams({'projectId': project});
        evt.fire();
        console.log('event registre '+ project)
    },
})