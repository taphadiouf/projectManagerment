({

    doInit: function (component, event, helper) {
        var menu = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
            { label: 'Assign member', name: 'assignMember' },
        ];
        component.set('v.columns', [
            {label:'Project', fieldName:'AccountId', type:'text'},
            { label: 'Name', fieldName: 'Name', type: 'name' },
            {label:'Status', fieldName:'Status', type:'text'},
            {label:'Start Date', fieldName:'StartDate__c', type:'Date'},
            {label:'End Date', fieldName:'EndDate__c', type:'Date'}, 
            {label:'Link', fieldName:'Link__c', type:'text'},
           /*  {label:'Estimated Hours', fieldname:'Quantity', type:'number'},
            {label:'Billable Hours', fieldname:'AssetLevel', type:'number'},
            {label:'Logged Hours', fieldname:'Logged_Hours__c', type:'number'}, */
            // {label:'Description', fieldname:'Description', type:'text'},
            /* { label: 'Gender', fieldName: 'LeadSource', type: 'picklist' },
            { label: 'Contract Type', fieldName: 'Level__c', type: 'picklist' },
            { label: 'Organisation Unit', fieldName: 'organisation_Unit__r', type: 'text' },*/
            {
                type: 'action',
                typeAttributes: { rowActions: menu },
            } 
        ]);
        var pageSize = component.get("v.pageSize");
        var projectId = component.get("v.recordId");
        
        if(projectId === ''){
            helper.getTasks(component,pageSize);
        }else{
            helper.getTasksByProjectId(component,pageSize,projectId);
        }

    },

    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'show_details':
                helper.showRowDetails(component, event, row);
                break;
            case 'delete':
                helper.deleteTasks(component, row);
                break;
            case 'edit':
                helper.editTasks(component, row);
                break;
            case 'assignMember':
                helper.assignMember(component, row);
            default:
        }
    },
               
    openModalNewTask:function(component,event,helper){
        component.set('v.isModal',true);
    },

    addTaskToList: function (component, event, helper) {
        var task = event.getParam('task');
        var numberOfTasksToDisplay = component.get('v.numberOfTasksToDisplay');
        var tasks = component.get('v.tasks');
        Tasks.unshift(task);
        numberOfTasksToDisplay.unshift(task);
        component.set('v.numberOfTasksToDisplay', numberOfTasksToDisplay);
        component.set('v.tasks', task);
    },

    

    displayTaskToListFiltered: function (component, event, helper) {
        console.log('event handle')
        var filter = event.getParam('filter'),
            tasks = component.get('v.tasks');
        var dataTemp = tasks.filter((task) => {
            return (
                task.Status.toLowerCase().includes(filter.status.toLowerCase()) &&
                task.Account.Id.toLowerCase().includes(filter.project.toLowerCase()) //&&
                /* task.ContactId.includes(filter.member) &&
                task.cost__c == filter.timeScale */
            )
        });
        console.log('After filter ' + dataTemp)
        component.set('v.tasksSelected', dataTemp);
        component.set("v.totalSize", component.get("v.tasksSelected").length);
        var numberOfTasksToDisplay = [];

        for (var i = 0; i < component.get("v.totalSize"); i++) {

            numberOfTasksToDisplay.push(component.get("v.tasksSelected")[i]);

        }
        component.set('v.numberOfTasksToDisplay', numberOfTasksToDisplay);
    }

})