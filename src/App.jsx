import React, { useState } from "react";
import "./App.css";
import UserList from "./UserList";
import UserInfo from "./UserInfo";
import { Paper } from "@mui/material";

function App() {
  const [user,setUser] = useState()
  const [err,setErr] = useState(false)
  return (
    <div className="app">
      <Paper className="elements" elevation={4}>
        <UserList setUser={setUser} err={err} setErr={setErr}/>
        <UserInfo user={user}  err={err} setErr={setErr}/>
      </Paper>
    </div>
  );
}

export default App;
