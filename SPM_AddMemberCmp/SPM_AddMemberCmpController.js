({
  addOrgUnit: function (component, event, helper) {
    var evt = $A.get("e.c:SPM_OrgUnitEvt");
    evt.setParam("orgUnits", "true");
    evt.fire();
  },
  addMember: function (component, event, helper) {
    var evt = $A.get("e.c:SPM_IsFormValidEvt");
    evt.fire();
    if (component.get("v.isValidFields") == true) {
      var membre = component.get("v.member");
      var memberSelected = component.get("v.memberSelected");
      if (Date.parse(membre.EndDate__c) <= Date.parse(membre.Birthdate)) {
        alert("Start date should be greater than End date");
      } else {
        var member = {
          organisation_Unit__c: membre.organisation_Unit__c,
          UserId__c: membre.UserId__c,
          LeadSource: membre.LeadSource,
          Birthdate: membre.Birthdate,
          Level__c: membre.Level__c,
          Title: membre.Title,
          EndDate__c: membre.EndDate__c
        };
        if (component.get("v.orgUnitId") != "") {
          member.organisation_Unit__c = component.get("v.orgUnitId");
        }

        if (component.get("v.userId") != "") {
          member.UserId__c = component.get("v.userId");
          (member.LeadSource = memberSelected.LeadSource),
            (member.Level__c = memberSelected.Level__c),
            (member.Title = memberSelected.Title);
        }
        var action = component.get("c.createMember");
        console.log("membre a enregistrer " + member);
        action.setParams({ member: member });
        action.setCallback(this, function (response) {
          var state = response.getState();
          if (state === "SUCCESS") {
            var customResponse = response.getReturnValue();
            var member = customResponse.data;
            console.log('member ' + JSON.stringify(member));
            var memberId = member[0].Id;
            console.log('memberId**** ', memberId);
            component.set('v.memberId', memberId);
            if (customResponse.hasError == false) {
              // var evt = component.getEvent("SPM_NewMemberCreatedEvt");
              /* evt.setParams({ member: customResponse.data[0] });
              evt.fire(); */
              component.set('v.isUpload',true);
              membre.UserId__c = "";
              membre.LeadSource = "";
              membre.Birthdate = "";
              membre.Level__c = "";
              membre.Title = "";
              membre.organisation_Unit__c = "";
              membre.EndDate__c = "";
              component.set("v.member", membre);
              /* helper.showToast(
                "Success",
                "Success",
                "The record has been created successfully"
              );
              $A.get("e.force:refreshView").fire(); */
            } else {
              helper.showToast("Error", "error", customResponse.messages);
              for (var message in customResponse.messages) {
                console.log("errrr " + message);
              }
            }
          } else {
            var errors = response.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                helper.showToast("Error", "error", errors[0].message);
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
    }
  },


  /*openModalMember : function(component,evt){
        var evt = $A.get("e.c:SPM_MemberEvt");
        evt.setParam("isModal","true");
        evt.fire();
    }*/

  openModalMember: function (component, evt) {
    var modal = component.get("v.isModal");
    modal = true;
    component.set("v.isModal", modal);
  },

  doInit: function (component, event, helper) {
    var recordId = component.get("v.recordId");
    if (recordId != null) {
      var action = component.get("c.getMemberById");
      action.setParams({ id: recordId });
      action.setCallback(this, response => {
        var state = response.getState();
        if (state === "SUCCESS") {
          var customResponse = response.getReturnValue();
          if (customResponse.hasError == false) {
            console.log(customResponse.data);
            component.set("v.member", customResponse.data);
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

  updateMember: function (component, event, helper) {
    var membres = [component.get("v.member")];
    var action = component.get("c.updateMembers");
    action.setParams({ members: membres });
    action.setCallback(this, function (response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        console.log(response.getReturnValue().data);
        var customResponse = response.getReturnValue();
        if (customResponse.hasError == false) {
          component.set('v.memberId', customResponse.data[0].Id);
          component.set('v.isUpload',true);
          helper.showToast(
            "Success",
            "Success",
            "The record has been updated successfully"
          );
         // $A.get("e.force:refreshView").fire();
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

  openModal: function (component, event, helper) {
    component.set("v.isModalOpened", true);
  },
  closeModal: function (component, event, helper) {
    component.set("v.isModal", false);
  }
});