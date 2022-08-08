import React, { useEffect, useState } from "react";
import userProfile from "../Assets/Images/profile-users.jpg";
import axios from "axios";

const ConverSations = ({ c, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = c.members.find((m) => m !== currentUser?._id);
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/getUser?userId=${friendId}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, c]);

  return (
    <>
      <div className="users mt-4">
        <div className="user-box">
          <div className="user-pic">
            <img className="left-side-profile-img" src={userProfile} alt="" />
          </div>
          <div className="user-details ms-3">
            <h6 className="left-site-userName">{user?.name}</h6>
            <p className="left-side-msg m-0">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
      <hr style={{ display: "block", width: "100%", color: "#b2b4b6" }} />
    </>
  );
};

export default ConverSations;
