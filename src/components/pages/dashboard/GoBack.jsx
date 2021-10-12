import React, {useEffect, useState, useContext} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import colors from '../../helpers/colors'

import body from '../../helpers/body'


const GoBack = ({ buttonText }) => {

    const history = useHistory();


    useEffect( async () => {

    }, [])

    const goBack = async (e) => {

        if(e) e.preventDefault();
        await body.dismissBackground('white')
        history.goBack()
    }

    return (
        <>

            <footer>
                <Link onClick={(e) => goBack(e)} className="mrl">
                    <div className="btm-nav">
                        <span className="fe fe-chevron-left fs-19" style={{color: colors.neutral.grey, position:'relative', top:'2px'}}></span>
                        <span className="font-metromedium fs-17" style={{color: colors.primary.green}}>{ buttonText ? buttonText : 'Cancel'} </span>
                    </div>
                </Link>
            </footer>

        </>

    )

}

export default GoBack;