import { useContext, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch,isFetching} = useContext(Context)

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      const res = await axios.post("https://blog-nine-psi-28.vercel.app/api/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS",payload:res.data});
    } catch (err) {
      dispatch({type:"LOGIN_FAILURE"});
      console.log(err);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Usernmae</label>
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
