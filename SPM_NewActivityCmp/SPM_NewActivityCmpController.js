({
  myAction: function(component, event, helper) {},

  doInit: function(component, event, helper) {
    var recordId = component.get("v.recordId");
    if (recordId != null) {
      var action = component.get("c.getActivityById");
      action.setParams({ id: recordId });
      action.setCallback(this, response => {
        var state = response.getState();
        if (state === "SUCCESS") {
          var customResponse = response.getReturnValue();
          if (customResponse.hasError == false) {
            console.log(customResponse.data);
            component.set("v.activity", customResponse.data);
          } else {
            for (var message in customResponse.messages) {
              console.log(message);
            }
          }
        } else {
          var errors = response.getError();
          if (errors) {
            if (errors[0] && errors[0].message) {
              console.log("Error message: " + errors[0].message);
            }
          } else {
            console.log("Unknown error");
          }
        }
      });
      $A.enqueueAction(action);
    }
  },

  addActivity: function(component, event, helper) {
    var evt = $A.get("e.c:SPM_IsFormValidEvt");
    evt.fire();
    if (component.get("v.isValidFields") == true) {
      var activity = component.get("v.activity");
      if(component.get('v.taskId')){
        activity.AssetId = component.get('v.taskId');
      }
      activity.ActivityCompleted__c = false;
      var action = component.get("c.createActivity");
      action.setParams({ activity: activity });
      action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
          console.log(response.getReturnValue().data);
          var customResponse = response.getReturnValue();
          if (customResponse.hasError == false) {
            console.log('before evnet registed')
            var evt = component.getEvent('SPM_NewActivityCreatedEvt');
            evt.setParams({'newActivity': customResponse.data[0],'isUpdate':false});
            evt.fire();
            console.log('event registed ++++')
            activity.AssetId = "",
            activity.Subject = "",
            activity.SuppliedName = "",
            activity.cost__c = "",
            component.set("v.activity", activity);
            helper.showToast(
              "Success",
              "Success",
              "The record has been created successfully"
            );
            $A.get("e.force:refreshView").fire();
          } else {
            helper.showToast("Error", "error", customResponse.messages);
            for (var message in customResponse.messages) {
              console.log(message);
            }
          }
        } else {
          var errors = response.getError();
          if (errors) {
            if (errors[0] && errors[0].message) {
              console.log("Error message: " + errors[0].message);
            }
          } else {
            console.log("Unknown error");
          }
        }
      });
      component.set("v.isModal", false);
      $A.enqueueAction(action);
    }
  },

  updateActivity: function(component, event, helper) {
    var activities = [component.get("v.activity")];
    var action = component.get("c.updateActivities");
    action.setParams({ activities: activities });
    action.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        console.log(response.getReturnValue().data);
        var customResponse = response.getReturnValue();
        if (customResponse.hasError == false) {
          var evt = component.getEvent('SPM_NewActivityCreatedEvt');
            evt.setParams({'ActivityUpdated': customResponse.data[0],'isUpdate':true});
            evt.fire();
          helper.showToast(
            "Success",
            "Success",
            "The record has been updated successfully"
          );
          component.set('v.recordId','');
          $A.get("e.force:refreshView").fire();
        } else {
          helper.showToast("Error", "error", customResponse.messages);
          for (var message in customResponse.messages) {
            console.log(message);
          }
        }
      } else {
        var errors = response.getError();
        if (errors) {
          if (errors[0] && errors[0].message) {
            console.log("Error message: " + errors[0].message);
          }
        } else {
          console.log("Unknown error");
        }
      }
    });
    component.set("v.isModal", false);
    $A.enqueueAction(action);
  },

  openModal: function(component, event, helper) {
    component.set("v.isModalOpened", true);
  },

  closeModal: function(component, event, helper) {
    component.set("v.isModal", false);
  }
});