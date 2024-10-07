import { Link } from "react-router-dom";
import StateListEmployee from "./state-list-employee";
import ArrowLI from "../../../../assets/icons/arrow-l-i/arrow-l-i";
import ArrowRI from "../../../../assets/icons/arrow-r-i/arrow-r-i";

const ListEmployeeComponent = () => {

  const {
    //state
    employees,
    count,
    page,
    numItems,

    // methods
    clickNextPage,
    clickBackPage,
    clickChangeCount
  } = StateListEmployee();


  return (
    <div className="border ">
      <h1 className="text-xl font-bold">Empleados</h1>
      <section className="p-5">
        <table className="w-full shadow-lg rounded-lg">
          <thead className="w-full">
            <tr className="bg-slate-300 ">
              <td colSpan={4}>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div onClick={clickBackPage} className="cursor-pointer">
                      <ArrowLI />
                    </div>
                    <p>
                      ( {(page * numItems) - numItems + 1} - {(count < page * numItems ? count : page * numItems)}  de {count})
                    </p>
                    <div onClick={clickNextPage} className="cursor-pointer">
                      <ArrowRI />
                    </div>
                  </div>
                  <div className="w-36 ml-5">
                    <select onChange={clickChangeCount} className="rounded text-lg w-full border-b border-slate-400 focus:outline-none" name="" id="">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="500">500</option>
                    </select>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border bg-slate-100  border-l border-r">
              <th >Nombre</th>
              <th>Fecha Ingreso</th>
              <th>Salario</th>
              <th>Es Admin</th>
            </tr>
          </thead>
          <tbody className="border">
            {
              employees?.length > 0 && employees.map(em =>
                <tr key={em.id} className="border-b border-slate-200">
                  <td className="text-center hover:text-sky-500">
                    <Link to={`/employee/${em.id}`}>
                      {em.name}
                    </Link>
                  </td>
                  <td className="text-center">{em.entry_date}</td>
                  <td className="text-center">{em.salary}</td>
                  <td className="text-center">{em.is_admin ? "Si" : "No"}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default ListEmployeeComponent;