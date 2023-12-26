// import { useContext, useEffect } from "react";
import TopBar from "./components/topbar/TopBar";
import Register from "./pages/Register/Register";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import {useSelector} from 'react-redux'
import './App.css'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import { Context } from "./context/Context";

function App() {
  // const {user} = useContext(Context);
  const {userData} = useSelector((store)=>store.user)

  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          {userData ? <Home/> : <Register />}
        </Route>
        <Route path="/login">
        {userData ? <Home/> : <Login />}
        </Route>
        <Route path="/write">
        {userData ? <Write/> : <Register />}
        </Route>
        <Route path="/settings">
        {userData ? <Settings/> : <Register />}
        </Route>
        <Route path="/post/:postId">
          <Single />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
