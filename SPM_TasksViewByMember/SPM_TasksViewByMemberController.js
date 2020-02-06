({
    doInit : function(component, event, helper) {
        console.log('record id '+component.get('v.recordId'))
       helper.getTasksByProjectId(component, component.get('v.recordId'));
   } ,

    updateListTask: function(component,event,helper){
        helper.updateListTaskHelper(component,event);
    },

    updateListTasks: function(component,event,helper){
        //alert((event.getParam('taskDeleted')).Id)
       helper.updateListTasksHelper(component,event);
   },
   reInit: function(component,event,helper){
    helper.displayTaskByProject(component);
   },
})