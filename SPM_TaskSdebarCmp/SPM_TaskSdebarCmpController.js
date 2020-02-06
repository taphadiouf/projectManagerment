({

    doInit: function (component, event, helper) {
        //find all users
        helper.getAllMembers(component);
        //find all SPM_GenderCs
        helper.getAllProjects(component);

        helper.getAllStatus(component);
    },

    filtrer: function (component, event, helper) {
        var status = component.get('v.statu'),
            project = component.get('v.project'),
            member = component.get('v.member');

        var filter = {
            'status': status,
            'project': project,
            'member': member
        };
        var evt = $A.get("e.c:SPM_FilterTaskEvt");
        evt.setParams({'filter': filter});
        evt.fire();
        console.log('event registre')
    },
})