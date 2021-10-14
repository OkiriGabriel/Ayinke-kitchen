import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';


const DashTopBar = ({ pageTitle, linkComps }) => {
    return (
        <>
            <div className="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2 fs-24">{pageTitle ? pageTitle : ''}</h1>
                <div className="ml-auto">
                    <>
                        {
                            linkComps ? linkComps() : ''
                        }
                    </>
                </div>
            </div>  
        </>
    )
}

export default DashTopBar;
