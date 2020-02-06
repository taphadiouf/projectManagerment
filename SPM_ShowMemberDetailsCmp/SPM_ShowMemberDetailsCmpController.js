({
    doInit: function (component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var id = myPageRef.state.c__Id,
            userId = myPageRef.state.c__userId,
            memberSelected = myPageRef.state.c__member;
        component.set("v.recordId", id);
        component.set("v.userId", userId);
        helper.showDetail(component);
        console.log('memberSelected '+memberSelected)
        $A.createComponent(
            "c:SPM_ListMembersCmp",
            {
                "title": " ORGANISATIONS UNIT",
                "userId": userId,
                'memberSelected' : memberSelected,
            },
            function (newCmp) {
                if (component.isValid()) {
                    component.set("v.body", newCmp);
                }
            }
        );
    },
    reInit : function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
    },
    refreshComponent: function(component, event, helper){
        console.log('refresh')       
    }
})