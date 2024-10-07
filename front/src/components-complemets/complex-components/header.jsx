import { useEffect, useState } from "react";
import logoKonecta from "../../assets/icons/konecta/logo-konecta.png";
import { Link, useNavigate } from "react-router-dom";
import OffI from "../../assets/icons/off-i/off-i";

export const closeSession = () => {
  localStorage.removeItem("konecta_token");
  localStorage.removeItem("konecta_user");
  window.location.href = "/";
}


const Header = () => {

  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    const dataUser = localStorage.getItem("konecta_user") || null;
    if (dataUser) {
      setUserLogged(JSON.parse(dataUser));
    } else {
      closeSession();
    }
  }, []);

  const logOut = () => {
    closeSession();
  }


  return (
    <nav className="flex py-5 border justify-between bg-slate-300 shadow-lg">
      <img className="h-10 ml-5" src={logoKonecta} alt="" />
      <section className="flex justify-center items-center gap-x-5" >
        <Link to="/request">
          <p className="p-2 rounded bg-blue-300 hover:bg-blue-200 duration-200 cursor-pointer">Solicitudes</p>
        </Link>
        <Link to="/employee">
          <p className="p-2 rounded bg-blue-300 hover:bg-blue-200 duration-200 cursor-pointer">Empleados</p>
        </Link>
      </section>
      <section className="mr-5 flex justify-center center gap-x-3">
        <p className="underline font-bold">{userLogged?.name}</p>
        <div onClick={logOut} className="cursor-pointer bg-red-200 hover:bg-red-400 duration-200 w-8 h-8 rounded-lg flex justify-center items-center">
          <OffI />
        </div>
      </section>

    </nav>
  )
}

export default Header;
