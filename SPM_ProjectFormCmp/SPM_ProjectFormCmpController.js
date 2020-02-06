({
    doInit : function(component, event, helper) {
        helper.getAllStatus(component);
        helper.getAllCategories(component);
        helper.getAllProjects(component);
        helper.getAllMembers(component);
        helper.getAllPrograms(component);
        helper.getAllCustomer(component);
    },
    
    /*call dateUpdate function on onchange event on date field*/ 
    startDateUpdate : function(component, event, helper) {
        
        var today = new Date();        
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        // if date is less then 10, then append 0 before date   
        if(dd < 10){
            dd = '0' + dd;
        } 
        // if month is less then 10, then append 0 before date    
        if(mm < 10){
            mm = '0' + mm;
        }
        
        var todayFormattedDate = yyyy+'-'+mm+'-'+dd;
        var project = component.get("v.project"),
            startDate = project.Start_Date__c;
        if(startDate == '' || startDate == null){
            project.End_Date__c = '';
            component.set('v.project', project);
        }
        else{
            if(project.End_Date__c != null && startDate > project.End_Date__c){
                project.End_Date__c = project.Start_Date__c;
                component.set('v.project', project);
            }
        }
        if(startDate != '' && startDate < todayFormattedDate){
            component.set("v.startDateValidationError" , true);
        }else{
            component.set("v.startDateValidationError" , false);
        }
    },
    
    endDateUpdate : function(component, event, helper) {
        
        var project = component.get("v.project"),
            startDate = project.Start_Date__c,
            endDate = project.End_Date__c;
        if(endDate != '' && endDate <= startDate){
            component.set("v.endDateValidationError" , true);
        }else{
            component.set("v.endDateValidationError" , false);
        }
    },
    
    handleProject: function (component, event) {
        var selectedOptionValue = event.getParam("value");
        var project = component.get('v.project');
        project.ParentId = selectedOptionValue;
        component.set('v.project',project);
    },
    
    
    handleStatus: function (component, event) {
        var selectedOptionValue = event.getParam("value");
        var project = component.get('v.project');
        project.Type = selectedOptionValue;
        component.set('v.project',project);
    },
    
    openModalNewProgram: function(component,event,helper){
        component.set("v.isOpenModalNewProgram",true);
    },
    
    openModalNewCustomer: function(component,event,helper){
        component.set("v.isOpenModalNewCustomer",true);
    },
    
    verifyFields:function(component, event,helper){
        var isValidForm = component.find('isFieldValid').reduce((validSoFar,inputCmp)=>{
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        },true);
            if(isValidForm){
            component.set('v.isValidFields',true);
        }
            
        },
            handleNewProgramCreation: function(component, event, helper){
                var createdPrograms = event.getParam('programs');
                var programs = component.get('v.programs');
                createdPrograms.forEach(function(program){
                    program.label = program.Name;
                    program.value = program.Id;
                    programs.push(program);
                });
                component.set('v.programs',programs);
            },
            
            handleNewCustomerCreation: function(component, event, helper){
                var createdCustomer = event.getParam('customer');
                var customers = component.get('v.customers');
                createdCustomer.label = createdCustomer.Name;
                createdCustomer.value = createdCustomer.Id;
                customers.unshift(createdCustomer);
                component.set('v.customers',customers);
            },
        })