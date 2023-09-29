const changeDate = (inputDate) => {
    var date = inputDate.split("-");
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for(var j=0;j<months.length;j++){
        if(date[1]==months[j]){
            date[1]=months.indexOf(months[j])+1;
        }                      
    } 
    if(date[1]<10){
        date[1]='0'+date[1];
    }                        
    return date[2]+'-'+date[1]+'-'+date[0];
}

export default changeDate