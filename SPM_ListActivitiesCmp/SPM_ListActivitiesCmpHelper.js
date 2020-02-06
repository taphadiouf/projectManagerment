({
    deleteActivity: function (component, row) {
        var action = component.get("c.deleteActivities");
        var activitiesRow = [JSON.parse(JSON.stringify(row))];
        console.log(activitiesRow[0]);
        action.setParams({ activities: activitiesRow });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The record has been deleted successfully.",
                        "type": "Success"
                    });
                    toastEvent.fire();
                    $A.get("e.force:refreshView").fire();                    
                }  else {
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

    

    editActivity: function(component, row){
        var activity = JSON.parse(JSON.stringify(row));
        component.set('v.isModal',true);
        component.set('v.recordId',activity.Id);
        var action = component.get("c.getActivityById");
            action.setParams({ id: activity.Id });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.activity', customResponse.data);
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
        
    
    getActivities: function(component,pageSize){
        var action = component.get("c.getAllActivities");
        
        action.setCallback(this, function (response) {
            
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS") {
                console.log('dans le halper')
                var activities = response.getReturnValue().data;
                  activities.forEach(activity => {
                    if(activity.hasOwnProperty('Asset')){
                        if(activity.Asset.hasOwnProperty('Name')){
                            activity.Name = activity.Asset.Name;
                        }
                    }
                 }); 
                component.set('v.activities', activities);
                
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.activities").length);
                
                component.set("v.start", 0);
                
                component.set("v.end", pageSize - 1);
                
                var numberOfActivitiesToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {
                    
                    for (var i = 0; i < component.get('v.totalSize'); i++) {
                        
                        numberOfActivitiesToDisplay.push(activities[i]);
                        
                    }
                }else{
                    for (var i = 0; i < pageSize; i++) {
                        
                        numberOfActivitiesToDisplay.push(activities[i]);
                        
                    }
                }
                
                component.set('v.numberOfActivitiesToDisplay', numberOfActivitiesToDisplay);
                
                
                
            }
            
        });
        
        $A.enqueueAction(action);
    },
    getAllActivitiesByTask: function(component,pageSize, taskId){
        var action = component.get("c.getAllActivitiesByTaskId");
        action.setParams({taskId: taskId});
        action.setCallback(this, function (response) {
            
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS") {
                var activities = response.getReturnValue().data;
                activities.forEach(activitie => {
                    activitie.Name = activitie.Asset.Name;
                 });
                component.set('v.activities', activities);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.activities").length);
                
                component.set("v.start", 0);
                
                component.set("v.end", pageSize - 1);
                
                var numberOfActivitiesToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {
                    
                    for (var i = 0; i < component.get('v.totalSize'); i++) {
                        
                        numberOfActivitiesToDisplay.push(activities[i]);
                        
                    }
                }else{
                    for (var i = 0; i < pageSize; i++) {
                        
                        numberOfActivitiesToDisplay.push(activities[i]);
                        
                    }
                }
                
                component.set('v.numberOfActivitiesToDisplay', numberOfActivitiesToDisplay);
                
                
                
            }
            
        });
        
        $A.enqueueAction(action);
        
    }
})