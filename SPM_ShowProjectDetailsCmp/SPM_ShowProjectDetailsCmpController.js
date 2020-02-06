({
  doInit: function(component, event, helper) {
    var myPageRef = component.get("v.pageReference");
    var id = myPageRef.state.c__Id,
      project = {};
    project.Id = id;
    component.set("v.recordId", id);
    helper.showDetail(component, project);
    $A.createComponent(
      "c:SPM_ListMembershasProjectCmp",
      {
        title: "  MEMBERS",
        projectId: id,
        project: project
      },
      function(newCmp) {
        if (component.isValid()) {
          component.set("v.body", newCmp);
        }
      }
    );
    console.log("project " + project.Id);
  },
  reInit: function(component) {
    $A.get("e.force:refreshView").fire();
  },

  displayListTasksOrMembers: function(component, event, helper) {
    var selectedOptionValue = event.getParam("value");
    var projectId = component.get("v.recordId");
    var project = component.get("v.project");
    if (selectedOptionValue === "task") {
      $A.createComponent(
        "c:SPM_ListTasksCmp",
        {
          projectId: projectId
        },
        function(newCmp) {
          if (component.isValid()) {
            component.set("v.body", newCmp);
          }
        }
      );
    }else{
        $A.createComponent(
            "c:SPM_ListMembershasProjectCmp",
            {
              title: "  MEMBERS",
              projectId: projectId,
              project: project
            },
            function(newCmp) {
              if (component.isValid()) {
                component.set("v.body", newCmp);
              }
            }
          );
    }
  },

  handleSelect: function(component, event, helper){
    var tab = event.getParam('id');
    console.log('tab selected '+ tab);
     if (tab == task){
      $A.createComponent(
        "c:SPM_ListTasksCmp",
        {
          projectId: projectId
        },
        function(newCmp) {
          if (component.isValid()) {
            component.set("v.body", newCmp);
          }
        }
      );
    }else if(tab == member){
        $A.createComponent(
            "c:SPM_ListMembershasProjectCmp",
            {
              title: "  MEMBERS",
              projectId: projectId,
              project: project
            },
            function(newCmp) {
              if (component.isValid()) {
                component.set("v.body", newCmp);
              }
            }
          );
    }else{
      
    }
  }
});