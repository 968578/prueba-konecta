import { Link } from "react-router-dom"
import PlusI from "../../assets/icons/plus/plus-i"
import ListI from "../../assets/icons/list/list-i"

const BannerNav = ({ dataBaner }) => {

  if (dataBaner) {
    return (
      <div className="bg-zinc-200 py-2 rounded flex gap-x-5 pl-10">
        {
          dataBaner?.length && dataBaner.map((d, i) => {
            if (d.title == "Nuevo") {
              return (
                <Link key={i} to={d.link}>
                  <div className="duration-200 bg-slate-300 hover:bg-slate-200 flex gap-x-2 border border-slate-400 px-1 rounded h-10 items-center">
                    <p >{d.title}</p>
                    <PlusI />
                  </div>
                </Link>
              )
            } else if (d.title == "Lista") {
              return (
                <Link key={i} to={d.link}>
                  <div className="duration-200 bg-slate-300 hover:bg-slate-200 flex gap-x-2 border border-slate-400 px-1 rounded h-10 items-center">
                    <p  >{d.title}</p>
                    <ListI />
                  </div>
                </Link>
              )
            }
          }
          )
        }
      </div>
    )
  }
}
export default BannerNav;