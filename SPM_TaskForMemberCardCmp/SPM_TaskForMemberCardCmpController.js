({
  doInit: function (component, event, helper) {
    helper.getTaskByMemberId(component, event, helper);
   /*var newItems = [
      {
        Name: "One item",
        StartDate__c: "13/16/2019",
        EndDate__c: "15/16/2019"
      }
    ];
    component.set("v.allItemsToDo", newItems);*/
  },

  onTaskBlockChanged: function (component, event, helper) {
    var task = event.getParam("task");
    var allLists = component.get("v.allItemsInProgress");
    alert('first Test ' + JSON.stringify(allLists));
    component.set("v.allItemsInProgress", task);

  }
})