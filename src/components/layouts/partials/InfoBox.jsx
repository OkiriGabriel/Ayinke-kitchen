import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import colors from '../../helpers/colors'
import Axios from 'axios'

import LoginModal from '../../layouts/partials/LoginModal'

const InfoBox = ({ title, action, actionText }) => {


    const [show, setShow] = useState(false)

    useEffect(() => {

    }, [])

    const toggle = (e) => {
        if(e) e.preventDefault();
        setShow(!show);
    }

    const fireAction = async (e) => {

        if(e) e.preventDefault();

        if(action === 'login'){
            toggle(e);
        }else if(action === 'logout'){

            localStorage.removeItem('userId')
            localStorage.removeItem('userEmail')
            localStorage.removeItem('token')

            await Axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);
            window.location.reload();
            
        }else{
            console.log('..');
        }

    }

    return (
        <>
            <div className="info-bx">
                <div>
                    <h3 className="font-metromedium fs-13 mrgb0" style={{color: colors.primary.green}}>{ title ? title : 'Info Box' }</h3>
                </div>
                <div className="ml-auto">
                    <Link onClick={(e) => fireAction(e)} className="font-metromedium fs-13 mrgb0 infobx-btn" style={{color: colors.primary.green}}>{ actionText ? actionText : 'Btn' }</Link>
                </div>
            </div>

            <LoginModal isShow={show} closeModal={toggle} />

        </>
    )

}

export default InfoBox;