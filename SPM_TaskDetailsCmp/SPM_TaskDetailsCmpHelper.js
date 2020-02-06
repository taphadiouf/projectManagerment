({
    helperMethod : function() {

    },

    showDetail: function(component){
        var recordId = component.get('v.recordId');
        var action = component.get("c.getTaskById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log('---Taskt--- '+customResponse.data);
                        component.set('v.task', customResponse.data);
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
 
    /* getAllActivitiesByTaskId: function (component, pageSize,taskId) {
       
        var action = component.get("c.getAllActivitiesByTaskId");
        action.setParams({taskId: taskId });
        action.setCallback(this, function (response) {
            console.log('ici')
            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var activities = response.getReturnValue().data;
                activities.forEach(activity => {
                    if(activity.AssetId != null){
                        activity.AssetId = activity.Asset.Name;
                        }
                });
                component.set('v.activities', activities);

                console.log(response.getReturnValue().data);

                component.set("v.totalSize", component.get("v.activities").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfActivitiesToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {

                    for (var i = 0; i < component.get('v.totalSize'); i++) {

                        numberOfActivitiesToDisplay.push(activities[i]);

                    }
                } else {
                    for (var i = 0; i < pageSize; i++) {

                        numberOfActivitiesToDisplay.push(activities[i]);

                    }
                }

                component.set('v.numberOfActivitiesToDisplay', numberOfActivitiesToDisplay);

            }else {
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
    },  */
})