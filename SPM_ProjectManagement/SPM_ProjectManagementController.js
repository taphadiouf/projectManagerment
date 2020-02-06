({
    doInit: function (cmp, evt, helper) {
        $A.createComponent(
            "c:SPM_SidebarCmp",
            {

            },
            function (newCmp) {
                if (cmp.isValid()) {
                    cmp.set("v.body", newCmp);
                }
            }
        );
    },

    SPM_ExpenseSidebarCmp: function(cmp,evt,help){
        $A.createComponent(
            "c:sidebarExpense",
            {

            },
            function (newCmp) {
                if (cmp.isValid()) {
                    cmp.set("v.body", newCmp);
                }
            }
        );
    },

    sidebarRisk: function(cmp,evt,help){
        $A.createComponent(
            "c:SidebarA",
            {

            },
            (newCmp) => {
                if (cmp.isValid()) {
                    cmp.set("v.body", newCmp);
                }
            }
        );
    },

    sidebarResource: function(cmp,evt,help){
        $A.createComponent(
            "c:sidebarResource",
            {

            },
            (newCmp) => {
                if (cmp.isValid()) {
                    cmp.set("v.body", newCmp);
                }
            }
        );
    },
    sidebarAbsence: function(cmp,evt,help){
        $A.createComponent(
            "c:sidebarAbsence",
            {

            },
            (newCmp) => {
                if (cmp.isValid()) {
                    cmp.set("v.body", newCmp);
                }
            }
        );
    },

    sidebarFinance: function(cmp,evt,help){
        $A.createComponent(
            "c:sidebar1",
            {

            },
            (newCmp) => {
                if (cmp.isValid()) {
                    cmp.set("v.body", newCmp);
                }
            }
        );
    },

    sidebar: function(cmp,evt,help){
        $A.createComponent(
            "c:sidebar",
            {},
            (newCmp) => {
                if(cmp.isValid())
                    cmp.set("v.body",newCmp);
            }
        );
    }
})