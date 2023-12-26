import "./settings.css";
import SideBar from "../../components/sidebar/SideBar";
import {useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, UPDATE_FAILURE, UPDATE_START, UPDATE_SUCCESS } from "../../features/user/userSlice";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error,setError] = useState(null);

  const {userData} = useSelector((store)=>store.user)
  const dispatch = useDispatch();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(UPDATE_START())
    const updatedUser = {
      userId: userData._id,
      username,
      email,
      password,
    };

    try {
      if (file) {
        updatedUser.image = file;
        const res = await axios.patch(
          "http://localhost:5000/api/users/" + userData._id,
          updatedUser,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSuccess(true);
        setFile(null);
        setError(false)
        dispatch(UPDATE_SUCCESS(res.data))

      } else {
        const res = await axios.patch(
          "http://localhost:5000/api/users/" + userData._id,
          updatedUser
          );
          setSuccess(true);
          setFile(null);
          setError(false)
          // dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
          dispatch(UPDATE_SUCCESS(res.data))
          
      }
    } catch (err) {
      // dispatch({ type: "UPDATE_FAILURE" });
      dispatch(UPDATE_FAILURE())
      setError(true)
    }
  };
  const handleDelete = async() =>{
    try {
      await axios.delete("http://localhost:5000/api/users/"+userData._id)
      dispatch(LOGOUT())
      window.location.replace("/register");
    } catch (error) {
      console.log(error)
    }    
  }
  return (
    <div className="settings">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingsUpdateTitle">Update your account</span>
          <span className="settingsDeleteTitle" onClick={handleDelete}>Delete account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : userData.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>UserName</label>
          <input
            type="text"
            placeholder={userData.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={userData.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated..
            </span>
          )}
          {error && (
            <span
              style={{ color: "red", textAlign: "center", marginTop: "20px" }}
            >
              Something Went Wrong...
            </span>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
}
