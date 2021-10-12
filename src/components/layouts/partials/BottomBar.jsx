import React, {useEffect, useState, useContext} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import colors from '../../helpers/colors'

import UserContext from '../../../context/user/userContext'

import storage from '../../helpers/storage'


const BottomBar = ({ count, total, items, restId, check }) => {

    const userContext =  useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const [plate, setPlate] = useState({
        items: [],
        total: 0,
        restaurant: ''
    })



    useEffect( async () => {

    }, [])

    
    const proceed = async (e) => {
       if(e) e.preventDefault();
       
       if(items.length > 0){

            if(!checkLocation(items)){
                check();
            }else{

                // await userContext.setPlateData({ items: items, restaurant: restId });
                setPlate({ ...plate, items: items, total: total, restaurant: restId });
    
                storage.setPlate([ { items: items, restaurant: restId, totalPrice: total } ]);
    
                history.push('/order/plates')

            }

       }
    }

    const checkLocation = (items) => {

        let result = true
        for (let i = 1; i < items.length; i++) {
            if (items[i].location.toString() !== items[0].location.toString()) {
              result = false;
              break;
            }
        }

        return result;
    }

    const goBack = (e) => {
        if(e) e.preventDefault();
        history.goBack()
    }

    return (
        <>

            <footer>
                <div id="bottom-bar" className="bottom-bar food">

                    <div className="bar-food">
                        <Link onClick={(e) => goBack(e)} className="pdr1 mrl"><span className="fe fe-chevron-left fs-15" style={{color: colors.neutral.grey, position:'relative', top:'5px'}}></span></Link>
                        <img src="../../../images/icons/dfood2.svg" alt="food icon"/>
                        <sup className="fd-sup">{ count }</sup>
                    </div>

                    <div className="bar-food">
                        <p className="mrgb0">
                            <span className="title font-metrolight fs-14 pdr">Total:</span>
                            <span className="title font-metrobold fs-15">&#x20A6;{total}</span>
                        </p>
                    </div>

                    <div className="ml-auto">

                        <div className="bar-food">
                            <Link onClick={(e) => proceed(e)} className={`bar-fdbtn font-metromedium fs-14 onwhite ${!count || count === 0 ? 'disabled' : ''}`} style={{backgroundColor: colors.primary.green}}>Proceed</Link>
                        </div>

                    </div>

                </div>
            </footer>

        </>

    )

}

export default BottomBar;