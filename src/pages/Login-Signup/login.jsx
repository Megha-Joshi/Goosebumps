import "../../root.css";
import "../Login-Signup/auth.css";
import { useAuth } from "../../context/authContext.js";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
const { token, loginHandler } = useAuth();
const navigate = useNavigate();
const [ userDetails, setUserDetails] = useState({email: "", password: ""});

const guestUserHandler = (event) => {
event.preventDefault();
setUserDetails({
email: "adarshbalika@gmail.com",
password: "adarshBalika123",
})
}

function formHandler(e){
e.preventDefault();
loginHandler(userDetails);
}

return(
<div className="login-container justify-align">
    <form className="form-container" onSubmit={formHandler}>
        <h2 className="login-head">Login</h2>
        <fieldset>
            <legend for="username" className="inp-txt">Email</legend>
            <input type="text" id="username" name="username" placeholder="abc@gmail.com" className="input-box"
                value={userDetails.email} onChange={(e)=> setUserDetails({...userDetails, email: e.target.value})}
            required /><br />
        </fieldset>
        <fieldset>
            <legend for="password" className="inp-txt">Password</legend>
            <input type="password" id="password" name="password" placeholder="**********" className="input-box"
                value={userDetails.password} onChange={(e)=> setUserDetails({...userDetails, password: e.target.value})}
            required />
        </fieldset>
        <div className="check-pass">
            <label for="checkbox">
                <input type="checkbox" id="checkbox" name="checkbox" /> Remember me</label>
            <button className="text-btn">Forgot your Password?</button>
        </div>
        <div>
            <button className="login-btn long-btn" onClick={guestUserHandler}>Add Guest Credentials</button>
            <button type="submit" className="login-btn long-btn">Login</button>
        </div>
        <Link to="/signup">
        <div className="new-ac">
            <button className="text-btn">Create New Account</button>
        </div>
        </Link>
    </form>
</div>
)
}

export { Login };