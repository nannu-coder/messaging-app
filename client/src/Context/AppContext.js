import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  // LOGIN_USER_BEGIN,
  // LOGIN_USER_ERROR,
  // LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  // REGISTER_USER_BEGIN,
  // REGISTER_USER_ERROR,
  // REGISTER_USER_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
} from "./Actions";
import reducer from "./Reducer";

const AppContext = createContext();

//set Default

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isMember: true,
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  user: user ? JSON.parse(user) : null,
  token: token,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  const addUserToLocalStrage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeuserToLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // const registerUser = async (currentUser) => {
  //   dispatch({ type: REGISTER_USER_BEGIN });
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/register",
  //       currentUser,
  //       { withCredentials: true }
  //     );
  //     console.log(response);
  //     const { user, token } = response.data;

  //     dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });

  //     addUserToLocalStrage({ user, token });
  //   } catch (error) {
  //     console.log(error.response);
  //     dispatch({
  //       type: REGISTER_USER_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // };

  // const loginUser = async (currentUser) => {
  //   dispatch({ type: LOGIN_USER_BEGIN });
  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:5000/login",
  //       currentUser
  //     );
  //     const { user, token } = data;

  //     dispatch({
  //       type: LOGIN_USER_SUCCESS,
  //       payload: { user, token },
  //     });

  //     addUserToLocalStrage({ user, token });
  //   } catch (error) {
  //     dispatch({
  //       type: LOGIN_USER_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        `http://localhost:5000/${endPoint}`,
        currentUser,
        { withCredentials: true }
      );

      const { user, token } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStrage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logOut = () => {
    dispatch({ type: LOGOUT_USER });
    removeuserToLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        // registerUser,
        removeuserToLocalStorage,
        addUserToLocalStrage,
        // loginUser,
        setupUser,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
