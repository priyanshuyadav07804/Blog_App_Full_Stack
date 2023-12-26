// import { useContext } from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
// import { Context } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../features/user/userSlice";

export default function Topbar() {
  const {userData} = useSelector((store)=>store.user)
  const dispatchh = useDispatch()

  const handleLogout =()=>{
    dispatchh(LOGOUT())
    window.location.replace("/register");
  }
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/" className="link">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/" className="link">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/write" className="link">
              WRITE
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {userData ? (
          <div className="right">
          <Link to="/settings">
          <img
            className="topImg"
            src={userData.profilePic}
            alt=""
            />
            </Link>
          <li className="logout" onClick={handleLogout}>{userData && "LOGOUT"}</li>
            </div>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/login" className="link">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link to="/register" className="link">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
