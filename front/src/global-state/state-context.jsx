import { useEffect, useState } from "react";

const StateContext = () => {

  const [employees, setEmployees] = useState([]);
  const [requests, setRequests] = useState([]);
  const [modal, setModal] = useState({
    sucsess: false,
    title: "",
    show: false
  });



  return {
    setEmployees,
    employees,
    setRequests,
    requests,
    modal,
    setModal
  }

}

export default StateContext;
