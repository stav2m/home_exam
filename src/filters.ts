import Vue from 'vue';

function getDateData(val:string){
    let date = new Date(val);
    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString();

    return {day:day, month:month, year:year};
};

Vue.filter("dayMonthYear", function (val:string,  seperator:string = '/') { 
    const dateData = getDateData(val);
    return `${dateData.day}${seperator}${dateData.month}${seperator}${dateData.year.substr(-2)}`;
});