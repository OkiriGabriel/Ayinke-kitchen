let body = {};

body.changeBackground = (cn) => {

    const elem = document.querySelector('.body');

    if(elem){
        elem.classList.add(cn);
    }

}

body.dismissBackground = (cn) => {

    const elem = document.querySelector('.body');

    if(elem){
        elem.classList.remove(cn)
    }

}

body.splitQueries = (q, key) => {

    let value;

    for(let i = 0; i < q.length; i++){

        let pair = q[i].split('=');
        if(pair[0] === key){
            value = pair[1];
        }

    }

    return value;

}

export default body;