import React, { useEffect, useRef, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import profile from "../../Assets/Images/profile.jpg";
import "../../Assets/CSS/Style.css";
import UserRightPanel from "../../Components/UserRightPanel";
import { useAppContext } from "../../Context/AppContext";
import ConverSations from "../../Components/ConverSations";
import SearchInput from "../../Components/SearchInput";
import { BiUser } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { FiUsers } from "react-icons/fi";
import { BsFillGearFill } from "react-icons/bs";
import axios from "axios";
import userProfile from "../../Assets/Images/profile-users.jpg";
import { BsDot } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";
import Message from "../../Components/Message";
import { io } from "socket.io-client";

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { logOut, user } = useAppContext();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:5001");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/conversation/${user._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/message/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:5000/message/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="chat-header">
              <div className="header-left">
                <h2>Messages</h2>
              </div>
              <div className="header-right">
                <button onClick={logOut} className="logOutBtn">
                  Logout
                </button>
                <FaRegBell size={22} />
                <img className="profile-img" src={profile} alt="" />
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="left-panel">
              <div className="left-panel--header">
                <SearchInput />
              </div>
              <div className="tabs mt-3">
                <div className="icon active">
                  <IconContext.Provider value={{ className: "tabs-icon" }}>
                    <BiUser />
                  </IconContext.Provider>
                </div>
                <div className="icon">
                  <IconContext.Provider value={{ className: "tabs-icon" }}>
                    <FiUsers />
                  </IconContext.Provider>
                </div>
                <div className="icon">
                  <IconContext.Provider value={{ className: "tabs-icon" }}>
                    <BsFillGearFill />
                  </IconContext.Provider>
                </div>
              </div>

              {conversations.map((c, i) => (
                <div onClick={() => setCurrentChat(c)}>
                  <ConverSations c={c} key={i} currentUser={user} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="chat-headers">
              <div className="chat-profile-img">
                <img className="chat-profile-img" src={userProfile} alt="" />
              </div>
              <div className="user-status">
                <h6>{user.name}</h6>
                <BsDot color="green" size={28} />
                <span>Online</span>
              </div>
            </div>
            <div className="chat-body">
              {currentChat ? (
                <>
                  {messages.map((m) => (
                    <>
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === user._id} />
                      </div>
                    </>
                  ))}
                </>
              ) : (
                <span className="emtyChat">Open Conversations</span>
              )}
            </div>
            {currentChat && (
              <div className="send-box mt-auto">
                <textarea
                  className="form-control shadow-none msg-input"
                  name="msg"
                  cols="40"
                  rows="3"
                  placeholder="Text Here..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <div className="submitbtn">
                  <button className="attch">
                    <FiPaperclip size={22} />
                  </button>
                  <button onClick={handleSubmit} className="message-sendBtn">
                    <FaPaperPlane color="#ffffff" />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-3">
            <UserRightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
