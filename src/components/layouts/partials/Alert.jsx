import React, {useEffect, useState} from 'react';

const Alert = ({ show, message, type }) => {


    const getIcon = (type) => {
        let ic = 'fe-info';

        if(type === 'info'){
            ic = 'fe-info';
        }else if(type === 'warning'){
            ic = 'fe-alert-triangle'
        }else if(type === 'danger'){
            ic = 'fe-alert-octagon'
        }else if(type === 'success'){
            ic = 'fe-check-circle'
        }

        return ic;
    }

    return (
        <>
            <div className={`alert alert-${type} d-flex ${show === false ? 'ui-hide':''}`} role="alert">

                <div><span className={`fe ${getIcon(type)} fs-17`}></span></div>

                <div className="pdl">
                    <div className="message font-metromedium fs-13" style={{lineHeight: '14px'}}>
                        { message ? message : 'No message' }
                    </div>
                </div>

            </div>
        </>
    )

}

export default Alert;