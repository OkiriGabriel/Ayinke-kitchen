import $ from 'jquery';
let scroller = {};

scroller.box = null;
scroller.bottomBox = null;

scroller.getBox = (elem) => {

    const bx = document.getElementById(elem);

    if(bx){
        scroller.box = bx;
        scroller.bottomBox = document.getElementById('bottom-bar');
    }
}

scroller.getPosition = () => {

    if(scroller.box){
    
        $(scroller.box).scroll(() => {
            
            if($(scroller.box).scrollTop() >= 96){

                $(scroller.bottomBox).removeClass('open').addClass('close');
                // console.log($(scroller.box).scrollTop());

            }else{

                $(scroller.bottomBox).removeClass('close').addClass('open');

            }

            

        })

    }

}

scroller.initScroll = async (elem) => {

    await scroller.getBox(elem);
    scroller.getPosition();

}

export default scroller;