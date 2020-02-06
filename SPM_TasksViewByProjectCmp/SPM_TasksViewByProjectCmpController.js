({
     doInit : function(component, event, helper) {
         console.log('record id '+component.get('v.recordId'))
        helper.getTasksByProjectId(component, component.get('v.recordId'));
    } ,

    AddNoStartedTask: function(component, event, helper){
        component.set('v.isModal',true);   
        component.set('v.statusTask','Not Started');  
        console.log('current list '+component.get('v.statusTask')) ;
     },
     AddStartedTask: function(component, event, helper){
        component.set('v.isModal',true);   
        component.set('v.statusTask','Started');  
        console.log('current list '+component.get('v.statusTask')) ;
     },
     AddTestedTask: function(component, event, helper){
        component.set('v.isModal',true);   
        component.set('v.statusTask','Tested');  
        console.log('current list '+component.get('v.statusTask')) ;
     },
     AddDoneTask: function(component, event, helper){
        component.set('v.isModal',true);   
        component.set('v.statusTask','Done');  
        console.log('current list '+component.get('v.statusTask')) ;
     },
     doReload:function(component, event, helper){
        $A.get('e.force:refreshView').fire();
     },

     openPromptCompleted: function(component, event, helper){
         component.set('v.isOpenPromptCompleted',true);
     },
     
     closePromptCompleted: function(component, event, helper){
         component.set('v.isOpenPromptCompleted',false);
     },

     updateListTask: function(component,event,helper){
         helper.updateListTaskHelper(component,event);
     },

     updateListTasks: function(component,event,helper){
         //alert((event.getParam('taskDeleted')).Id)
        helper.updateListTasksHelper(component,event);
    },
})