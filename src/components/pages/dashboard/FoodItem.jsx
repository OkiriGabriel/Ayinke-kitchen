import React, { useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom';
import Placeholder from '../../layouts/partials/Placeholder'
import Axios from 'axios'

import AlertModal from '../../layouts/partials/AlertModal'
import FoodModal from './FoodModal'
import FoodDetails from './FoodDetails'

import colors from '../../helpers/colors'
import time from '../../helpers/time'

import dayjs from 'dayjs'
import customParse from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParse);

const FoodItem = ({ foodItem, allFood, locations, addresses, updateStatus }) => {

    const [show, setShow] = useState(false);

    const [openPop, steOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [itemData, setItem] = useState(null);

    useEffect(() => {
        
    }, [])

    const toggleAlert = (e) =>{
        if(e){
            e.preventDefault();
        }
        setShowAlert(!showAlert)
    }

        const [msgModal, setMessage] = useState({
        title: '',
        message: '',
        buttonText: '',
        type: ''
    });




    const formatType = (n, t) => {

        let cmb;
        if(n === 'Amala'){
            cmb = n + ' ' + t;
        }else{
            cmb = t + ' ' + n;
        }

        return cmb;

    }

    const getLoc =  (id) => {

        const loc = locations.find((l) => l._id === id);
        return loc ? loc.name : '';
    }

    const getFood = (id) => {

        const data = {
            name: 'food',
            type: 'type'
        }
        let i = 0;
        if(allFood.length > 0){
            const food = allFood.find(f => f._id === id);
            
            if(!food) {
                console.log('food not found', i);
            }else{
                data.name = food.name;
                data.type = food.type;
            }
        }

        return data;
        
    }

    const handleCheck = async (id, e) => {
        updateStatus(id, e.target.checked);
    }

    const toggleOpen = (e, data) =>{
        if(e){
            e.preventDefault();
        }
        if(data){
            setItem(data);
        }
        steOpen(!openPop)
    }

    const formatDate = (data) => {
        const td = dayjs(data);
        const ret = `${time.formatMonth(td.get('month')) } ${td.get('date')},   ${time.formatHour(td.get('hour'))}:${td.get('minutes')} ${td.get('hour') >= 12 ? 'PM' : 'AM'}`;
        return ret;
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            
            <div className="food d">

<div onClick={(e) => toggleOpen(e)} className="ui-text-center">
    <img class="img-icon mx-auto" src={`../../../images/icons/dfood2.svg`} alt="icon"/>
</div>

<div>
    <div className="d-flex align-items-center">
        <p onClick={(e) => toggleOpen(e)} className="mrgb0">
            <span style={{color: colors.primary.green}} className="title font-metromedium onminshaft">{formatType(getFood(foodItem.food).name, getFood(foodItem.food).type)}</span>
        </p>
    </div>
    <p className="mrgb0">
        <span className="text-muted fs-12 font-metromedium">
            &#x20A6;{ `${ foodItem ? foodItem.price : '0' } - `}
            {/* { ` ${ getLoc(foodItem.location._id) }` } &nbsp;  */}
        </span>
        <span className={`fs-12 font-metromedium ${foodItem.status ? 'success' : foodItem.availableBy ? 'onblue' : 'error'}`}>
            <>
                { 
                    foodItem.status ? 'Available' : 
                    foodItem.availableBy ? 'Available by: ' + formatDate(foodItem.availableBy)  : 'Unavailable'
                } 
            </>
        </span>
    </p>
</div>

<div className="ml-auto ui-text-right d-flex align-items-center">
    {
        (foodItem.availableBy === '' || foodItem.availableBy === null) &&
        <label className="switch mrgb0">
            <input onChange={(e) => handleCheck(foodItem._id, e)} type="checkbox" defaultChecked={foodItem.status}/>
            <span className="slider round"></span>
        </label>
    }
    <span className="pdl2"></span>
    <Link onClick={(e) => toggleOpen(e)} style={{ position: 'relative', top: '3px'}}>
        <span className="fe fe-chevron-right fs-24 onsilver"></span>
    </Link>
</div>

</div>

                        </div>
                    </div>
                </div>
            </section>
            <AlertModal isShow={showAlert} closeModal={toggleAlert} type={msgModal.type} data={msgModal} />

            <FoodDetails locations={locations} allFood={allFood} addresses={addresses} data={foodItem} open={openPop} close={toggleOpen} />
        </>
    )

}

export default FoodItem