({
    doInit : function(component, event, helper) {
        helper.getAllTaskByProject(component);
        helper.getAllMemberByProjectId(component);
    }
})