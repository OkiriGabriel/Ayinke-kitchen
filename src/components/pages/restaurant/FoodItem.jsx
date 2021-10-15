import React, { useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom';
import FoodContext from '../../../context/food/foodContext';
import LocationContext from '../../../context/location/locationContext'
import Placeholder from '../../layouts/partials/Placeholder'
import colors from '../../helpers/colors'


const FoodItem = ({ food, price, get, imgSrc }) => {



   
    const [closeIcon, setClose] = useState('plus');
    const [sel, setSel] = useState(false)
   


    useEffect(() => {

    }, [])

    const select = (e) => {

        if(e) e.preventDefault();

        if(sel === false){
            setClose('x');
            get(e, 'add', price)
        }else{
            setClose('plus');
            get(e, 'sub', price)
        }

       setSel(!sel);


    }


    return (
        <>  
          <div className="col-md-4 col-6 mrgt2">
          <div className="ui-text-center pdt">
                        <img class="img-icon mx-auto ui-rounded-small " src={imgSrc} alt="icon"/>
                    </div>
            <div id={`food-box`} className={`food-box ${sel ? 'selected' : ''}`}>

                  
              
                    <p className="font-helveticabold food-lits fs-15 mrgb0" >{ food }</p>

                    <div className="ui-text-center food-lits">
                        <span className="font-helveticamedium fs-14 mrgb0 pdr">&#x20A6;{ price  }</span>
                        <span className="font-helveticamedium fs-13 mrgb0" style={{color: '#8799a5'}}>/plate</span>
                    </div>


                    <div className="item-btn ml-auto">
                    <Link onClick={e => select(e)} className="item-btn"><span className={`fe fe-${closeIcon} fs-14`} style={{color: colors.primary.green}}></span></Link>
                                </div>
                    

                    </div>
                
                    </div>
           



        </>
    )

}

export default FoodItem