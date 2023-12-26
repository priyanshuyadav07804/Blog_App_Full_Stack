import {useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
// import { Context } from "../../context/Context";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, loadUserData } from "../../features/user/userSlice";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  // const {dispatch,isFetching} = useContext(Context)
  const {isFetching} = useSelector((store)=>store.user)

  const dispatchh = useDispatch()
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    // dispatch({type:"LOGIN_START"});
    dispatchh(LOGIN_START())
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value,
      })
      console.log(res.data)
      // dispatch({type:"LOGIN_SUCCESS",payload:res.data});
      dispatchh(LOGIN_SUCCESS(res.data))
      dispatchh(loadUserData())
    } catch (err) {
      // dispatch({type:"LOGIN_FAILURE"});
      dispatchh(LOGIN_FAILURE())
      console.log(err);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your Username"
          ref = {userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="enter yout password"
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching} >
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
