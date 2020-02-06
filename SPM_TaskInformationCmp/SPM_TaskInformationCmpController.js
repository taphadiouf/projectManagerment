({
   openModel: function(component, event, helper) {
      // Set isModalOpen attribute to true
      component.set("v.isModalOpen", true);
   },
  
   closeModel: function(component, event, helper) {
      // Set isModalOpen attribute to false 
      	// alert('bkjfdkjvv'); 
      component.set("v.isModalOpen", false);
       
   },
    editTaskMember : function(component, event, helper) {
        
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

  
   submitDetails: function(component, event, helper) {
      // Set isModalOpen attribute to false
      //Add your code to call apex method or do some processing
      component.set("v.isModalOpen", false);
   },
    doInit:function(component,event,helper){
        
       
        /*var task = component.get('v.task'),
            taskId = task.Id
        helper.getAllActivitiesByTask(component,taskId);
        console.log('activities '+component.get('v.activities'));*/
    },
    onCheck:function(component,event,helper){
         
        var check =component.find('checkbox');
        var num = component.get('v.numActivityChecked');
        var task = component.get('v.task');
        var activityId = event.getSource().get("v.name");
        var indexvar = event.getSource().get("v.label");
        console.log("indexvar:::" + indexvar);
        if(Array.isArray(check)){
            check[indexvar-1].get('v.value') ? num += 1 : num -= 1;
            task.Cases[indexvar-1].Id = activityId;
            task.Cases[indexvar-1].ActivityCompleted__c = check[indexvar-1].get('v.value');
        }else{
            check.get('v.value') ? num += 1 : num -= 1;
            task.Cases[0].Id = activityId;
            task.Cases[0].ActivityCompleted__c = check.get('v.value');
            console.log('apres check '+ num);
        }
        component.set('v.numActivityChecked',num);
        task.Percent_Complet__c = num/task.Cases.length*100;
        component.set('v.task',task);
        var activities = task.Cases;
        helper.editActivities(component, activities,task);
    },
    
    ajouter: function(component, event, helper) {
    	var cmpMsg = component.find("msg");
    	$A.util.removeClass(cmpMsg, 'hide');
    	
        var comments = component.find("comments").get("v.value");
        var oTextarea = component.find("oTextarea");
        var cmt= oTextarea.get("v.value");
        oTextarea.set("v.value", cmt+' \n'+comments);       
    },
    openModalAddActivity:function(component,event,helper){
        component.set('v.isModal',true);
    },

    updateListActivity:function(component,event,helper){
        console.log('activities '+(component.get('v.task')).Cases);
        helper.updateListActivitiesHelper(component,event);
    },

    deleteActivity:function(component,event, helper){
        var index = event.getSource().get("v.value");
        var activities = (component.get('v.task')).Cases;
        console.log(index);
        console.log('id activity '+activities[index].Id);
        helper.deleteActivity(component, activities[index]);
    },

    updateActivity:function(component,event, helper){
        var index = event.getSource().get("v.value");
        var activities = (component.get('v.task')).Cases;
        console.log(index);
        console.log('id activity '+activities[index].Id);
        helper.editActivity(component, activities[index]);
    }
       
})