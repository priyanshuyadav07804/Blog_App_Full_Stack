import { useState } from "react";
import "./write.css";
import axios from "axios";
// import { Context } from "../../context/Context";
// import { useContext } from "react";
import { useSelector } from "react-redux";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  // const { user } = useContext(Context);
  const {userData} = useSelector((store)=>store.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: userData.username,
      title,
      desc,
    };
    if(file){
      newPost.image = file
    }
    try {
      const res = await axios.post("http://localhost:5000/api/posts", newPost, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res)
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt=""
        />

      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className=" writeIcon fas fa-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={e=>setFile(e.target.files[0])}/>
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story"
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}

          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          publish
        </button>
      </form>
      
    </div>
  );
}
