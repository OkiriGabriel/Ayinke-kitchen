import React, { useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom';
import FoodContext from '../../../context/food/foodContext';
import Placeholder from '../../layouts/partials/Placeholder'
import colors from '../../helpers/colors'

const Food = ({ bg, icon, index  }) => {

    

    useEffect(() => {
        
       
        
    }, [])

    const select = (e, id) => {

        if(e) e.preventDefault();

        const elem = document.getElementById(id);

        if(elem && elem.classList.contains('food-selected')){
            elem.classList.remove('food-selected')
        }else{
            elem.classList.add('food-selected')
        }
    }

    

    return (
        <>

            <div className="col-md-6">

                <div id={`food-box${index || ''}`} className="cont-bx" style={{backgroundColor: colors.accent.greenLight}}>

                    <div className="ui-text-center pdt1 pdb1">
                        <img class="img-icon mx-auto" src="../../../images/icons/food2.svg" alt="icon"/>
                    </div>

                    <div className="ui-text-center">
                        <p className="title font-metrobold fs-15 mrgb0">Fried Rice</p>
                        <div className="">
                            <span className="font-metromedium fs-14 mrgb0 pdr">&#x20A6;1,500</span>
                            <span className="font-metromedium fs-13 mrgb0" style={{color: '#8799a5'}}>/scoop</span>
                       </div>
                       <div className="">
                            <span className="font-metromedium fs-12 mrgb0 pdr success">Available</span>
                       </div>
                       <div className="item-btn pdt pdb">
                            <Link onClick={e => select(e, 'food-box')} to="" className=""><span className="fe fe-plus fs-20" style={{color: colors.primary.green}}></span></Link>
                       </div>

                    </div>

                </div>

            </div>


        </>
    )

}

export default Food