import { useContext, useEffect, useState } from "react";
import { handleCommonResponse } from "../../../../general-services/handler";
import ApiContext from "../../../../global-state/api-context";
import { RequestApi } from "../../services/request-service";


const StateListRequest = () => {

  const requestApi = new RequestApi();
  // usamos el contexto como mantener los empleados en el estado global
  const {requests, setRequests} = useContext(ApiContext);  
  
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [numItems, setNumItems] = useState(10);
  
  const { setModal } = useContext(ApiContext);

  const setValues = (d) => {
    setRequests(d.data)
    setCount(d.count)
  }

  // trae la data inicial de la tabla
  useEffect(() => {
    requestApi.getByPagination(page, numItems)
      .then(r => r.json())
      .then((d) => {
        handleCommonResponse(d, setValues, setModal);
      })
      .catch(err => console.log(err));
  }, []);

  // cuando el usuario da click en siguiente pagina
  const clickNextPage = () => {
    if (page * numItems >= count) {
      return
    }
    const newPage = page + 1;
    setPage(newPage);
    requestApi.getByPagination(newPage, numItems)
      .then(r => r.json())
      .then((d) => {
        handleCommonResponse(d, setValues, setModal);
      })
      .catch(err => console.log(err));
  }

  // cuando el usuario da click en la pagina anterior
  const clickBackPage = () => {
    const newPage = page - 1;
    if (newPage == 0) {
      return
    }
    setPage(newPage);
    requestApi.getByPagination(newPage, numItems)
      .then(r => r.json())
      .then((d) => {
        handleCommonResponse(d, setValues, setModal);
      })
      .catch(err => console.log(err));
  }

  // cuando el usuario cambia el conteo de los items
  const clickChangeCount = (e) => {
    const { value } = e.target;
    setNumItems(value);
    requestApi.getByPagination(page, value)
      .then(r => r.json())
      .then((d) => {
        handleCommonResponse(d, setValues, setModal);
      })
      .catch(err => console.log(err));

  }


  return {
    //state
    requests,
    count,
    page,
    numItems,

    // methods
    clickNextPage,
    clickBackPage,
    clickChangeCount
  }

}

export default StateListRequest;