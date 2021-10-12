import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    const scrollTo = (e, t) => {
        e.preventDefault();
        const elem = document.getElementById(t);
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <>
            <footer className="footer ui-full-bg-norm"style={{backgroundImage: 'url("../../images/assets/bg@foot.png")'}}>
                    
                    <div className="ui-wrapper-large">
                        <div className="container">
                            
                            <div className="row">

                                {/* <div className="col-md-3 logo-x">
                                    <img className="" src="images/assets/logo.svg" className="" alt="logo"/>
                                </div> */}
                            
                            </div>
                           

                                    <div className="row foo-ter mrgt3">

                                    <div className="col-md-3 col-sm-6 foot-er">
                                            <h4 className="font-intersemibold fs-18 on-black mrgb">Locations</h4>
                                            <ul className="font-interregular links">
                                                <li className="link-underlined onmineshaft"> 31 Ogo Oluwa Street.</li>
                                                <li className="link-underlined onmineshaft"> Ojodu, Lagos.</li>

                                            </ul>
                                        </div>

                                        <div className="col-md-3 col-sm-6 foot-er">
                                            <h4 className="font-intersemibold  fs-18 on-black mrgb">Resources</h4>
                                            <ul className="font-interregular links">
                                                <li><a href="https://medium.com/@TriocephKiddies" className="link-underlined hover">Blog</a></li>
                                                <li><Link to="/careers" className="link-underlined hover">Careers</Link></li>
                                            </ul>
                                        </div>

                                      

                                        <div className="col-md-3 col-sm-6 foot-er">
                                            <h4 className="font-intersemibold   fs-18 on-black mrgb">Pages</h4>
                                            <ul className="font-interregular links">
                                                <li><Link to="/about" className="link-underlined hover">About Us</Link></li>
                                                <li><Link to="/contact" className="link-underlined hover">Contact us</Link></li>
                                                <li><a href="https://medium.com/@TriocephKiddies" className="link-underlined hover">Blog</a></li>
                                                
                                            </ul>
                                        </div>
                                        <div className="col-md-3 col-sm-6 foot-er">
                                            <h4 className="font-intersemibold   fs-18 on-black ">Connect with us online</h4>
                                            <ul className="font-interregular links">
                                                <li><Link className="link-underlined hover"></Link></li>
                                                <li>
                                                <div class="widget about_widget soc">
                                                    <ul class="social_media list-inline">
                                                    <li class="list-inline-item"><a target="_blank" href="https://www.instagram.com/triocephkids" class="bg-instagram"><i class="fab fa-instagram onwhite" aria-hidden="true"></i></a></li>
                                                        <li class="list-inline-item"><a target="_blank" href="https://web.facebook.com/triocephkiddies" class="bg-facebook"><i class="fab fa-facebook-f onwhite" aria-hidden="true"></i></a></li>
                                                        <li class="list-inline-item"><a target="_blank" href="https://twitter.com/triocephkiddies" class="bg-facebook"><i class="fab fa-twitter onwhite" aria-hidden="true"></i></a></li>
                                                        <li class="list-inline-item"><a target="_blank" href="https://www.linkedin.com/company/trioceph-kiddies-limited" class="bg-facebook"><i class="fab fa-linkedin onwhite" aria-hidden="true"></i></a></li>
                                                    </ul>
                                                </div>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                         </div>


                    </div>

                      
                    
                    <div className="copyright ui-wrapper-mini" style={{backgroundColor: '#F0F5F8'}}>

                        <div className="container">

                            <div className="ui-text-center">

                                <p className="font-gilroylight fs-14 mrgb0 brand-neutral">Copyright &copy; 2021 - Akinyemo Kitchen. All rights reserved.</p>

                            </div>

                        </div>

                    </div>
            
            </footer>

        </>
    )
}
export default Footer;

