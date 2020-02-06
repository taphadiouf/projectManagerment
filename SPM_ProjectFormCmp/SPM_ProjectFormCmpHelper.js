({
    getAllCategories: function(component) {
        var action = component.get("c.getAllCategories");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let categories=customResponse.data;
                    categories.forEach((category)=>{
                        category.value=category.Project_Category_Value__c;
                        category.label=category.Name;
                    });
                    component.set("v.categories",categories);
                } else {
                    console.log(customResponse.message);
                }
            }
            else {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },

    getAllStatus: function(component) {
        var action = component.get("c.getAllStatus");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let status=customResponse.data;
                  console.log(customResponse.data);
                    status.forEach((statu)=>{
                        statu.value=statu.Project_Status_Value__c;
                        statu.label=statu.Name;
                    });
                    component.set("v.status",status);
                } else {
                    console.log(customResponse.message);
                }
            }
            else {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },

    getAllProjects: function(component) {
        var action = component.get("c.getAllProjects");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let projects=customResponse.data;
                    projects.forEach((project)=>{
                        project.value=project.Id;
                        project.label=project.Name;
                    });
                    component.set("v.projects",projects);
                } else {
                    console.log(customResponse.message);
                }
            }
            else {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },

    getAllMembers: function(component) {
        var action = component.get("c.getAllMembers");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let members=customResponse.data;
                    members.forEach((member)=>{
                        member.value=member.Id;
                        member.label=member.Name;
                    });
                    component.set("v.members",members);
                } else {
                    console.log(customResponse.message);
                }
            }
            else {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
    
    getAllPrograms: function(component) {
        var action = component.get("c.getAllPrograms");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let programs=customResponse.data;
                    programs.forEach((program)=>{
                        program.value=program.Id;
                        program.label=program.Name;
                    });
                    component.set("v.programs",programs);
                } else {
                    console.log(customResponse.message);
                }
            }
            else {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },

    getAllCustomer: function(component) {
        var action = component.get("c.getAllCustomers");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let customers=customResponse.data;
                    customers.forEach((customer)=>{
                        customer.value=customer.Id;
                        customer.label=customer.Name;
                    });
                    component.set("v.customers",customers);
                } else {
                    console.log(customResponse.message);
                }
            }
            else {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
})