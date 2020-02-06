({
    doInit : function(component,event,helper){
      helper.getAllProject(component);
      helper.getAllPaymentTypes(component);
      helper.getAllExpenseTypes(component);

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
    projectChange : function(component, event, helper){
        var projectId = event.getParam("value");
        var projects = component.get('v.projects');
        projects.forEach(project => {
            if(project.Id === projectId){
                component.set('v.selectedProject',project);
            }
        });
        helper.getAllMemberByProjectId(component, projectId);
    }
    
})