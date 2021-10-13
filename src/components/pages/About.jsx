import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../layouts/partials/NavBar';
import ButtonSpinner from '../layouts/partials/ButtonSpinner'


const About = () => {
  const [loading, setLoading] = useState(false);
    return (
        <>
          <NavBar />
                    <section className="ui-full-bg-norm ">
                       <div className="container">
                           <div className="ui-wrapper-xlarge heading-content">
                               <div className="row">
   
                                   <div className="col-lg-10 col-md-12">
   
                                       <h1 className="headline font-gilroybold fs-30 text-center animated fastest fadeIn">
                                        About Ayinke Kitchen
                                       </h1>
                                       <p className="fs-17 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum repellat culpa aut. Recusandae,
                                          omnis ab. Necessitatibus fugit, optio minima velit doloribus soluta debitis quidem magnam. 
                                          Ipsam 
                                         recusandae quae quisquam voluptate est dolores! Reprehenderit eveniet quam unde facere ad saepe aliquam!
                                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum repellat culpa aut. Recusandae,
                                          omnis ab. Necessitatibus fugit, optio minima velit doloribus soluta debitis quidem magnam. 
                                          Ipam 
                                         recusandae quae quisquam voluptate est dolores! Reprehenderit eveniet quam unde facere ad saepe aliquam
                                         </p>
                                         

                                         <div className="form-group">
                                          
                                          {
                                              loading &&
                                              <button className="btn btn-lg btn-block bg-brand-orange onwhite"><ButtonSpinner imageUrl={`../../../images/assets/spinner-white.svg`} /></button>
                                          }
                                          {
                                              !loading &&
                                              <button className="btn btn-w, btn-block bg-brand-orange fs-20 onwhite">Order Now</button>
                                          }
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            
        </>
    )
}

export default About;
