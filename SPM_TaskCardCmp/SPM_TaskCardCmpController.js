({

	showDescription : function(component, event, helper) {
		console.log('activities '+component.get('v.activities'));
		component.set('v.isOpenModalTaskInformation',true)
	},
	onDragStart : function(component, event, helper) {
		event.dataTransfer.dropEffect = "move";
		var task = component.get('v.task');
        component.set('v.taskMoved',task);
        event.dataTransfer.setData('task', JSON.stringify(task));
        console.log('card moved '+JSON.stringify(task))
        var evt = $A.get("e.c:SPM_DragTaskEvt");
        evt.setParams({'task': task});
        evt.fire();
    },

	editTask : function(component, event, helper) {
		var task = component.get('v.task');
		var idTask = task.Id;
        component.set('v.isModal',true);
        component.set('v.taskId',idTask);
    }, 
    deleteTaskHandeler : function(component, event, helper) {
        var task = component.get('v.task');
        console.log('task******* '+JSON.stringify(task));
        if(task.hasOwnProperty('Account')){
            delete task.Account;
        }
        if(task.hasOwnProperty('assignMember')){
            delete task.assignMember;
        }
        if(task.hasOwnProperty('Cases')){
            delete task.Cases;
        }
        if(task.hasOwnProperty('numberActivityChecked')){
            delete task.numberActivityChecked;
        }
        console.log('----task******* '+JSON.stringify(task));
        helper.deleteTasks(component, task);
    }, 
    
    
    assignTaskToMember : function(component, event, helper) {
        
        var task = component.get('v.task'); 
        component.set('v.taskId', task.Id);
        component.set('v.recordId', task.AccountId);
        console.log('project id '+ task.AccountId);
        component.set('v.isModalAssign',true);

        var memberAssigned = task.Link__c;
        console.log('member '+ memberAssigned);
        var str  = memberAssigned.split(" ");
        var taille  = str.length();
       // var initialName = str[0].substr(0, 1)+str[taille -1].substr(0, 1);
       var p = str[0], 
           n = str[taille-1];

        component.set('v.memberAssigned', p[0]+n[0]);
        console.log('member '+ component.get('v.memberAssigned'));

    },
   
})