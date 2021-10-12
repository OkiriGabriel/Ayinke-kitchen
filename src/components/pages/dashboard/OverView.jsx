import React, {useEffect, useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom'

import Placeholder from '../../layouts/partials/Placeholder'

import storage from '../../helpers/storage';

const OverView = ({ foodItems, addresses }) => {

    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();

        let sq, qp;
        if(storage.checkSearchQuery()){
            sq = storage.getSearchQuery();
            qp = storage.getQueryParams();
        }

        localStorage.clear();
        localStorage.setItem('searchQuery', sq);
        localStorage.setItem('queryParams', qp);

        history.push('/');
    }

    const leadingZero = (num) => {
        return num < 10 ? "0" + num : num;
    }



    return (
        <>

            <section className="overview">

                <div className="container">

                    <div className="ov--bx">

                        <div className="ov--item">
                            <div className="ui-text-center font-weight-bold">
                                <span className="fs-30 brand-orange">{foodItems !== 0 ? leadingZero(foodItems) : '0'}</span>
                            </div>
                            <div className="mt-1 ui-text-center">
                                <span className="chk-icon xmini pdr">
                                    <img src="../../../images/icons/dfood.svg" alt="icon" />
                                </span>
                                <span className="fs-14 onsilver">Food Items</span>
                            </div>
                        </div>

                        <div className="ov--item">
                            <div className="ui-text-center font-weight-bold">
                                <span className="fs-30 brand-orange">{addresses ? leadingZero(addresses) : '0'}</span>
                            </div>
                            <div className="mt-1 ui-text-center">
                                <span className="chk-icon xmini pdr">
                                    <img src="../../../images/icons/dpin.svg" alt="icon" />
                                </span>
                                <span className="fs-14 onsilver">Addresses</span>
                            </div>
                        </div>
                        
                    </div>

                </div>

            </section>

        </>

    )

}

export default OverView;