import React from "react";
import HeaderLinks from "./HeaderLinks";

function Header(props) {
    return (
        <section id="header-section">
            <div className="container-fluid" id="global-container-fluid">        
                <nav className="navbar navbar-expand-lg navbar-dark" id="navbar">
                    <div className="container-fluid" style={{padding:"0"}}>
                        <a className="navbar-brand" id="nav-brand" href="/">Cloud Counters</a>
                        {props.isAuthenticated &&<HeaderLinks logout={props.logout}/>}
                    </div>
                </nav>
            </div>
        </section>
    );
}
export default Header;