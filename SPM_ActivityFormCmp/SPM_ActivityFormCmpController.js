({
    doInit : function(component, event, helper) {
        if(component.get('v.taskId')===''){
            helper.getAllTasks(component);
        }
    },

    verifyFields:function(component, event,helper){
        var isValidForm = component.find('isValideField').reduce((validSoFar,inputCmp)=>{
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        },true);
        if(isValidForm){
            component.set('v.isValidFields',true);
        }
            
    },
    openModal: function(component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpen", true);
     },
     
            
            
            
            taskChange: function (component, event) {
        var selectedOptionValue = event.getParam("value");
        var activity = component.get('v.activity');
        activity.AssetId = selectedOptionValue;
                component.set('v.activity',activity);
            },

     openModalNewTask: function(component,event,helper){
        component.set("v.isOpenModalNewTask",true);
    },


    handleNewTaskCreation: function(component, event, helper){
        var createdTasks = event.getParam('tasks');
        var tasks = component.get('v.tasks');
        createdTasks.forEach(function(task){
            task.label = task.Name;
            task.value = task.Id;
            tasks.push(task);
        });
        component.set('v.tasks',tasks);
    },

})