({
    doInit : function(component, event, helper)
    {
        var pageSize = component.get("v.pageSize");
        var action = component.get("c.getAllMembers");
        action.setCallback(this, function(response)
                           {
                               var state = response.getState();
                               if (component.isValid() && state === "SUCCESS")
                               {
                                   component.set('v.MemberList', response.getReturnValue());
                                   component.set("v.totalSize", component.get("v.MemberList").length);
                                   component.set("v.start",0);
                                   component.set("v.end",pageSize-1);
                                   var paginationList = [];
                                   for(var i=0; i< pageSize; i++)
                                   {
                                       paginationList.push(response.getReturnValue()[i]);
                                   }
                                   component.set('v.paginationList', paginationList);
                               }
                           });
        $A.enqueueAction(action);
    },
    onSelectChange : function(component, event, helper) {
        var selected = component.find("records").get("v.value");
        var paginationList = [];
        var MembList = component.get("v.MemberList");
        for(var i=0; i< selected; i++)
        {
            paginationList.push(MembList[i]);
        }
        component.set('v.paginationList', paginationList);
    },
    searchKeyChange: function(component, event) {
        var searchKey =  component.find("input1").get("v.value");
        console.log(searchKey);
        var action = component.get("c.getMemberById");
        var keysize = component.get("v.totalSize");
        action.setParams({"searchKey": searchKey});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS"){
                component.set('v.MemberList', response.getReturnValue());
                component.set("v.totalSize", component.get("v.MemberList").length);
                var paginationList = [];
                for(var i=0; i< keysize; i++){
                    paginationList.push(response.getReturnValue()[i]);
                }
                component.set('v.paginationList', paginationList);
            }
        });
        $A.enqueueAction(action);
    },
    first : function(component, event, helper)
    {
        var MembList = component.get("v.ListMember");
        var pageSize = component.get("v.pageSize");
        var paginationList = [];
        for(var i=0; i< pageSize; i++)
        {
            paginationList.push(MembList[i]);
        }
        component.set('v.ListMember', paginationList);
        
    },
    
    last : function(component, event, helper)
    {
        var MembList = component.get("v.MemberList");
        var pageSize = component.get("v.pageSize");
        var totalSize = component.get("v.totalSize");
        var paginationList = [];
        for(var i=totalSize-pageSize+1; i< totalSize; i++){
            paginationList.push(MembList[i]);
        }
        component.set('v.paginationList', paginationList);
    },
    
    next : function(component, event, helper)
    {
        var MembList = component.get("v.MemberList");
        var end = component.get("v.end");
        var start = component.get("v.start");
        var pageSize = component.get("v.pageSize");
        var paginationList = [];
        var counter = 0;
        for(var i=end+1; i<end+pageSize+1; i++)
        {
            if(MembList.length > end)
            {
                paginationList.push(oppList[i]);
                counter ++ ;
            }
        }
        start = start + counter;
        end = end + counter;
        component.set("v.start",start);
        component.set("v.end",end);
        component.set('v.paginationList', paginationList);
    },
    previous : function(component, event, helper)
    {
        var MembList = component.get("v.MemberList");
        var end = component.get("v.end");
        var start = component.get("v.start");
        var pageSize = component.get("v.pageSize");
        var paginationList = [];
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++)
        {
            if(i > -1)
            {
                paginationList.push(MembList[i]);
                counter ++;
            }
            else {
                start++;}
        }
        start = start-counter;
         end = end-counter;
        component.set("v.start",start);
        component.set("v.end",end);
        component.set('v.paginationList', paginationList);
    }
})