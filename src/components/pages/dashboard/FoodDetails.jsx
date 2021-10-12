import React, {useEffect, useState, useContext, useRef} from 'react';
import { Link, useHistory } from 'react-router-dom'
import DropDown from '../../layouts/partials/DropDown';
import LottiePlayer from '../../layouts/partials/LottiePlayer'
import Axios from 'axios'
import * as moment from 'moment';

import storage from '../../helpers/storage'
import time from '../../helpers/time'
import colors from '../../helpers/colors'
import Alert from '../../layouts/partials/Alert'

import FoodContext from '../../../context/food/foodContext'
import FoodItemContext from '../../../context/foodItem/foodItemContext'
import UserContext from '../../../context/user/userContext'
import LocationContext from '../../../context/location/locationContext'
import AddressContext from '../../../context/address/addressContext'
import Flatpickr from "react-flatpickr";

import dayjs from 'dayjs'
import customParse from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParse);


const FoodDetails = ({ data, open, close, allFood, addresses, locations }) => {

    const priceRef = useRef(null);

    const foodContext = useContext(FoodContext);
    const foodItemContext = useContext(FoodItemContext);
    const userContext = useContext(UserContext);
    const locationContext = useContext(LocationContext);
    const addressContext = useContext(AddressContext);

    const history = useHistory();

    const [showBy, setShowBy] = useState(false);
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const[msgData, setMsgData] = useState({
        title: '',
        message: '',
        buttonText: ''
    })

    const [aData, setAData] = useState({
        type: '',
        message: '',
        show: false
    })
    const [foodData, setFoodData] = useState({
        status: false,
        location: '',
        price: 0,
        availableBy: ''
    });

    useEffect(() => {
        
        setFoodData({...foodData, location: data.location._id, price: data.price});

        if(data.availableBy){
            setShowBy(true)
        }

    }, []);

    const setFood = (id) => {
        const food = allFood.find((f) => f._id === id);
        return food;
    }

    const setAddress = (id) => {
        const address = addresses.find((a) => a.location === id);
        return address;
    }

    const formatDate = (data) => {
        const td = dayjs(data);
        const ret = `${time.formatMonth(td.get('month')) } ${td.get('date')},  ${time.formatHour(td.get('hour'))}:${td.get('minutes')} ${td.get('hour') >= 12 ? 'PM' : 'AM'}`;
        return ret;
    }

    // components

    const Details = ({ food }) => {
        return (
            <>

                <div className="d-flex align-items-center mrgb1">
                    <h3 className="title font-metrobold fs-16" style={{color: colors.primary.green }}>Food Item details</h3>
                    <div className="ml-auto">
                        <Link onClick={closePop} style={{position:'relative', top: '0px'}}><span className="fe fe-x fs-18 brand-orange"></span></Link>
                    </div>
                </div>

                <div className="mrgt2">

                    <div className="d-flex align-items-center">

                        <div className="" style={{width: '49%'}}>
                            <span className="mrgb0 font-metromedium brand-green onmineshaft fs-15">Name: </span>
                            <span className="mrgb0 font-metromedium text-muted fs-15 ml-auto">
                                {setFood(food.food) ? setFood(food.food).name : ''}
                            </span>
                        </div>

                        <div className="ui-text-right pdl1" style={{width: '59%'}}>
                            <span className="mrgb0 font-metromedium brand-green onmineshaft fs-15">Type: </span>
                            <span className="mrgb0 font-metromedium text-muted fs-15 ml-auto">
                                {setFood(food.food) ? setFood(food.food).type : ''}
                            </span>
                        </div>

                    </div>
                    <div className="ui-line bg-silverlight"></div>
                    <div className="d-flex align-items-center">

                        <div className="" style={{width: '49%'}}>
                            <span className="mrgb0 font-metromedium brand-green onmineshaft fs-15">Price: </span>
                            <span className="mrgb0 font-metromedium text-muted fs-15 ml-auto">&#x20A6; {food.price}</span>
                        </div>

                        <div className="ui-text-right pdl1" style={{width: '59%'}}>
                            <span className="mrgb0 font-metromedium brand-green onmineshaft fs-15">Location: </span>
                            <span className="mrgb0 font-metromedium text-muted fs-15 ml-auto">{food.location.name}</span>
                        </div>

                    </div>
                    <div className="ui-line bg-silverlight"></div>

                    <div className="d-flex align-items-center">
                        <p className="mrgb0 font-metromedium brand-green onmineshaft fs-15">Address</p>
                        <p className="mrgb0 font-metromedium text-muted fs-15 ml-auto">
                            {setAddress(food.location._id) ? setAddress(food.location._id).address : ''}
                        </p>
                    </div>

                    <div className="ui-line bg-silverlight"></div>

                    <div className="d-flex align-items-center">
                        <p className="mrgb0 font-metromedium brand-green onmineshaft fs-15">Status</p>
                        <div className="d-flex align-items-center mrgb0 font-metromedium fs-15 ml-auto">
                            <p className={`mrgb0 ${food.status ? 'success' : food.availableBy ? 'onmineshaft' : 'error'} fs-13`} style={{position: 'relative', top: '0px'}}>{food.status ? 'Available' : food.availableBy ? 'Available by: '+ formatDate(food.availableBy) : 'Unavailable'}</p>
                        </div>
                    </div>

                    <div className="d-flex align-items-center mrgt3">

                        <div className="" style={{width: '49%'}}>
                            <Link onClick={(e) => submit(e, 'delete')} className="btn font-metromedium btn-lgr btn-block onmineshaft bg-silverlight fs-16 mb-3">Delete</Link>
                        </div>

                        <div className="ui-text-right pdl1" style={{width: '59%'}}>
                            <Link onClick={(e) => submit(e, 'edit')} className="btn btn-lgr font-metromedium btn-block onwhite bg-brand-green fs-16 mb-3">Edit</Link>
                        </div>

                    </div>

                </div>
            
            </>
        )
    }

    const DeleteFood = () => {
        return (
            <>

                

                <div className="d-flex align-items-center mrgb1">
                    {/* <h3 className="title font-weight-bold fs-17">Delete Food Item</h3> */}
                    <div className="ml-auto">
                        <Link onClick={closePop} style={{position:'relative', top: '0px'}}><span className="fe fe-x fs-18 brand-orange"></span></Link>
                    </div>
                </div>

                <div className="mrgt2">

                    <Alert show={aData.show} type={aData.type} message={aData.message} />

                    <form onSubmit={(e) => e.preventDefault()}>

                            <div className="d-flex align-items-center flex-column justify-content-center">

                                <div className="mrgt2 mrgb2 pdl2 pdr2 ui-text-center">

                                    <h3 className="title font-metrobold mrgb1 fs-19">Are you sure you want to delete this food item? </h3>
                                    <span className="mrgb0 font-metrolight text-muted fs-15">Food item will not be available for search anymore.</span>

                                </div>

                            </div>

                            <div className="d-flex align-items-center mrgt1">

                                <div className="" style={{width: '49%'}}>
                                    <Link onClick={(e) => submit(e, 'details')} className={`btn btn-lgr btn-block onmineshaft bg-silverlight fs-16 mb-3 ${loading ? 'disabled' : ''}`}>Cancel</Link>
                                </div>

                                <div className="ui-text-right pdl1" style={{width: '59%'}}>
                                    {
                                        loading ? (
                                            <Link className="btn btn-lgr spin btn-block onwhite bg-brand-green fs-16 mb-3">
                                                <img width="35px" src="../../../images/assets/spinner-white.svg" alt="spinner" />
                                            </Link>
                                        ): (
                                            <Link onClick={(e) => submit(e, '')} className="btn btn-lgr btn-block onwhite bg-brand-green fs-16 mb-3">Delete</Link>
                                        )
                                    }
                                </div>

                            </div>


                    </form>


                   
                    
                </div>
            
            </>
        )
    }

    const Message = () => {
        return(
            <>
                <div className="ui-text-center mrgb2 mrgt2">
                    <LottiePlayer w='100px' h='100px' loop={true} />
                </div>
                <div className="mrgb2 pdl3 pdr3">
                    <h3 className="title fs-20 ui-text-center">{msgData.title}</h3>
                    <p className="onmineshaft fs-14 ui-text-center mrgb1">{msgData.message}</p>
                </div>

                <div className="ui-text-center">
                    <Link onClick={(e) => submit(e)} className="btn btn-lgr onwhite bg-brand-orange fs-16 mb-3">{msgData.buttonText ? msgData.buttonText : 'No Text'}</Link>
                </div>

            </>
        )
    }

    // functions

    const closePop = () => {
        setLoading(false);
        setStep(0);
        close();
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
                label: 'Unvailable',
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

    const setStatus = () => {
        
        let st = {
            value: data.status ? true : data.availableBy ? 'time' : false,
            label: `${data.status ? 'Available' : data.availableBy ? 'Available By' : 'Unavailable'}`,
            left: '',
            image: ''
        }

        return st;
    }

    const getLoc = (id) => {
        
        const loc = locations.find((l) => l._id === id);
        return loc;
    }

    const getLocations = () =>{
        const add = addresses.map((a) => {
            const c = {
                value: a.location,
                label: `${getLoc(a.location).name}, ${a.address}`,
                left: '',
                image: ''
            }
            return c;
        })
        return add;
    }

    const setLocation = () => {
        const ld = addresses.find((ad) => ad.location === data.location._id);
        let loc = {
            value: ld._id,
            label: `${getLoc(ld.location).name}, ${ld.address}`,
            left: '',
            image: ''
        }
        return loc;
    }

    const selectStatus = (val) => {

        if(val.label === 'Available By'){
            setShowBy(true);
            setFoodData({...foodData, status: true, availableBy: dayjs().toDate() });
        }

        if(val.label === 'Available' || val.label === 'Unvailable'){
            setShowBy(false);
            setFoodData({...foodData, status: val.value, availableBy: ''});
        }

    }

    const selectLocation = (val) => {
        setFoodData({...foodData, location: val.value});
    }

    const refershList = () => {
        foodItemContext.getRestFoodItems(storage.getUserID());
    }

    const handleTime = (date) => {
        const t = dayjs(date[0]).toDate();
        setFoodData({...foodData, availableBy: t});
    }

    const submit = async(e, view) => {
        if(e){
            e.preventDefault();
        }

        if(step === 0 && view === 'edit'){
            setStep(1)
        }

        if(step === 0 && view === 'delete'){
            setStep(2)
        }

        if(step === 1 && (view === '' || view === undefined)){


            if(showBy && foodData.availableBy === ''){
                setAData({...aData, show: true, type: 'danger', message: `Set avaialble status`});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
            }else{

                setLoading(true);

                await Axios.put(`${process.env.REACT_APP_API_URL}/food-items/restaurant/${data._id}`, {...foodData} , storage.getConfigWithBearer())
                .then((resp) => {

                    setMsgData({...msgData, title: 'Saved Successfully!', message: 'You have successfully updated food item.', buttonText: 'OK. Got It.'})
                    setLoading(false);
                    setStep(3);

                }).catch((err) => {
                    setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
                    setTimeout(() => {
                        setAData({...aData, show: false});
                    }, 2000);
                    setLoading(false);
                })

            }
            
           
        }

        if(step === 2 && (view === '' || view === undefined)){

            setLoading(true);
            await Axios.delete(`${process.env.REACT_APP_API_URL}/food-items/restaurant/${data._id}`, storage.getConfigWithBearer())
            .then((resp) => {

                setMsgData({...msgData, title: 'Deleted Successfully!', message: 'You have successfully deleted this food item.', buttonText: 'OK. Got It.'})
                setLoading(false);
                setStep(3);


            }).catch((err) => {
                setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
                setTimeout(() => {
                    setAData({...aData, show: false});
                }, 2000);
                setLoading(false);
            })
            
        }

        if((step === 1 || step === 2) && view === 'details'){
            setStep(0)
        }

        if(step === 3){
            closePop()
            refershList();
        }        
    }

    return (
        <>

           <div className={`pop--box ${open ? 'open' : ''}`}>

                <div className="backdrop">

                    <div className="pop-content">

                        <div className="container">

                            {
                                step === 0 &&
                                <Details food={data} />
                            }

                            {
                                step === 1 &&
                                <>
                                
                                    <div className="d-flex align-items-center mrgb1">
                                        <h3 className="title font-metrobold fs-17">Edit Food Item</h3>
                                        <div className="ml-auto">
                                            <Link onClick={closePop} style={{position:'relative', top: '0px'}}><span className="fe fe-x fs-18 brand-orange"></span></Link>
                                        </div>
                                    </div>

                                    <p className="text-muted font-metromedium fs-14">
                                        You are changing {setFood(data.food) ? `${setFood(data.food).name}(${setFood(data.food).type})` : ''} details
                                    </p>

                                    <div className="mrgt1">

                                        <Alert show={aData.show} type={aData.type} message={aData.message} />

                                        <form onSubmit={(e) => e.preventDefault()}>
    
                                                <div className="mb-3">
                                                    <label className="fs-14 font-metromedium">Location</label>
                                                    <DropDown options={getLocations} defaultValue={setLocation()} className="fd-drop foodet" selected={selectLocation} placeholder={`Select Location`} search={false}  />
                                                </div>

                                                <div className="d-flex align-items-center">
                                                    <div className="mb-3 ff-ctl">
                                                        <input 
                                                        defaultValue={data.price} 
                                                        onChange={ (e) => {setFoodData({...foodData, price: e.target.value})} }
                                                        type="number" placeholder="Price /Scoop or Wrap" className="form-control" />
                                                    </div>
                                                    <div className="mb-3 ff-ctl ml-auto">
                                                        <DropDown options={getStatus} className="fd-drop" defaultValue={setStatus()} selected={selectStatus} placeholder={`Select Status`} search={false}  />
                                                    </div>
                                                </div>

                                                {
                                                    showBy &&
                                                    // <div className="mb-3">
                                                    //     <label className="fs-13 onmineshaft">When is food available?</label>
                                                    //     <input 
                                                    //     defaultValue={ dayjs(data.availableBy).toDate() } 
                                                    //     onChange={ (e) => handleTime(e) }
                                                    //     type="datetime-local" className="form-control" />
                                                    // </div>

                                                    <Flatpickr
                                                        data-enable-time
                                                        // value={ data.availableBy ? dayjs(data.availableBy).toDate() : dayjs().toDate() }
                                                        options={{ allowInput: true }}
                                                        onChange={(date) => handleTime(date) }
                                                        className="form-control"
                                                    />
                                                }

                                                <div className="d-flex align-items-center mrgt3">

                                                    <div className="" style={{width: '49%'}}>
                                                        <Link onClick={(e) => submit(e, 'details')} className={`btn btn-lgr font-metrobold btn-block onmineshaft bg-silverlight fs-16 mb-3 ${loading ? 'disabled' : ''}`}>Back</Link>
                                                    </div>

                                                    <div className="ui-text-right pdl1" style={{width: '59%'}}>
                                                        {
                                                            loading ? (
                                                                <Link className="btn btn-lgr spin btn-block onwhite bg-apple fs-16 mb-3 disabled font-metrobold"><img width="35px" src="../../../images/assets/spinner-white.svg" alt="spinner" /></Link>
                                                            ) : (
                                                                <Link onClick={(e) => submit(e, '')} className="btn btn-lgr btn-block font-metrobold onwhite bg-apple fs-16 mb-3">Save</Link>
                                                            )
                                                        }
                                                    </div>

                                                </div>


                                        </form>

                                        
                                    </div>

                                </>
                            }

                            {
                                step === 2 &&
                                <DeleteFood />
                            }

                            {
                                step === 3 &&
                                <Message />
                            }
                            
                        </div>

                    </div>
                    
                </div>

           </div>

        </>

    )

}

export default FoodDetails;