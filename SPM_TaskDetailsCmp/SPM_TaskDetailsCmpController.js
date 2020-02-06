({
    myAction : function(component, event, helper) {

    },

    doInit : function(component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var id = myPageRef.state.c__Id;
        component.set("v.recordId", id);
        helper.showDetail(component);
        /* helper.getAllActivitiesByTaskId(component, pageSize, id);
        var menu = [
            // { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
        ];
            component.set('v.columns', [
            { label: 'Task', fieldName: 'AssetId', type: 'Text' },
            { label: 'Name', fieldName: 'Subject', type: 'Text'},
            { label: 'Short Name', fieldName: 'SuppliedName', type: 'Text' },
            { label: 'Cost', fieldName: 'cost__c', type: 'number' },
            {
            type: 'action',
            typeAttributes: { rowActions: menu },
            }
        ]); */
        /* var pageSize = component.get("v.pageSize"); 
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
        $A.enqueueAction(action);*/


    }
    
})