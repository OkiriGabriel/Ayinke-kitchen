import React, { useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom';
import FoodContext from '../../../context/food/foodContext';
import LocationContext from '../../../context/location/locationContext'
import Placeholder from '../../layouts/partials/Placeholder'
import colors from '../../helpers/colors'


const FoodItem = ({ foodItem, locations, loading, bg, index, selectFood, food }) => {

    const foodContext = useContext(FoodContext);
    const locationContext = useContext(LocationContext);

    const [closeIcon, setClose] = useState('plus')
    const [locFoods, setLocFood] = useState([]);
    let qfd = [];

    useEffect(() => {
        
        foodContext.getAllFood(9999);
        
    }, [])

    const formatType = (n, t) => {

        let cmb = t + ' ' + n;
        return cmb;

    }

    const getLoc = (id) => {
        
        const loc = locations.find((l) => l._id === id);
        return loc ? loc.name : '';
    }

    const getFood = (id) => {

        const data = {
            name: 'food',
            type: 'type'
        }
        
        if(!foodContext.loading){
            const food = foodContext.allFood.find(f => f._id === id);
            
            if(!food){
                console.log('Food not found')
            }else{
                data.name = food.name;
                data.type = food.type;
                data.id = food._id;
            }
        }

        return data;
        
    }

    const select = (e, id) => {

        if(e) e.preventDefault();

        const elem = document.getElementById(id);

        if(elem && elem.classList.contains('food-selected') && closeIcon === 'x'){

            elem.classList.remove('food-selected')
            setClose('plus')

            const data = {
                action: 'remove',
                item: [
                    {
                        food: {
                            _id: getFood(food.food).id,
                            name: getFood(food.food).name,
                            type: getFood(food.food).type
                        },
                        price: food.price,
                        status: food.status,
                        qty: 1,
                        foodId: food._id,
                        location: food.location._id
                    }
                ],
                price: food.price
            }
        
            selectFood(e, data)

        }else{

            elem.classList.add('food-selected')
            setClose('x');
            

            const data ={
                action: 'add',
                item: [
                    {
                        food: {
                            _id: getFood(food.food).id,
                            name: getFood(food.food).name,
                            type: getFood(food.food).type
                        },
                        price: food.price,
                        status: food.status,
                        qty: 1,
                        foodId: food._id,
                        location: food.location._id
                    }
                ],
                price: food.price,
                
            }

            selectFood(e, data)
        }
    }

    return (
        <>  

            <div className="col-md-3 col-6 mrgt2">

                <div id={`food-box${index}`} className="cont-bx" style={{backgroundColor: "rgb(248 248 248)"}}>

                    <div className="ui-text-center pdt pdb1">
                        <img class="img-icon mx-auto" src={`../../../images/icons/food2.svg`} alt="icon"/>
                    </div>

                    <div className="ui-text-center">
                        <p className="title font-metrobold fs-15 mrgb0">food</p>
                        <div className="">
                            <span className="font-metromedium fs-14 mrgb0 pdr">&#x20A6;500</span>
                            <span className="font-metromedium fs-13 mrgb0" style={{color: '#8799a5'}}>/plate</span>
                       </div>
                   
                    
                           <div className="d-flex align-items-center pdt pdb">

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