import React, {useEffect, useState} from 'react';

const ButtonSpinner = ({ imageUrl }) => {

    return (
        <>
           <img width="40px" src={imageUrl ? imageUrl : '../../../images/assets/spinner-white.svg'} alt="button spinner"/>
        </>
    )

}

export default ButtonSpinner;