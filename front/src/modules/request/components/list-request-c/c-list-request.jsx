import { Link } from "react-router-dom";
import ArrowLI from "../../../../assets/icons/arrow-l-i/arrow-l-i";
import ArrowRI from "../../../../assets/icons/arrow-r-i/arrow-r-i";
import StateListRequest from "./state-list-request";

const ListRequestComponent = () => {

  const {
    //state
    requests,
    count,
    page,
    numItems,

    // methods
    clickNextPage,
    clickBackPage,
    clickChangeCount
  } = StateListRequest();

  
  return (
    <div className="border ">
      <h1 className="text-xl font-bold">Solicitudes</h1>
      <section className="p-5">
        <table className="w-full shadow-lg rounded-lg">
          <thead className="w-full">
            <tr className="bg-slate-300 ">
              <td colSpan={5}>
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
              <th >Código</th>
              <th>Descripción</th>
              <th>Resumen</th>
              <th>Solicitante</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="border">
            {
              requests?.length > 0 && requests.map(rq =>
                <tr key={rq.id} className="border-b border-slate-200">
                  <td className="text-center hover:text-sky-500">
                    <Link to={`/request/${rq.id}`}>
                      {rq.code}
                    </Link>
                  </td>
                  <td className="text-center">{rq.description}</td>
                  <td className="text-center">{rq.summary}</td>
                  <td className="text-center">{rq.employee}</td>  
                  <td className="text-center">{rq.done ?
                    <div className="bg-gray-500 rounded-xl w-6 h-6"></div>
                    :
                    <div className="bg-green-500 rounded-xl w-6 h-6"></div>
                  }</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default ListRequestComponent;