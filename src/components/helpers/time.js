let time = {};

time.formatMonth = (num, isFull) => {

    let result;

    switch(num + 1) {

        case 1: 
        result = isFull ? 'January' : 'Jan'
        break;

        case 2: 
        result = isFull ? 'February' : 'Feb'
        break;

        case 3: 
        result = isFull ? 'March' : 'Mar'
        break;

        case 4: 
        result = isFull ? 'April' : 'Apr'
        break;

        case 5: 
        result = isFull ? 'May' : 'May'
        break;

        case 6: 
        result = isFull ? 'June' : 'Jun'
        break;

        case 7: 
        result = isFull ? 'July' : 'Jul'
        break;

        case 8: 
        result = isFull ? 'August' : 'Aug'
        break;

        case 9: 
        result = isFull ? 'September' : 'Sept'
        break;

        case 10: 
        result = isFull ? 'October' : 'Oct'
        break;

        case 11: 
        result = isFull ? 'November' : 'Nov'
        break;

        case 12: 
        result = isFull ? 'December' : 'Dec'
        break;

        default: 
        result = isFull ? 'January' : 'Jan'
        break;
    }

    return result;

}

time.formatHour = (num) => {

    let result;

    switch(num - 12) {

        case 0: 
        result =  '12';
        break;

        case 1: 
        result =  '01';
        break;

        case 2: 
        result =  '02';
        break;

        case 3: 
        result =  '03';
        break;

        case 4: 
        result =  '04';
        break;

        case 5: 
        result =  '05';
        break;

        case 6: 
        result =  '06';
        break;

        case 7: 
        result =  '07';
        break;

        case 8: 
        result =  '08';
        break;

        case 9: 
        result =  '09';
        break;

        case 10: 
        result =  '10';
        break;

        case 11: 
        result =  '11';
        break;

        default: 
        result =  '12';
        break;
    }

    return result;

}

export default time;