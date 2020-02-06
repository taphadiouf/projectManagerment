({
  doInit: function(component, event, helper) {
    helper.getAllProjects(component);
  },

  reInit: function(component, event, helper) {
    $A.get('e.force:refreshView').fire();
  },

  handleProject: function(component, event, helper) {
    var myPageRef = component.get("v.pageReference"),
        model = myPageRef.state.c__Model;
    if (model === "subProject") {
        var project = component.get("v.project");
        project.ParentId = component.get("v.projectId");
        component.set("v.project", project);
      $A.createComponent(
        "c:SPM_NewProjectCmp",
        {
          title: " Sub Project",
          project: component.get("v.project"),
          isNotModal: true,
          isSubOrCloneProject: true,
          isNotParentId: false
        },
        function(newCmp) {
          if (component.isValid()) {
            component.set("v.body", newCmp);
          }
        }
      );
    }else{
        var project = component.get("v.project");
        component.set("v.project", project);
        $A.createComponent(
            "c:SPM_NewProjectCmp",
            {
              title: " Clone The Project",
              project: component.get("v.project"),
              isNotModal: true,
              isSubOrCloneProject: true,
              recordId:component.get("v.projectId"),
            },
            function(newCmp) {
              if (component.isValid()) {
                component.set("v.body", newCmp);
              }
            }
          );
    }
  }
});