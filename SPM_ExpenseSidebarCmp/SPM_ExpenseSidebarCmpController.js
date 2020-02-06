({

    doInit: function (component, event, helper) {
        helper.getAllProject(component);
       helper.getAllExpenseType(component);
        
    },

    filtrer: function (component, event) {
          var  project = component.get('v.project'),
               membersHasProject = component.get('v.membersHasProject'),
               expenseType = component.get('v.expenseType');
         

        var filter = {
            'project': project,
            'membersHasProject': membersHasProject,
            'expenseType': expenseType
           
        };
        var evt = $A.get("e.c:SPM_FilterExpenseEvt");
            evt.setParams({'filter': filter});
            evt.fire();
            console.log('event registre')
    },
    projectChange : function(component, event, helper){
        var projectId = event.getParam("value");
        helper.getAllMemberByProjectId(component, projectId);
    }
})