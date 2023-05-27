import { Avatar, Box, Paper } from "@mui/material";
import React from "react";
import "./UserInfo.css";
import CancelIcon from "@mui/icons-material/Cancel";


const UserInfo = ({ user, err }) => {
  return (
    <div className="userinfo">
      <Paper
        className="userinfo__heading"
        elevation={4}
        sx={{ backgroundColor: "#C5DFFF" }}
      >
        USER INFO
      </Paper>
      {err ? (
        <div className="spinner failed">
          <CancelIcon sx={{ color: "red", fontSize: "80px" }} />
          <h2 style={{ color: "red" }}>There is Error in fetching API</h2>
          <p style={{ color: "red" }}>Please try after some Time !!</p>
        </div>
      ) : user ? (
        <div className="userinfo__center">
          <div className="userinfo__main">
            <Avatar
              alt={user?.profile.firstName}
              sx={{ width: 100, height: 100 }}
              src={user?.avatar}
            />
            <h2 style={{ margin: "10px 0" }}>{user?.profile?.username}</h2>
            <small>{`${user?.profile.firstName} ${user?.profile.lastName}`}</small>

            <Box className="userinfo__bio">{user?.Bio}</Box>
          </div>
          <Box marginTop={2} lineHeight={3} className="personalBox">
            <h4>
              Name :{" "}
              <span style={{ color: "grey" }}>
                {" "}
                {`${user?.profile.firstName} ${user?.profile.lastName}`}
              </span>
            </h4>
            <h4>
              Job Title :{" "}
              <span style={{ color: "grey" }}> {user?.jobTitle}</span>
            </h4>
            <h4>
              Email :{" "}
              <span style={{ color: "grey" }}> {user?.profile?.email}</span>
            </h4>
          </Box>
        </div>
      ) : (
        <div className="selectUser">
          <Paper elevation={6} className="selectUser__paper">
            Please Select the User to see the information about them.
          </Paper>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
