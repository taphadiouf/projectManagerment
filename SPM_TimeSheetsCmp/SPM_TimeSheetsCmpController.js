({
    doInit : function(component, event, helper){
        helper.doInit(component);
    },
    newEvent : function(component, event, helper) {
        component.set('v.createNewEvent', true);
    },
    refresh : function(component, event, helper) {
        helper.datasFilter(component);
    },
    today : function(component, event, helper) {
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var newFirstDay = new Date(y, m, 1);
        var newLastDay = new Date(y, m + 1, 0);
        component.set('v.firstDay',newFirstDay);
        component.set('v.lastDay',newLastDay);
        helper.todayWeek(component, date);
    },
    nextWeek : function(component, event, helper) {
        var selectedWeek = component.get('v.selectedWeek'),
            daysDate = component.get('v.daysDate');
        if(selectedWeek === daysDate.length-1){
            helper.nextMonth(component);
        }
        else{
            component.set('v.selectedWeek', selectedWeek+1);
            helper.changeWeek(component);
        }
    },
    prevWeek : function(component, event, helper) {
        var selectedWeek = component.get('v.selectedWeek'),
            daysDate = component.get('v.daysDate');
        if(selectedWeek === 0){
            helper.prevMonth(component);
        }
        else{
            component.set('v.selectedWeek', selectedWeek-1);
            helper.changeWeek(component);
        }
    },
    prevMonth : function(component, event, helper) {
        helper.prevMonth(component);
    },
    nextMonth : function(component, event, helper) {
        helper.nextMonth(component);
    },
    yearHandler : function(component, event, helper) {
        component.set('v.selectedWeek', 0);
        var year = component.get('v.currentYear');
        var newFirstDay = new Date(year, 0, 1),
            newLastDay =new Date(year, 1, 0);
        component.set('v.firstDay',newFirstDay);
        component.set('v.lastDay',newLastDay);
        helper.setDatesAttributes(component);
        helper.datasFilter(component);
    },
    selectedWeek : function(component, event, helper) {
        var selectedWeek = Number(event.srcElement.name);
        component.set('v.selectedWeek',selectedWeek);
        helper.changeWeek(component);
    },
    timeSheetAdded : function(component, event, helper) {
        helper.getTimeSheets(component, false, true);
        component.set('v.createNewEvent', false);
        component.set('v.showDetails', false);
        helper.showToast('success','Saved','TimeSheet saved successfully');
        //helper.datasFilter(component);
    },
    delete : function(component, event, helper){
        helper.delete(component, event);
    }
})