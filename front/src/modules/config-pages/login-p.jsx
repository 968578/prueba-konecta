
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UserI from "../../assets/icons/user/user-i";
import InpLogin from "../../components-complemets/simple-components/inp-login";
import ErrorForm from "../../components-complemets/simple-components/error-form";
import KeyI from "../../assets/icons/key/key-i";
import BtnPrimary from "../../components-complemets/simple-components/btn-primary";
import { handleCommonResponse } from "../../general-services/handler";
import errorsFormMap from "../../map-data/errors-form";
import { useNavigate } from "react-router-dom";
import logoKonecta from "../../assets/icons/konecta/logo-konecta.png"
import { EmployeeApi } from "../employee/services/employee-service";

const errorsMap = {
  notFound: "not found employee",
  incorrentPass: "Inconrrect password",
}

const schema = yup.object().shape({
  name: yup.string().required(errorsFormMap.required),
  password: yup.string().required(errorsFormMap.required),
});

const LoginPage = () => {  

  const { register, handleSubmit, formState: { errors, }, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // si la autenticación es correcta
  const loginSuccess = (value) => {

    const { access_token, name, id } = value;
    const employee = { name, id }

    // guardo la data en el storage
    localStorage.setItem("konecta_token", access_token);
    localStorage.setItem("konecta_user", JSON.stringify(employee));

    // navego al home
    navigate("/request");
  }

  // si la api responde errores desde el login
  const loginFail = (d) => {
    if (d.message === errorsMap.notFound) {
      setError("name", { message: "Usuario no existe" });
    } else if (d.message === errorsMap.incorrentPass) {
      setError("password", { message: "Contraseña incorrecta" });
    }
  }

  const submitLogin = (data) => {

    const employeeApi = new EmployeeApi();

    employeeApi.login(data)
      .then(r => r.json())
      .then((d) => {
        if(d.name == "ok"){
          handleCommonResponse(d, loginSuccess);
        } else {
          loginFail(d);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }



  return (
    <div className="h-screen flex items-center justify-center" >
      <section className="border shadow-lg p-5">
        <img className="h-10" src={logoKonecta} alt="" />
        <form
          onSubmit={handleSubmit(submitLogin)}
          className="w-80 mt-5"
        >
          <div >
            <div className=" flex gap-x-1 border-b ">
              <UserI />
              <InpLogin register={register} name="name" type="text" placeholder="Nombre..." />
            </div>
            <ErrorForm error={errors?.name?.message} />
          </div>
          <div className="mt-5" >
            <div className="flex gap-x-1 border-b">
              <KeyI />
              <InpLogin register={register} name="password" type="password" placeholder="Contraseña..." />
            </div>
            <ErrorForm error={errors?.password?.message} />
          </div>
          <BtnPrimary value="Ingresar" />
        </form>
      </section>
    </div>
  )
}

export default LoginPage;
