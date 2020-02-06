({
    getAllTaskByProject : function(component) {
        console.log(' ############ running helper ');
        var action = component.get("c.getAllTaskByProjectId");
        action.setParams({projectId: component.get('v.projectId')})
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  var maList = component.get("v.tasks");  
                  let tasks=customResponse.data;
                    tasks.forEach(function(task){
                        maList.push({'value':task.Id,'label':task.Name})
                    });
                    console.log(' ############ running helper projectId '+component.get('v.projectId'));
                    console.log(' ############ running helper '+JSON.stringify(maList));
                    component.set("v.tasks",maList);
                } else {
                    console.log(customResponse.message);
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


    getAllMemberByProjectId: function (component) {
        var action = component.get("c.getAllMemberByProjectId");
        action.setParams({projectId: component.get('v.projectId')})

        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                console.log('ce qui est retourne '+response.getReturnValue().data);
                var membersHasProject = response.getReturnValue().data;
                membersHasProject.forEach(memberHasProject => {
                    
                    memberHasProject.label = memberHasProject.SPM_Members__r.Name;
                    memberHasProject.value = memberHasProject.Id;

                });
                component.set('v.membersHasProject', membersHasProject);
                console.log(response.getReturnValue().data);

            }

        });

        $A.enqueueAction(action);
    }
})