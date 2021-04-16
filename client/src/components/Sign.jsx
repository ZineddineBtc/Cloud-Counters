import React from "react";
import SignForm from "./SignForm";

function Sign(props) {

    return(
        <div>
            <h1 className="display-4" id="title">
                Sign in now and save your notes on our platform!
            </h1>
            <div className="row">
                <SignForm key="0" title="Login"    onAuthenticate={props.onAuthenticate}/>
                <SignForm key="1" title="Register" onAuthenticate={props.onAuthenticate}/>
            </div>
        </div>
    );
}

export default Sign;