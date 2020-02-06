({
    doInit: function (component, event, helper) {
        var menu = [
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
        ];
            component.set('v.columns', [
            { label: 'Task', fieldName: 'Name', type: 'Text' },
            { label: 'Name', fieldName: 'Subject', type: 'Text'},
            { label: 'Short Name', fieldName: 'SuppliedName', type: 'Text' },
            { label: 'Cost', fieldName: 'cost__c', type: 'number',cellAttributes: { alignment: 'left' } },
            {
            type: 'action',
            typeAttributes: { rowActions: menu },
            }
        ]);
        var pageSize = component.get("v.pageSize");
        var taskId = component.get("v.recordId");
        if(taskId === ''){
            console.log('on est ici')
            helper.getActivities(component,pageSize);
        }else{
            console.log('taskId is nont null')
            helper.getAllActivitiesByTask(component,pageSize,taskId);
        }
        
    },
    
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
           case 'delete':
                alert('Delete');
                helper.deleteActivity(component, row);
                break;
            case 'edit':
                helper.editActivity(component, row);
            default:
        }
    },
    openModalAddActivity:function(component,event,helper){
        component.set('v.isModal',true);
    },
    
    addActivityToList: function(component, event,helper){
        var activity = event.getParam('activity');
        var numberOfActivitiesToDisplay = component.get('v.numberOfActivitiesToDisplay');
        var activities = component.get('v.activities');
        activities.unshift(activity);
        numberOfActivitiesToDisplay.unshift(activities);
        component.set('v.numberOfActivitiesToDisplay',numberOfActivitiesToDisplay);
        component.set('v.activities',activities);
    },
    openModalAddActivity:function(component,event,helper){
        component.set('v.isModal',true);
    }

                    
                    
})