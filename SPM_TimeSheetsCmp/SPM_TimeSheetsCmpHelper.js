({
    doInit: function (component) {
        this.getTimeSheets(component, true, false);
    },
    getTimeSheets : function(component, initialization, refresh){
        var action = component.get('c.getActualUserTimeSheets');
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var value = response.getReturnValue();
                component.set('v.timeSheets', value);
                if(initialization){
                    this.setDefaultValues(component);
                }
                if(refresh){
                    this.datasFilter(component);
                }
            }
        });
        $A.enqueueAction(action);
    },
    setDefaultValues : function(component){
        var hourses = Array();
        for(var i=8; i<=20; i++){
            hourses.push(
                i>9?i+':00':'0'+i+':00'
            );
        }
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        var years = Array();
        for(var i=1999; i<=y; i++){
            years.push(i);
        }
        component.set('v.currentYear', new Date().getFullYear());
        component.set('v.years',years);
        component.set('v.firstDay',firstDay);
        component.set('v.lastDay',lastDay);
        component.set('v.hourses',hourses);
        this.todayWeek(component, date);
    },
    todayWeek : function(component, date){
        this.setDatesAttributes(component);
        var daysDate = component.get('v.daysDate');
        var selectedWeek = 0;
        for(var i=0; i<daysDate.length; i++){
            if(daysDate[i].includes(date.getDate())){
                selectedWeek = i;
            }
        }
        component.set('v.selectedWeek',selectedWeek);
        this.datasFilter(component);
        this.setDays(component);
    },
    setDatesAttributes: function (component) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var firstDay = component.get('v.firstDay');
        var lastDay = component.get('v.lastDay');
        var start = firstDay.getDay() - 1, i = 0, daysDate = Array(), currentDate = 1;
        for (var row = 0; currentDate < lastDay.getDate(); row++) {
            var dates = Array();
            if (row == 0 && start == -1) {
                for (i = 0; i < 6; i++) {
                    dates[i] = '';
                }
                dates[6] = currentDate;
                currentDate++;
            }
            else {
                if (row == 0 && start != 0) {
                    for (i = 0; i < start; i++) {
                        dates[i] = '';
                    }
                }
                else if (row != 0) {
                    start = 0;
                }
                for (i = start; i < 7 && currentDate <= lastDay.getDate(); i++) {
                    dates[i] = currentDate
                    currentDate++;
                }
            }
            daysDate[row] = dates;
        }
        component.set('v.daysDate', daysDate);
        component.set('v.currentMonth', months[firstDay.getMonth()]);
        component.set('v.currentYear', firstDay.getFullYear());
        this.setDays(component);
    },
    getDays: function () {
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    },
    prevMonth : function (component) {
        var firstDay = component.get('v.firstDay'),
            y = firstDay.getFullYear(), m = firstDay.getMonth();
        var newFirstDay = new Date(y, m - 1, 1),
            newLastDay =new Date(y, m, 0);
        component.set('v.firstDay',newFirstDay);
        component.set('v.lastDay',newLastDay);
        component.set('v.selectedWeek',0);
        this.setDatesAttributes(component);
        this.datasFilter(component);
    },
    changeWeek : function(component){
        this.setDays(component);
        this.datasFilter(component);
    },
    nextMonth : function (component) {
        var firstDay = component.get('v.firstDay'),
            y = firstDay.getFullYear(), m = firstDay.getMonth();
        var newFirstDay = new Date(y, m + 1, 1),
            newLastDay =new Date(y, m + 2, 0);
        component.set('v.firstDay',newFirstDay);
        component.set('v.lastDay',newLastDay);
        component.set('v.selectedWeek',0);
        this.setDatesAttributes(component);
        this.datasFilter(component);
    },
    setDays: function (component) {
        var selectedWeek = component.get('v.selectedWeek');
        var dates = component.get('v.daysDate')[selectedWeek];
        var days = this.getDays();
        for (var j = 0; j < dates.length; j++) {
            days[j] += ' ' + dates[j];
        }
        var currentMonth = component.get('v.currentMonth');
        var currentYear = component.get('v.currentYear');
        var week = dates[dates.lastIndexOf('')+1]+' '+currentMonth+' '+currentYear+',';
        week += dates[dates.length-1]+' '+currentMonth+' '+currentYear;
        component.set('v.days', days);
        component.set('v.week', week);
    },
    datasFilter: function (component) {
        component.set('v.loaded', false);
        var selectedWeek = component.get('v.selectedWeek');
        var timeSheets = component.get('v.timeSheets');
        timeSheets = JSON.parse(JSON.stringify(timeSheets));
        var row = component.get('v.daysDate')[selectedWeek];
        var firstDay = component.get('v.firstDay');
        var hourses = component.get('v.hourses');
        var timeSheetStartDate, startDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), Number(row[row.lastIndexOf('') + 1]));
        var calendarDatas = Array(), heureCourant, dates = Array(), hasDay;
        var includedRows = Array(), datas, dateValues, startTime = new Date(0);
        var timeSheetsToDisplay = Array();
        var i, j, k, r;
        for (i = 0; i < row.length; i++) {
            if (row[i] != '') {
                dates[i] = new Date(firstDay.getFullYear(), firstDay.getMonth(), Number(row[i]));
            }
        }
        for (i = 0; i < timeSheets.length; i++) {
            dateValues = timeSheets[i].StartDate.split('-');
            timeSheetStartDate = new Date(dateValues[0], Number(dateValues[1])-1, dateValues[2]);
            if (startDate <= timeSheetStartDate && timeSheetStartDate <= dates[dates.length-1]) {
                timeSheetsToDisplay.push(timeSheets[i]);
            }
        }
        for (i = 0; i < hourses.length; i++) {
            datas = Array();
            for (j = 0; j < 7; j++) {
                if (dates[j] != undefined) {
                    hasDay = false;
                    if (includedRows.includes(i + ',' + j)) {
                        continue;
                    }
                    for (k = 0; k < timeSheetsToDisplay.length; k++) {
                        dateValues = timeSheetsToDisplay[k].StartDate.split('-');
                        timeSheetStartDate = new Date(dateValues[0], Number(dateValues[1])-1, dateValues[2]);
                        if (timeSheetStartDate.getTime() === dates[j].getTime() ) {
                            heureCourant = Number(hourses[i].split(':')[0]);
                            startTime.setHours(heureCourant);
                            if (timeSheetsToDisplay[k].startTime__c === startTime.getTime()) {
                                datas[j] = { timeSheet: timeSheetsToDisplay[k], rowspan: 1+timeSheetsToDisplay[k].number_hourses__c , class: 'hasDay' };
                                hasDay = true;
                                for (r = i; r < i + datas[j].rowspan; r++) {
                                    includedRows.push(r + ',' + j);
                                }
                                break;
                            }
                        }
                    }
                    if (!hasDay) {
                        datas[j] = { timeSheet: { StartDate:dates[j], startTime__c: hourses[i], endTime__c: hourses[i] }, rowspan: 1, class: '' };
                    }
                }
                else{
                    datas[j] = { timeSheet: { startTime__c: hourses[i], endTime__c: hourses[i] }, rowspan: 1, class: '' };
                }
            }
            calendarDatas[i] = datas;
        }
        component.set('v.calendarDatas', calendarDatas);
        component.set('v.loaded', true);
    },
    delete : function(component, event){
        var timeSheet = event.getParam('timeSheet');
        timeSheet = JSON.parse(JSON.stringify(timeSheet));
        timeSheet = {'Id':timeSheet.Id,'Task__c':timeSheet.Task__c,'number_hourses__c':timeSheet.number_hourses__c};
        var action = component.get('c.deleteTimeSheet');
        action.setParam('timeSheets', new Array(timeSheet));
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                this.getTimeSheets(component, false, true);
                this.showToast('success','Deleted','TimeSheet deleted successfully');
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    showToast : function(type, title, message){
        var toastEvent = $A.get("e.force:showToast");
        console.log(toastEvent);
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type" : type
        });
        toastEvent.fire();
    }
})