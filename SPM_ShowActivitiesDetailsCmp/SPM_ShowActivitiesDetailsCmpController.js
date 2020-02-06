({
	myAction : function(component, event, helper) {
		
	},
     doInit : function(component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var id = myPageRef.state.c__Id;
        component.set("v.recordId", id);
        helper.showDetail(component);
     }
    
})