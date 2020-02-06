({
    doInit : function(component,event,helper){
        var projectId = component.get('v.projectId');
        if(projectId === ''){
            helper.getAllMembers(component);
        }else{
            helper.getAllMemberWithoutProjectId(component , projectId);
        }
      helper.getAllProjects(component);
      helper.getAllRoles(component);

    },
    verifyFields:function(component, event,helper){
        var isValidForm = component.find('isValideField').reduce((validSoFar,inputCmp)=>{
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        },true);
        if(isValidForm){
            component.set('v.isValidFields',true);
        }
            
    }
})