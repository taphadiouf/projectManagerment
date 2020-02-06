({
	openModelMember : function(cmp,evt){
         if(evt.getParam("isModal")=="true")
        cmp.set('v.isModal',true);
    },
    closeModelOrgUnit: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModal", false);
    },
    
    submitDetailsOrgUnit: function(cmp, event, helper) {
       /* var orgUnitEvt = $A.get("e.c:SPM_OrgUnitEvt");
        orgUnitEvt.setParam('orgUnit',cmp.get('v.OrgUnit'));
        orgUnitEvt.fire();*/
        cmp.set("v.isModal", false);
        alert('bien');
    },
})