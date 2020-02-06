({

    doInit: function (component, event, helper) {
        //find all users
        helper.getAllMembers(component);
        //find all SPM_GenderCs
       helper.getAllTypes(component);
        //find all ContratCs
        helper.getAllStatus(component);
    },

    filtrer: function (component, event) {
        var status = component.get('v.statu'),
            type = component.get('v.type'),
            member = component.get('v.member'),
            timeScale = component.get('v.timeScale');

        var filter = {
            'status': status,
            'type': type,
            'member': member,
            'timeScale': timeScale
        };
        var evt = $A.get("e.c:SPM_FilterAbsencesEvt");
        evt.setParams({'filter': filter});
        evt.fire();
        console.log('event registre')
    },
})