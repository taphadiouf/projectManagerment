({

    doInit: function (component, event, helper) {
        //find all users
        helper.getAllMembers(component);
        //find all SPM_GenderCs
        helper.getAllProjects(component);
    },

    filtrer: function (component, event, helper) {
        var project = component.get('v.project'),
            member = component.get('v.member');

        var filter = {
            'project': project,
            'member': member
        };
        var evt = $A.get("e.c:SPM_FilterActivitiesEvt");
        evt.setParams({'filter': filter});
        evt.fire();
        console.log('event registre')
    },
})