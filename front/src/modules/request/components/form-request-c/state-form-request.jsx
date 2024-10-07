import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import errorsFormMap from "../../../../map-data/errors-form";
import { useContext } from "react";
import ApiContext from "../../../../global-state/api-context";
import { modalShowOperation } from "../../../../general-services/responses-map";
import { RequestApi } from "../../services/request-service";
import { handleDuplicateResponse } from "../../../../general-services/handler";

const schema = yup.object().shape({
  code: yup.string()
    .required(errorsFormMap.required)
    .min(2, errorsFormMap.minLength(2)).max(50, errorsFormMap.maxLength(50)),
  description: yup.string()
    .required(errorsFormMap.required)
    .min(4, errorsFormMap.minLength(4)).max(50, errorsFormMap.maxLength(50)),
  summary: yup.string().max(50, errorsFormMap.maxLength(50)),
});

const StateFormRequest = () => {
  const { register, handleSubmit, formState: { errors, }, setError, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { setModal } = useContext(ApiContext);

  // limpia el formulario
  const clearForm = () => {
    setValue("code", "");
    setValue("description", "");
    setValue("summary", "");
    // manda el modal a mostrar
    setModal({
      title: modalShowOperation.createSuccessfull,
      success: true,
      show: true
    });

  }

  const submitRequest = (dataRequest) => {
    const requestApi = new RequestApi();

    requestApi.save(dataRequest)
      .then(r => r.json())
      .then(d => {
        handleDuplicateResponse(d, clearForm, setError, setModal)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {
    register,
    handleSubmit,
    submitRequest,
    errors,
  }

}

export default StateFormRequest;
