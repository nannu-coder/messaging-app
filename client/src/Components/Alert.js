import React from "react";
import { useAppContext } from "../Context/AppContext";

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
