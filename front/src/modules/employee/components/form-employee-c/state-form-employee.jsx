import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { EmployeeApi } from "../../services/employee-service";
import errorsFormMap from "../../../../map-data/errors-form";
import ApiContext from "../../../../global-state/api-context";
import { handleDuplicateResponse } from "../../../../general-services/handler";
import { modalShowOperation } from "../../../../general-services/responses-map";

const schema = yup.object().shape({
  name: yup.string()
    .required(errorsFormMap.required)
    .min(4, errorsFormMap.minLength(4)).max(50, errorsFormMap.maxLength(50)),  
  entry_date: yup.string().required(errorsFormMap.required),
  salary: yup.number().typeError(errorsFormMap.mustBNumber).required(errorsFormMap.required),
  password1: yup.string()
    .required(errorsFormMap.required)
    .min(4, errorsFormMap.minLength(4)).max(50, errorsFormMap.maxLength(50)),
  password2: yup.string().oneOf([yup.ref("password1")], "Deben ser iguales"),
  is_admin: yup.boolean()
});


const StateFormEmployee = () => {

  const { register, handleSubmit, formState: { errors, }, setError, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { setModal } = useContext(ApiContext);

  // limpia el formulario
  const clearForm = () => {
    setValue("name", "");
    setValue("entry_date", "");
    setValue("salary", "");
    setValue("password1", "");
    setValue("password2", "");
    setValue("is_admin", false);
    // manda el modal a mostrar
    setModal({
      title: modalShowOperation.createSuccessfull,
      success: true,
      show: true
    });

  }

  const submitEmployee = (dataEmployee) => {
    const employeeApi = new EmployeeApi();

    employeeApi.save(dataEmployee)
      .then(r => r.json())
      .then(d => {
        handleDuplicateResponse(d, clearForm, setError, setModal)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return {
    register,
    handleSubmit,
    submitEmployee,
    errors
  }
}

export default StateFormEmployee;