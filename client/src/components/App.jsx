import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sign from "./Sign";
import Foreground from "./Foreground";
import $ from "jquery";

function App() {
    const [isAuthenticated, setAuthentication] = useState(false);
    if(!isAuthenticated) {
        $.ajax({
            url: "isAuthenticated",
            type: "POST",
            success: function(data){
                setAuthentication(data.isAuthenticated);
                console.log("Auth: "+data.isAuthenticated);
            }
        });
    }

    function authenticate() {
        setAuthentication(true);
    }

    function logout() {
        $.ajax({
            url: "logout",
            type: "POST",
            success: function(){
                setAuthentication(false);
            }
        });
    }

    return (
        <div>
            <Header isAuthenticated={isAuthenticated} logout={logout}/> 
            {isAuthenticated ? <Foreground /> : <Sign onAuthenticate={authenticate}/>}
            <Footer />
        </div>
    );
}

export default App;