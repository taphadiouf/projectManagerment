({
    doInit: function (component, event, helper) {
        helper.getAllProject(component);
        helper.getAllPaymentTypes(component);
        helper.getAllExpenseTypes(component);

    },
    verifyFields: function (component, event, helper) {
        var isValidForm = component.find('isValideField').reduce((validSoFar, inputCmp) => {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if (isValidForm) {
            component.set('v.isValidFields', true);
        }

    },

    projectChange: function (component, event, helper) {
        var projectId = event.getParam("value");
        helper.getAllMemberByProjectId(component, projectId);
    },

    AddNewRow: function (component, event, helper) {
        var addRowInList = component.get("v.expenses");
        var contactObj = {
            'AccountId': '',
            'Member_has_project__c': '',
            'amount__c': '',
            'SuppliedCompany': '',
            'Origin': '',
            'SuppliedName': '',
            'SuppliedPhone': '',
            'SPM_Description__c': '',
            'CreatedDate': '',
            'Type': ''
        };
        addRowInList.push(contactObj);
        alert();
        component.set("v.invoiceLines", addRowInList);

    },
    removeRow: function (component, event, helper) {
        var whichOne = event.target.getAttribute("id")
        var AllRowsList = component.get("v.expenses");
        AllRowsList.splice(whichOne, 1);
        component.set("v.expenses", AllRowsList);
    }

})