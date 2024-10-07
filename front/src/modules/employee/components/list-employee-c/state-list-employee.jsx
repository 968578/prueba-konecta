import { useContext, useEffect, useState } from "react";
import { EmployeeApi } from "../../services/employee-service";
import ApiContext from "../../../../global-state/api-context";
import { handleCommonResponse } from "../../../../general-services/handler";


const StateListEmployee = () => {

  const employeeApi = new EmployeeApi();
  // usamos el contexto como mantener los empleados en el estado global
  const {employees, setEmployees} = useContext(ApiContext);
  
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [numItems, setNumItems] = useState(10);
  
  const { setModal } = useContext(ApiContext);

  const setValues = (d) => {
    setEmployees(d.data)
    setCount(d.count)
  }

  // trae la data inicial de la tabla
  useEffect(() => {
    employeeApi.getByPagination(page, numItems)
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
    employeeApi.getByPagination(newPage, numItems)
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
    employeeApi.getByPagination(newPage, numItems)
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
    employeeApi.getByPagination(page, value)
      .then(r => r.json())
      .then((d) => {
        handleCommonResponse(d, setValues, setModal);
      })
      .catch(err => console.log(err));

  }


  return {
    //state
    employees,
    count,
    page,
    numItems,

    // methods
    clickNextPage,
    clickBackPage,
    clickChangeCount
  }

}

export default StateListEmployee;