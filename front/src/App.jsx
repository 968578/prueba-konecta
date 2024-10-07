import { Routes, Route } from "react-router-dom";

// paginas
import LoginPage from "./modules/config-pages/login-p";
import ListRequestPage from "./modules/request/pages/list-request-p";
import FormRequestPage from "./modules/request/pages/form-request-p";
import DetailsRequestPage from "./modules/request/pages/details-request-p";
import ListEmployeePage from "./modules/employee/pages/list-empleoyee-p";
import FormEmployeePage from "./modules/employee/pages/form-employee-p";
import DetailsEmployeePage from "./modules/employee/pages/details-employee-p";

// estado global
import StateContext from "./global-state/state-context";
import ApiContext from "./global-state/api-context";



function App() {
  const {
    setEmployees,
    employees,
    setRequests,
    requests,
    modal,
    setModal
  }
    = StateContext();


  return (
    <ApiContext.Provider value={{ modal, setModal, employees, setEmployees, requests, setRequests }}>
      <main>
        <Routes >
          <Route path='/' element={<LoginPage />} />

          {/* rutas de pedidos  */}
          <Route path='/request' element={<ListRequestPage />} />
          <Route path='/request/add' element={<FormRequestPage />} />
          <Route path='/request/:id' element={<DetailsRequestPage />} />

          {/* rutas de empleados  */}
          <Route path='/employee' element={<ListEmployeePage />} />
          <Route path='/employee/add' element={<FormEmployeePage />} />
          <Route path='/employee/:id' element={<DetailsEmployeePage />} />

          {/* Ruta por defecto */}
          <Route path='*' element={<ListRequestPage />} />
        </Routes>
      </main>
    </ApiContext.Provider>
  )
}

export default App
