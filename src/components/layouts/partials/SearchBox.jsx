import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DropDown from './DropDown'

import LocationContext from '../../../context/location/locationContext'
import FoodContext from '../../../context/food/foodContext';
import UserContext from '../../../context/user/userContext'

const SearchBox = ({ foodOptions, locations, page, initSearch, topShift }) => {

    const inputRef = useRef(null);
    const userContext = useContext(UserContext);
    let history = useHistory();

    const [show, setShow] = useState(false);
    const [searchData, setSearch] = useState({
        food: '',
        location: '',
        restaurant: ''
    });
    const [queryParams, setParams] = useState({
        food: '',
        location: '',
        restaurant: ''
    });
    const [errMsg, setError] = useState({
        show: false,
        message: ''
    });

    const food = [
        {
            value: 'rice',
            label: 'Jollof Rice',
            left: '',
            image: ''
        },
        {
            value: 'amala',
            label: 'Amala (lafun)',
            left: '',
            image: ''
        }
    ]

    const location = [
        {
            value: 'underg',
            label: 'Lagos',
            left: '',
            image: ''
        },
        {
            value: 'takie',
            label: 'Takie',
            left: '',
            image: ''
        }
    ]

    useEffect(() => {

    }, [])

    const getLocOptions = () => {
        const loc = locations.map((l) => {
            const c = {
                value: l._id,
                label: l.name,
                left: '',
                image: ''
            }
            return c;
        })

        return loc;
    }

    const getFoodOptions = () => {
        const loc = foodOptions.map((fd) => {
            const c = {
                value: fd._id,
                label: fd.type ? fd.type + ' ' + fd.name : fd.name,
                left: '',
                image: ''
            }
            return c;
        })

        return loc;
    }

    const getFoodSelected = (val) => {
        if(val){
            setSearch({...searchData, food: val.value});
            setParams({...queryParams, food: val.label});
        }
    }

    const getLocSelected = (val) => {
        if(val){
            setSearch({...searchData, location: val.value});
            setParams({...queryParams, location: val.label});
            showButton();
        }
    }

    const showButton = () => {
        setShow(true);
    }

    const search = (e) => {

        e.preventDefault();
 if(!searchData.location && !searchData.restaurant){
            
            setError({...errMsg, show: true, message: 'Enter restaurant name or choose a location'});
            setTimeout(() => {
                setError({...errMsg, show: false});
            },5000)

        }else{

            // save search query to local storage
            localStorage.setItem('searchQuery', JSON.stringify(searchData));

            // save query params to local storage
            setParams({...queryParams, restaurant: searchData.restaurant});
            const qp = `food=${queryParams.food}&location=${queryParams.location}&restaurant=${queryParams.restaurant}`;
            localStorage.setItem('queryParams', qp);

            if(page && page !== 'search'){

                // setParams({...queryParams, restaurant: searchData.restaurant});
                // const qp = `food=${queryParams.food}&location=${queryParams.location}&restaurant=${queryParams.restaurant}`;
                // history.push(`/search/${qp}`);
                history.push(`/search`);

            }else if(page && page === 'search'){

                if(!initSearch){
                    window.location.reload(false);
                }
                
                initSearch();

            }else if(!page){

                // setParams({...queryParams, restaurant: searchData.restaurant});
                // const qp = `food=${queryParams.food}&location=${queryParams.location}&restaurant=${queryParams.restaurant}`;
                // history.push(`/search/${qp}`);
                history.push(`/search`);
            }
            

        }

    }

    return (
        <>
       {
                errMsg.show &&
                <div className="container">
                    <p className="onaliz fs-14 mb-1 mt-1">{errMsg.message}</p>
                </div>
            }

            {
                !show &&
                <div className="container">
                    <p className="onwhite  font-heviticabold fs-13 mb-1 mt-1"> Pick a location</p>
                </div>
            }

            <div className="search-box" style={{ marginTop: `${topShift? topShift: ''}` }}>

                {/* <div className="search__input">
                    <input 
                    defaultValue={(e) => {setSearch({...searchData, restaurant: e.target.value})} } 
                    onChange={(e) => {setSearch({...searchData, restaurant: e.target.value})}}
                    onFocus={showButton} ref={inputRef} type="text" className="form-control fs-14 font-metromedium" placeholder="Restaurant name" />
                </div>
                <div className="search__food">
                    <DropDown options={getFoodOptions} className="sh--drop" selected={getFoodSelected} placeholder={`Food`} search={true}  />
                </div> */}
                <div className="search__location d-flex">
                    <DropDown options={getLocOptions} className="sh--drop" selected={getLocSelected} placeholder={`Location`} search={true}  />

                    
                </div>
                

            </div>
            
            

     

            <div className={`container ${show ? '' : 'ui-hide'}`}>
                <div className="row">
                    <div className="col-md-5 mx-auto">
                    <Link onClick={(e) => search(e)} className="btn btn-lg btn-block py-4 ui-rounded onwhite bg-orange mrgt1 fs-15">Enter</Link>
                    </div>
                </div>
            </div>

        </>
    )

}

export default SearchBox;