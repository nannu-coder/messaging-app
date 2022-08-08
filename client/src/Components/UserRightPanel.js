import React from "react";
import userProfile from "../Assets/Images/profile-users.jpg";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUserDelete,
} from "react-icons/ai";

const UserRightPanel = () => {
  return (
    <div className="right-panel px-4 py-4">
      <div className="headers-info">
        <div className="right-profile-img">
          <img className="left-side-profile-img" src={userProfile} alt="" />
        </div>
        <div className="right-profile-details">
          <h6>User Name</h6>
          <p>Co-worker</p>
          <p>Dhaka, Bangladesh</p>
        </div>
        <div className="right-moreInfo-btn">
          <button className="moreInfo-btn">More Information</button>
        </div>
      </div>

      <div className="contact-info">
        <div className="contact-headers d-flex justify-content-between">
          <h6>Contact Information</h6>
          <a href="#">Add More</a>
        </div>
        <hr />
        <div className="contact-info-details">
          <div className="eamil">
            <span>
              <AiOutlineMail />
            </span>
            <a href="#">useremail@gmail.com</a>
          </div>

          <div className="phone">
            <span>
              <AiOutlinePhone />
            </span>
            <a href="#">+880135555555</a>
          </div>
          <div className="userName">
            <span>
              <AiOutlineUserDelete />
            </span>
            <a href="#">user.username.1</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRightPanel;
