import "./sidebar.css";
import about from "./about.jpg";

export default function Sidebar() {

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={about}
          alt=""
        />
        <p>
          Hello, everyone! My name is Priyanshu Yadav, and I am currently
          pursuing my Bachelor of Technology (B.Tech) in Computer Science. I am
          passionate about exploring the fascinating world of technology and its
          applications
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
