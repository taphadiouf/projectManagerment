({
    myAction: function (component, event, helper) {

    },
    doInit: function (component, event, helper) {
        if (component.get('v.projectId') === '') {
            helper.getAllProjects(component);
        }
        else {
            helper.getProjectById(component);
        }
        helper.getAllStatus(component);

        //helper.getAllWorkUnits(component);

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
    startDateUpdate: function (component, event, helper) {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        // if date is less then 10, then append 0 before date   
        if (dd < 10) {
            dd = '0' + dd;
        }
        // if month is less then 10, then append 0 before date    
        if (mm < 10) {
            mm = '0' + mm;
        }

        var todayFormattedDate = yyyy + '-' + mm + '-' + dd;
        var task = component.get("v.task"),
            startDate = task.Start_Date__c;
        if(startDate == '' || startDate == null){
            task.End_Date__c = '';
            component.set('v.task', task);
        }
        else{
            if(task.End_Date__c != null && startDate > task.End_Date__c){
                task.End_Date__c = task.Start_Date__c;
                component.set('v.task', task);
            }
        }
        if (startDate != '' && startDate < todayFormattedDate) {
            component.set("v.startDateValidationError", true);
        } else {
            component.set("v.startDateValidationError", false);
        }

    },
    endDateUpdate: function (component, event, helper) {
        var task = component.get("v.task"),
            startDate = task.Start_Date__c,
            endDate = task.End_Date__c;
        if (endDate != '' && endDate <= startDate) {
            component.set("v.endDateValidationError", true);
        } else {
            component.set("v.endDateValidationError", false);
        }
    },
    projectChange: function (component, event, helper) {
        var selectedOptionValue = event.getParam("value");
        var aTask = component.get('v.task');
        var projects = component.get('v.projects');
        aTask.AccountId = selectedOptionValue;
        projects.forEach(project => {
            if (project.Id === selectedOptionValue) {
                component.set('v.selectedProject', project);
            }
        });
        component.set('v.task', aTask);
    },
    statusChange: function (component, event, helper) {
        var selectedOptionValue = event.getParam("value");
        var aTask = component.get('v.task');
        console.log(selectedOptionValue);
        aTask.Status = selectedOptionValue;
        component.set('v.task', aTask);
    },
    openModal: function (component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpen", true);
    },
    /*,
workUnitChange: function(component, event, helper){
var selectedOptionValue = event.getParam("value");
var unit = component.get('v.task');
aTask.Status = selectedOptionValue;
component.set('v.task',unit);
},*/
    handleNewWorkUnitCreation: function (component, event, helper) {
        var createdWorkUnits = event.getParam('workUnits');
        var workUnits = component.get('v.workUnits');
        createdWorkUnits.forEach(function (workUnit) {
            workUnit.label = workUnit.Name;
            workUnit.value = workUnit.Id;
            workUnits.push(workUnit);
        });
        component.set('v.workUnits', workUnits);
    }
})