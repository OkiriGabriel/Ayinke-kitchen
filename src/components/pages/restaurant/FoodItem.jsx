import React, { useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom';
import FoodContext from '../../../context/food/foodContext';
import LocationContext from '../../../context/location/locationContext'
import Placeholder from '../../layouts/partials/Placeholder'
import colors from '../../helpers/colors'


const FoodItem = ({ foodItem, locations, loading, bg, index, selectFood, food }) => {



    const [closeIcon, setClose] = useState('plus')
    const [locFoods, setLocFood] = useState([]);
    let qfd = [];

    useEffect(() => {
        
    
        
    }, [])

    
    const select = (e, id) => {

        if(e) e.preventDefault();

        const elem = document.getElementById(id);

        if(elem && elem.classList.contains('food-selected') && closeIcon === 'x'){

            elem.classList.remove('food-selected')
            setClose('plus')

         
            selectFood(e)

        }else{

            elem.classList.add('food-selected')
            setClose('x');
            


            selectFood(e,)
        }
    }


    const formatType = (n, t) => {

        let cmb = t + ' ' + n;
        return cmb;

    }

    const getLoc = (id) => {
        
        const loc = locations.find((l) => l._id === id);
        return loc ? loc.name : '';
    }




    return (
        <>  

            <div className="col-md-3 col-6 mrgt2">

                <div id={`food-box${index}`} className="cont-bx" style={{backgroundColor: "rgb(248 248 248)"}}>

                    <div className="ui-text-center pdt pdb1">
                        <img class="img-icon mx-auto" src={`../../images/assets/dish.png`} alt="icon"/>
                    </div>

                    <div className="ui-text-center">
                        <p className="title font-metrobold fs-15 mrgb0">Rice and Chicken</p>
                        <div className="">
                            <span className="font-metromedium fs-14 mrgb0 pdr">&#x20A6;2500</span>
                            <span className="font-metromedium fs-13 mrgb0" style={{color: '#8799a5'}}>/plate</span>
                       </div>
                
                           {/* <div className="ui-text-center pdb">
                                <span className={`fs-12 mrgb0 pdr ${foodItem.status ? 'success' : 'onaliz'}`}>{foodItem.status ? 'Available' : 'Unavailable'}</span>
                           </div> */}
                    
                           <div className="d-flex align-items-center pdt pdb">
                                {/* <span className={`fs-12 mrgb0 pdr ${foodItem.status ? 'success' : 'onaliz'}`}>{foodItem.status ? 'Available' : 'Unavailable'}</span> */}

                                <div className="item-btn ml-auto">
                                    <Link onClick={e => select(e, `food-box${index}`)} className=""><span className={`fe fe-${closeIcon} fs-20`} style={{color: colors.primary.green}}></span></Link>
                                </div>
                            </div>
                    

                    </div>

                </div>

            </div>

            <div className="col-md-3 col-6 mrgt2">

                <div id={`food-box${index}`} className="cont-bx" style={{backgroundColor: "rgb(248 248 248)"}}>

                    <div className="ui-text-center pdt pdb1">
                        <img class="img-icon mx-auto" src={`../../../images/assets/hot.png`} alt="icon"/>
                    </div>

                    <div className="ui-text-center">
                        <p className="title font-metrobold fs-15 mrgb0">Beans and Rice</p>
                        <div className="">
                            <span className="font-metromedium fs-14 mrgb0 pdr">&#x20A6;1200</span>
                            <span className="font-metromedium fs-13 mrgb0" style={{color: '#8799a5'}}>/plate</span>
                       </div>
                
                           {/* <div className="ui-text-center pdb">
                                <span className={`fs-12 mrgb0 pdr ${foodItem.status ? 'success' : 'onaliz'}`}>{foodItem.status ? 'Available' : 'Unavailable'}</span>
                           </div> */}
                    
                           <div className="d-flex align-items-center pdt pdb">
                                {/* <span className={`fs-12 mrgb0 pdr ${foodItem.status ? 'success' : 'onaliz'}`}>{foodItem.status ? 'Available' : 'Unavailable'}</span> */}

                                <div className="item-btn ml-auto">
                                    <Link  onClick={e => select(e, `food-box${index}`)} to="" className=""><span className={`fe fe-${closeIcon} fs-20`} style={{color: colors.primary.green}}></span></Link>
                                </div>
                            </div>
                    

                    </div>

                </div>

            </div>


            <div className="col-md-3 col-6 mrgt2">

                <div id={`food-box${index}`} className="cont-bx" style={{backgroundColor: "rgb(248 248 248)"}}>

                    <div className="ui-text-center pdt pdb1">
                        <img class="img-icon mx-auto" src={`../../../images/assets/breakfast.png`} alt="icon"/>
                    </div>

                    <div className="ui-text-center">
                        <p className="title font-metrobold fs-15 mrgb0">Rice, Chicken, Platain and Beef</p>
                        <div className="">
                            <span className="font-metromedium fs-14 mrgb0 pdr">&#x20A6;2000</span>
                            <span className="font-metromedium fs-13 mrgb0" style={{color: '#8799a5'}}>/plate</span>
                       </div>
                
                           {/* <div className="ui-text-center pdb">
                                <span className={`fs-12 mrgb0 pdr ${foodItem.status ? 'success' : 'onaliz'}`}>{foodItem.status ? 'Available' : 'Unavailable'}</span>
                           </div> */}
                    
                           <div className="d-flex align-items-center pdt pdb">
                                {/* <span className={`fs-12 mrgb0 pdr ${foodItem.status ? 'success' : 'onaliz'}`}>{foodItem.status ? 'Available' : 'Unavailable'}</span> */}

                                <div className="item-btn ml-auto">
                                    <Link onClick={e => select(e, `food-box${index}`)} to="" className=""><span className={`fe fe-${closeIcon} fs-20`} style={{color: colors.primary.green}}></span></Link>
                                </div>
                            </div>
                    

                    </div>

                </div>

            </div>



            <div className="col-md-3 col-6 mrgt2">

                <div id={`food-box${index}`} className="cont-bx" style={{backgroundColor: "rgb(248 248 248)"}}>

                    <div className="ui-text-center pdt pdb1">
                        <img class="img-icon mx-auto" src={`../../../images/assets/roasted-chicken.png`} alt="icon"/>
                    </div>

                    <div className="ui-text-center">
                        <p className="title font-metrobold fs-15 mrgb0">Roasted Chicken</p>
                        <div className="">
                            <span className="font-metromedium fs-14 mrgb0 pdr">&#x20A6;2500</span>
                            <span className="font-metromedium fs-13 mrgb0" style={{color: '#8799a5'}}>/plate</span>
                       </div>
                
                           {/* <div className="ui-text-center pdb">
                                <span className={`fs-12 mrgb0 pdr ${foodItem.status ? 'success' : 'onaliz'}`}>{foodItem.status ? 'Available' : 'Unavailable'}</span>
                           </div> */}
                    
                           <div className="d-flex align-items-center pdt pdb">
                                {/* <span className={`fs-12 mrgb0 pdr ${foodItem.status ? 'success' : 'onaliz'}`}>{foodItem.status ? 'Available' : 'Unavailable'}</span> */}

                                <div className="item-btn ml-auto">
                                    <Link onClick={e => select(e, `food-box${index}`)} to="" className=""><span className={`fe fe-${closeIcon} fs-20`} style={{color: colors.primary.green}}></span></Link>
                                </div>
                            </div>
                    

                    </div>

                </div>

            </div>

        </>
    )

}

export default FoodItem