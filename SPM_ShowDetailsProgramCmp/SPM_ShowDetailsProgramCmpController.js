({
    doInit: function (component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var id = myPageRef.state.c__Id;
        component.set("v.recordId", id);
        helper.showDetail(component);
        console.log('program '+id)
        $A.createComponent(
            "c:SPM_ListProjectsCmp",
            {
                "programId": id,
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
    },
    refreshComponent: function(component, event, helper){
        console.log('refresh')       
    }
})