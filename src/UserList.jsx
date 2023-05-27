import {
  Avatar,
  Box,
  CircularProgress,
  Pagination,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./UserList.css";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

const UserList = ({ setUser,setErr,err }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [length, setLength] = useState([]);

  useEffect(() => {
    const url = new URL(`https://602e7c2c4410730017c50b9d.mockapi.io/users`);
    url.searchParams.append("completed", false);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", 6);

    const fullLengthUrl = new URL(
      `https://602e7c2c4410730017c50b9d.mockapi.io/users`
    );
    const func = async () => {
      try {
        setLoading(true);
        const fullLength = await axios.get(fullLengthUrl);
        setLength(fullLength.data.length);
        const response = await axios.get(url);
        console.log(response.data);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErr(true);
      }
    };
    func();
  }, [page]);

  return (
    <div className="userlist">
      <Paper
        className="userlist__heading"
        elevation={4}
        sx={{ backgroundColor: "#C5DFFF" }}
      >
        USERS LIST
      </Paper>
      <div className="userlist__users">
        {loading ? (
          <div className="spinner">
            <CircularProgress />
          </div>
        ) : err ? (
          <div className="spinner failed">
            <CancelIcon sx={{ color: "red", fontSize: "80px" }} />
            <h2 style={{color : "red"}}>There is Error in fetching API</h2>
            <p style={{color : "red"}}>Please try after some Time !!</p>
          </div>
        ) : (
          users.map((elem) => (
            <div
              className="userlist__user"
              onClick={() => {
                setUser(elem);
                document.title = `User - ${elem?.profile.firstName} ${elem?.profile.lastName}`;
              }}
            >
              <Avatar
                alt={elem?.profile.firstName}
                sx={{ width: 52, height: 52 }}
                src={elem?.avatar}
              />
              <div className="info">
                <p style={{ marginBottom: "3px" }}>
                  <b>{`${elem?.profile.firstName} ${elem?.profile.lastName}`}</b>
                </p>
                <small style={{ color: "grey" }}>{elem?.jobTitle}</small>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="userlist__pagination">
      {
        err ? " "  : <Pagination
          count={Number(length / 6).toFixed(0)}
          color="primary"
          onChange={(_, value) => {
            setPage(value);
          }}
        />
      } 
      </div>
    </div>
  );
};

export default UserList;
