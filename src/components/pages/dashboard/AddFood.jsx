import React, {useEffect, useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import DropDown from '../../layouts/partials/DropDown'
import * as moment from 'moment';
import Axios from 'axios'
import LottiePlayer from '../../layouts/partials/LottiePlayer'


import GoBack from './GoBack'
import TopBar from './TopBar'
import OverView from './OverView'

import FoodContext from '../../../context/food/foodContext'
import FoodItemContext from '../../../context/foodItem/foodItemContext'
import UserContext from '../../../context/user/userContext'
import LocationContext from '../../../context/location/locationContext'
import AddressContext from '../../../context/address/addressContext'

import Alert from '../../layouts/partials/Alert'
import lottieError from '../../_data/check-error.json'
import lottieSuccess from '../../_data/check-green.json'
import storage from '../../helpers/storage'
import colors from '../../helpers/colors';
import body from '../../helpers/body'

import dayjs from 'dayjs'
import customParse from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParse);


const AddFood = (props) => {


    const foodContext = useContext(FoodContext);
    const foodItemContext = useContext(FoodItemContext);
    const userContext = useContext(UserContext);
    const locationContext = useContext(LocationContext);
    const addressContext = useContext(AddressContext);

    const history = useHistory()

    const now = new Date();
    const [date, setDate] = useState(now);

    const [isChecked, setIsChecked] = useState(false);
    const [step, setStep] = useState(0);
    const [showBy, setShowBy] = useState(false);
    const [loading, setLoading] = useState(false);
    const [multiple, setMulti] = useState(false)

    const [foodData, setFoodData] = useState({
        status: false,
        food: '',
        address: '',
        price: 0,
        availableBy: '',
        multiAdd: []
    });

    const[msgData, setMsgData] = useState({
        title: '',
        message: '',
        buttonText: '',
        type: 'success'
    });

    const [aData, setAData] = useState({
        type: '',
        message: '',
        show: false
    })

    useEffect(() => {

        fetchDefaults()

    }, [])

    const fetchDefaults = async () => {

        if(storage.checkToken()){
            userContext.getUser();
         }

        if(storage.checkUserID()){
            locationContext.getLocations();
            addressContext.getRestAddresses(storage.getUserID());
            foodContext.getAllFood();
            foodItemContext.getRestFoodItems(storage.getUserID());
        }

        body.changeBackground('white')

    }

    const toggleMulti = (e) => {
        if(e) e.preventDefault();
        setMulti(!multiple);
    }

    const msgAction = async (e, action) => {

        if(e) e.preventDefault()

        if(action !== 'success'){
            window.location.reload();
        }

        if(action === 'success'){
            await body.dismissBackground('white')
            history.push('/dashboard/food-items')
        }

    }

    // message component
    const Message = ({ action }) => {
        return(
            <>
                <div className="ui-text-center mrgb2 mrgt5">
                    <LottiePlayer lottieData={ msgData.type === 'success' ? lottieSuccess : lottieError } w='100px' h='100px' loop={true} />
                </div>
                <div className="mrgb2 pdl3 pdr3">
                    <h3 className="title fs-20 ui-text-center font-metrobold" style={{ color: colors.primary.green }}>{msgData.title}</h3>
                    <p className="fs-14 ui-text-center mrgb1 font-metromedium" style={{ color: colors.primary.green }}>{msgData.message}</p>
                </div>

                <div className="ui-text-center">
                    <Link onClick={(e) => msgAction(e, msgData.type)} className="btn btn-lgr onwhite fs-16 mb-3 font-metrobold" style={{ backgroundColor: colors.primary.green, width: '200px' }}>{msgData.buttonText ? msgData.buttonText : 'No Text'}</Link>
                </div>

            </>
        )
    }
    

    const getStatus = () =>{
        const c = [
            {
                value: true,
                label: 'Available',
                left: '',
                image: ''
            },
            {
                value: false,
                label: 'Not Available',
                left: '',
                image: ''
            },
            {
                value: 'time',
                label: 'Available By',
                left: '',
                image: ''
            }
        ]
        return c;
    }

    const getFood = () =>{
        const foods = foodContext.allFood.map((f) => {
            const c = {
                value: f._id,
                label: `${f.name} ${f.type ? '(' + f.type + ')' : ''}`,
                left: '',
                image: ''
            }
            return c;
        })
        return foods;
    }

    const getLoc = (id) => {
        
        const loc = locationContext.locations.find((l) => l._id === id);
        return loc;
    }

    const getLocations = () =>{
        const addresses = addressContext.restAddresses.map((a) => {
            const c = {
                value: a._id,
                label: `${getLoc(a.location).name}, ${a.address}`,
                left: '',
                image: ''
            }
            return c;
        })
        return addresses;
    }

    const selectStatus = (val) => {

        if(val.label === 'Available By'){
            setShowBy(true);
            setFoodData({...foodData, status: false});
        }else{
            setShowBy(false);
            setFoodData({...foodData, status: val.value, availableBy: ''});
        }

    }

    const selectFood = (val) => {
        setFoodData({...foodData, food: val.value});
    }

    const selectLocation = (val) => {
        setFoodData({...foodData, address: val.value});
    }

    const handleTime = (e) => {
        const t = dayjs(e.target.value).toDate();
        setFoodData({...foodData, availableBy: t});
    }

    const submit = async (e) => {

        let url = '/food-items/restaurant', data;

        if(!foodData.food && !foodData.address && !foodData.price){
            setAData({...aData, show: true, type: 'danger', message: `All fields are required.`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(!foodData.food){
            setAData({...aData, show: true, type: 'danger', message: `Choose a food item`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(!multiple && !foodData.address){
            setAData({...aData, show: true, type: 'danger', message: `Choose a location`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(multiple && foodData.multiAdd.length <= 0){
            setAData({...aData, show: true, type: 'danger', message: `Choose at least one location`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(!foodData.price){
            setAData({...aData, show: true, type: 'danger', message: `Enter price`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else if(showBy && foodData.availableBy === ''){
            setAData({...aData, show: true, type: 'danger', message: `Set avaialble status`});
            setTimeout(() => {
                setAData({...aData, show: false});
            }, 2000);
            setLoading(false);
        }else {
            
            setLoading(true);

            try {

                if(multiple){

                    url = 'food-items/restaurant/multiple';
                    data = {
                        status: foodData.status,
                        food: foodData.food,
                        address: foodData.multiAdd,
                        price: foodData.price,
                        availableBy: foodData.availableBy
                    }

                }else{

                    url = 'food-items/restaurant';
                    data = {
                        status: foodData.status,
                        food: foodData.food,
                        address: foodData.address,
                        price: foodData.price,
                        availableBy: foodData.availableBy
                    }
                }

                await Axios.post(`${process.env.REACT_APP_API_URL}/${url}/${storage.getUserID()}`, { ...data }, storage.getConfigWithBearer())
                .then((resp) => {

                    if(resp.data.status === 206 && resp.data.error === true && resp.data.message === 'Food item exists'){

                        setMsgData({...msgData, type: 'error', title: 'Opps!', message: 'You cannot add a food item to the same location twice', buttonText: 'Try again'})
                        setStep(1);
                        foodItemContext.getRestFoodItems(storage.getUserID());
                    }

                    if(resp.data.error === false){
                        
                        setMsgData({...msgData, type: 'success', title: 'Successful!', message: 'You have successfully added another food item', buttonText: 'Close'})
                        setStep(1);
                        console.log(msgData.type);
                        foodItemContext.getRestFoodItems(storage.getUserID());
                    }

                }).catch((err) => {
                    setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
                    setTimeout(() => {
                        setAData({...aData, show: false});
                    }, 2000);
                    setLoading(false);
                })
                
            } catch (err) {
                setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
                setLoading(false);
            }
        }
        
    }

    const handleCheck = async (id, e) => {

        // add if it is checked
        if(e && e.target.checked){
            const qa = [`${id}`]
            setFoodData({ ...foodData, multiAdd: foodData.multiAdd.concat(qa) });
        }
        // remove if it is unchecked
        if(e && !e.target.checked){
            const index = foodData.multiAdd.findIndex((itm) => itm.toString() === id.toString());
            foodData.multiAdd.splice(index, 1);
        }
    }



    return (

        <>
{/* 
            <TopBar background={'light'}  /> */}

            <section className="mrgb6">
                <div className="container">
                            <div className="row">
                                <div className="col-lg-7 mx-auto">
                                    
                                        <div className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light mrgt5" style={{backgroundImage: 'url("../../../images/assets/fooditem.png")'}}>
                                            <h1 className="fs-30 brand-green font-metrobold mrgb0">{ foodItemContext.total }</h1>
                                            <p className="mrgb0 brand-green fs-13 font-metromedium">{ !foodItemContext.loading ? foodItemContext.total : 0 } food items in { !addressContext.loading ? addressContext.restAddresses.length : 0 } locations </p>
                                        </div>

                                        <div className="d-flex align-items-center mrgt1 ui-text-center">
                                            <h3 className="title fs-16 font-metrobold mrgb0 text-center mrgt1" style={{color: colors.primary.green}}>Add new food item</h3>
                                        </div>

                                </div>
                            </div>
                </div>
                    <div className="row">
                        <div className="col-lg-5 mx-auto">
                                <div className="mrgt2 bg-white">

                                    {
                                        step === 0 &&
                                        <form className="gnr-form" onSubmit={(e) => e.preventDefault()}>

                                        <Alert show={aData.show} type={aData.type} message={aData.message} />

                                        <div className="form-group mb-3">
                                            <label className="font-metromedium fs-13 mb-2" style={{color: colors.primary.green}}>Choose food item</label>
                                            <DropDown search={true} options={getFood} className="fd-drop food food-add" selected={selectFood} placeholder={`Select`}  />
                                        </div>

                                        <div className="form-group mb-3">

                                            <div className="d-flex align-items-center">
                                                <div className="ff-ctl">
                                                    <label className="font-metromedium mb-2" style={{color: colors.primary.green}}>Price</label>
                                                    <input 
                                                    defaultValue={ (e) => {setFoodData({...foodData, price: e.target.value})} } 
                                                    onChange={ (e) => {setFoodData({...foodData, price: e.target.value})} }
                                                    type="number" placeholder="0.00" className="form-control" />
                                                </div>
                                                <div className="ff-ctl ml-auto">
                                                    <div className="d-flex align-items-center mb-2">
                                                        <label className="font-metromedium fs-13 mrgb0" style={{color: colors.primary.green}}>Pick location</label>
                                                        <Link onClick={(e) => toggleMulti(e)} className="font-metromedium fs-13 ml-auto" style={{color: colors.primary.orange}}> { multiple ? 'single' : 'multiple'} </Link>
                                                    </div>
                                                    <DropDown disabled={ multiple ? true: false } options={getLocations} className="fd-drop address add-d" selected={selectLocation} placeholder={`Select`} search={true}  />
                                                </div>
                                            </div>

                                        </div>

                                        {
                                            multiple && !addressContext.loading &&
                                            <div className="form-group mb-3 multi-add">

                                                <><p className="font-metromedium fs-13 mrgb1" style={{color: colors.primary.green}}>Select multpile addresses below</p></>

                                                {
                                                    addressContext.restAddresses.map((ad, i) => 
                                                        <>
                                                            <div class="custom-control custom-checkbox">
                                                                <input onChange={(e) => handleCheck(ad._id, e)} type="checkbox" class="custom-control-input" id={`chk-fd${i}`} />
                                                                <label class="custom-control-label mrgb0 font-metrolight" for={`chk-fd${i}`}>{ ad.address }</label>
                                                            </div>   
                                                        </>
                                                    )
                                                }

                                            </div>
                                        }

                                        <div className="form-group mb-3">
                                            <label className="font-metromedium fs-13 mb-2" style={{color: colors.primary.green}}>Food status</label>
                                            <DropDown options={getStatus} className="fd-drop" selected={selectStatus} placeholder={`Select`} search={false}  />
                                        </div>

                                        {
                                            showBy &&
                                            <div className="mb-3">
                                                <label className="font-metromedium fs-13 mb-2" style={{color: colors.primary.green}}>What time is food available?</label>
                                                <input 
                                                defaultValue={ date } 
                                                onChange={ (e) => handleTime(e) }
                                                className="meeting form-control" 
                                                type="datetime-local"
                                                />
                                            </div>
                                            
                                        }

                                        <div className="mrgb1 ui-text-center mrgt3">
                                            {
                                                loading ? (
                                                    <Link onClick={(e) => submit(e)} className="btn btn-lgr btn-block onwhite fs-16 mb-3 disabled-show" style={{backgroundColor: colors.primary.green}}><img src="../../../images/assets/spinner-white.svg" alt="spinner" width="30px" /></Link>
                                                ): (
                                                    <Link onClick={(e) => submit(e)} className="btn btn-lgr btn-block onwhite fs-16 mb-3" style={{backgroundColor: colors.primary.green}}>Submit</Link>
                                                )
                                            }
                                        </div>

                                    </form>
                                    }

                                    {
                                        step === 1 &&
                                        <Message />
                                    }

                                    </div>
                        </div>
                    </div>

            </section>

            <GoBack />

        </>

    )

}

export default AddFood;