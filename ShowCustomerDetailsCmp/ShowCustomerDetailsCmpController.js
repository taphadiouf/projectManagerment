({
    doInit: function (component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var id = myPageRef.state.c__Id;
        var customerId = myPageRef.state.c__customerId;
        component.set("v.recordId", id);
        helper.showDetail(component);
        console.log('customer '+customerId)
        $A.createComponent(
            "c:SPM_ListProjectsCmp",
            {
                "customerId": customerId,
            },
            function (newCmp) {
                if (component.isValid()) {
                    component.set("v.body", newCmp);
                }
            }
        );
    },
    reInit : function (component){
        $A.get('e.force:refreshView').fire();
    }

})