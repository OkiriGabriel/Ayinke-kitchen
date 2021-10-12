import React from 'react';

const Placeholder = ({ height, width, bgColor }) => {


    return (
        <>
            <span className="place-box" style={{ width: `${width ? width : ''}`, height: `${height ? height: ''}`, backgroundColor: `${bgColor ? bgColor : ''}` }}></span>
        </>
    )

}

export default Placeholder;