import React, { useState } from "react";
import $ from "jquery";

function SignForm(props) {
    const title = props.title;
    let initialState = {username: "", password: ""};
    if(title === "Register") initialState.name = "";
    const [data, setData] = useState(initialState);
    function getInput(event) {
        const {name, value} = event.target;
        setData(previousValues=>{return {...previousValues, [name]: value}});
    }
    function sign() {
        if(data.password.length < 7) return;
        let ajaxData = {
            username: data.username,
            password: data.password
        };
        if(title==="Register"){
            ajaxData.name = data.name;
            setData({name:"", username:"", password:""});
        } else {
            setData({username:"", password:""});
        }
        $.ajax({
            url: title.toLowerCase(),
            type: "POST",
            data: ajaxData,
            success: function(data){
                console.log(data+" in "+ title +": ");
                props.onAuthenticate();
            }
        });
    }

    const noBorderRadius = {borderRadius:"0"};
    const noBottomBorderRadius = {borderBottomLeftRadius:"0", borderBottomRightRadius:"0"};
    const noTopBorderRadius = {borderTopLeftRadius:"0", borderTopRightRadius:"0"};
    
    return (
        <div className="col-md-6 sign-form">
            <h1 className="display-6" style={{textAlign:"center", marginBottom:"20px"}}>
                {props.title}
            </h1>
            <form>
                {title === "Register" && 
                    <input onChange={getInput} name="name" type="text"  placeholder="Name" className="form-control" required style={noBottomBorderRadius} value={data.name}/> 
                }
                <input onChange={getInput} name="username" type="email"       placeholder="Email" className="form-control" required style={title==="Login" ? noBottomBorderRadius : noBorderRadius} value={data.username}/>
                <input onChange={getInput} name="password" type="password" placeholder="Password" className="form-control" required style={noTopBorderRadius} value={data.password}/>
                <button onClick={sign} type="button" className={title==="Login" ? "btn btn-primary" : "btn btn-success"} style={{marginTop:"10px"}}>{props.title}</button>
            </form>
        </div>
    );
}

export default SignForm;