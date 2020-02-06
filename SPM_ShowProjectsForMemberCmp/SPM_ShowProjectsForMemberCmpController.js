({
    doInit: function (component, event, helper) {

        var action = component.get("c.getProjectsByActualMemberHasProject");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var projects = component.get('v.projects');
                    projects = customResponse.data;
                    component.set('v.projects', projects);
                } else {
                    for (var message in customResponse.messages) {
                        console.log(message);
                    }
                }
            }
            else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);

    },

    getProject: function(component,event,helper){
        var target = event.currentTarget;
        var index = target.getAttribute("data-selected-Index");
        var projects = component.get('v.projects');
        var projectId = projects[index].Id;
        component.set('v.projectId',projectId);
        console.log('project selected '+component.get('v.projectId'));
    }
})