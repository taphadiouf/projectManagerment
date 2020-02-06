({

    doInit: function (component, event, helper) {
        helper.getAllStatus(component);
        helper.getAllCategories(component);
        helper.getAllMembers(component);
        helper.getAllCustomer(component);
    },

    filtrer: function (component, event) {
        var status = component.get('v.statu'),
            category = component.get('v.category'),
            customer = component.get('v.customer'),
            member = component.get('v.member'),
            startDate = component.get('v.startDate'),
            endDate = component.get('v.startDate'),
            mineOrAll = component.get('v.mineOrAll');
            console.log(mineOrAll)
        var filter = {
            'status': status,
            'category': category,
            'customer': customer,
            'member': member,
            'startDate': startDate,
            'endDate': endDate,
            'mineOrAll': mineOrAll
        };
        var evt = $A.get("e.c:SPM_FilterProjectEvt");
        evt.setParams({'filtre': filter});
        evt.fire();
        console.log('event registre')
    },

   
    

    
    




})