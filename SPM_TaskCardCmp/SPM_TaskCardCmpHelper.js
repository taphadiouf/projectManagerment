({
  getAllActivitiesByTask: function(component, taskId) {
    var action = component.get("c.getAllActivitiesByTaskId");
    action.setParams({ taskId: taskId });
    action.setCallback(this, function(response) {
      var state = response.getState();
      if (component.isValid() && state === "SUCCESS") {
        var activities = response.getReturnValue().data;
        component.set("v.activities", activities);
      }
    });
    $A.enqueueAction(action);
  },
  deleteTasks: function (component, task) {
    var action = component.get("c.deleteTask");
    var tasksRow = [task];
    console.log('task deleted '+tasksRow[0]);
    action.setParams({ tasks: tasksRow });
    action.setCallback(this, function (response) {
        var state = response.getState();
        if (state === "SUCCESS") {
            var customResponse = response.getReturnValue();
            if (customResponse.hasError == false) {
                console.log('icicicic')
                var evt = component.getEvent('SPM_TaskDeletedEvt');
                evt.setParams({'taskDeleted':tasksRow[0]});
                evt.fire();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been deleted successfully.",
                    "type": "Success"
                });
                toastEvent.fire();
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
});