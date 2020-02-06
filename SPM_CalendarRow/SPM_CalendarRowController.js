({
    doInit : function(component, event, helper) {
        var i = component.get('v.row');
        var j = component.get('v.col');
        var list = component.get('v.datas');
        if(list[i][j] != undefined){
            var data = list[i][j];
            if(data.timeSheet.Id != undefined){
                if(!(''+data.timeSheet.startTime__c).includes(':')){
                    var time = new Date(data.timeSheet.startTime__c);
                    data.timeSheet.startTime__c = time.getHours()>9?time.getHours()+':00':'0'+time.getHours()+':00';
                    time = new Date(data.timeSheet.endTime__c);
                    data.timeSheet.endTime__c = time.getHours()>9?time.getHours()+':00':'0'+time.getHours()+':00';
                }
                if(data.timeSheet.activities__c != undefined){
                    var values = (''+data.timeSheet.activities__c).split(';');
                    component.set('v.activities', values);
                }
            }
            component.set('v.data',data);
            component.set('v.hasData',true);
        }
    },
    timeSheetClick : function(component, event, helper) {
        var timeSheet = component.get('v.data.timeSheet');
        if(timeSheet.Id != undefined){
            component.set('v.showDetails', true);
            component.set('v.timeSheet', timeSheet);
            component.set('v.left', event.x);
            component.set('v.top', event.y-250);
        }
        else{
            if(timeSheet.StartDate != undefined && timeSheet.StartDate.getTime() <= new Date().getTime()){
                component.set('v.editEvent', true);
            }
        }
    }
})