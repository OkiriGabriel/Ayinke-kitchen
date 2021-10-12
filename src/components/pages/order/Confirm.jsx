import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios'

import NavBar from '../../layouts/partials/NavBar'
import Dropdown from '../../layouts/partials/DropDown';
import InfoBox from '../../layouts/partials/InfoBox';


import UserContext from '../../../context/user/userContext';
import FoodContext from '../../../context/food/foodContext';
import AddressContext from '../../../context/address/addressContext'
import LocationContext from '../../../context/location/locationContext';
import FoodItemContext from '../../../context/foodItem/foodItemContext';

import BottomBar from './BottomBar';
import storage from '../../helpers/storage';

import colors from '../../helpers/colors'
import body from '../../helpers/body'

const Confirm = (props) => {

    // specific to getting query params
    // test: http://localhost:3000/order/confirm?trxref=_Laj3vStQUY9N&reference=_Laj3vStQUY9N
    const queries = window.location.search.substring(1);
    const split = queries.split('&');
    const reference = body.splitQueries(split, 'trxref');

    const userContext = useContext(UserContext);
    const foodContext = useContext(FoodContext);
    const addressContext = useContext(AddressContext)
    const locationContext = useContext(LocationContext);
    const foodItemContext = useContext(FoodItemContext);

    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [msg, setMessage] = useState({
        title: 'Confirming Payment',
        message: 'Please wait while we confirm your payment.',
        icon: 'handup'
    })

    const [btn, setBtn] = useState({
        text: 'Order Details',
        action: 'orders'
    })

    useEffect(async () => {

        checkRef();

        setTimeout(() => {
            verifyRef(reference);
        })

    }, []);

    const checkRef = () => {
        if(reference !== '' && reference !== undefined && reference !== null){
            setLoading(true)
        }
    }

    const verifyRef = async (ref) => {

        await Axios.post(`${process.env.REACT_APP_PAYMENT_URL}/pay/verify/${ref}`)
        .then((resp) => {
            
            if(resp.data.error === false){
                setMessage({ 
                    ...msg, 
                    title: 'Payment Successful!', 
                    message: 'Your order is being processed. Please reach out to restaurant on your dashboard',
                    icon: 'handok'
                })
                setBtn({ ...btn, text: 'Order Details', action: 'orders' })
                setLoading(false);
            }
        }).catch((err) => {

            if(err.response.data.error === true){

                if(err.response.data.errors[0] === 'Transaction reference not found'){
                    setMessage({ ...msg, title: 'Can\'t Verify Payment',icon: 'handup', message: 'We can\'t verify your payment. Please open a dispute on your dashboard'  })
                    setBtn({ ...btn, text: 'Open DIspute', action: 'dispute' })
                }

                if(err.response.data.errors[0] === 'cannot find customer tied to transaction'){
                    setMessage({ ...msg, title: 'Can\'t Verify Payment', icon: 'handup', message: 'We can\'t tie your payment to your order. Open a dispute'  })
                    setBtn({ ...btn, text: 'Open DIspute', action: 'dispute' })
                }

                if(err.response.data.errors[0] === 'transaction abandoned'){
                    setMessage({ ...msg, title: 'Payment Abandoned', icon: 'handup', message: 'Your attempt to pay for your last order was not completed.'  })
                    setBtn({ ...btn, text: 'Complete Payment', action: 'orders' })
                }

                // _jyfDMJc169EH

            }

            setLoading(false);
        })

    }

    const goTo = (e, action) => {

        let url = '';

        if(e) e.preventDefault();

        if(action === 'orders'){
            url = '/dashbaord/orders';
        }else if(action === 'dispute'){
            url = '/dashbaord/disputes';
        }

        history.push(url);

    }


    return(
        <>
            <NavBar showNav={false} />

            <section className="ui-full-bg-norm disp-box-wrapper" style={{backgroundImage: 'url("../../../images/assets/foopat.svg")'}}>

                <div className="container">

                   <div className="disp-box ui-text-center">

                        <div className="icon-circle mrgb3" style={{backgroundColor: `${colors.randomBgAccents()}`}}>
                            <img src={`../../../images/assets/disp@${msg.icon}.png`} alt="disp_icon" />
                        </div>

                        <h3 className="font-metrobold fs-20" style={{color: colors.primary.green}}>{ msg.title }</h3>

                        <div className="pdr2 pdl2">

                            <p className="font-metromedium fs-16 mrgb3" style={{color: colors.primary.green}}>{ msg.message }</p>
                            
                            {
                                loading ? (
                                    <>
                                        <Link onClick={(e) => e.preventDefault()} to="" className="btn btn-lg spinner onwhite font-metrobold" style={{backgroundColor: colors.primary.green}}>
                                            <img src="../../../images/assets/spinner-white.svg" width="30px" alt="spinner" />
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link onClick={(e) => goTo(e, btn.action)} to="" className="btn btn-lg onwhite font-metrobold" style={{backgroundColor: colors.primary.green}}> { btn.text } </Link>
                                    </>
                                )
                            }
                            

                        </div>

                   </div>

                </div>

            </section>
                
            {/* <BottomBar plates={plates} totalPrice={totalPrice} process={processOrder} /> */}
            
        </>
    )

}

export default Confirm;