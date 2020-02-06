({

    doInit: function (component, event, helper) {
        helper.getAllProjects(component);
    },

    filtrer: function (component, event) {
        var  project = component.get('v.project');
        var filter = {
            'project': project           
        };
        var evt = $A.get("e.c:SPM_FilterCustomersByProjectEvt");
            evt.setParams({'filter': filter});
            evt.fire();
    }
})