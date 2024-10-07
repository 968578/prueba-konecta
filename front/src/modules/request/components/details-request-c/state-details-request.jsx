import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RequestApi } from "../../services/request-service";
import errorsFormMap from "../../../../map-data/errors-form";
import ApiContext from "../../../../global-state/api-context";
import { modalShowOperation } from "../../../../general-services/responses-map";
import { handleCommonResponse } from "../../../../general-services/handler";



const schema = yup.object().shape({
  code: yup.string()
    .required(errorsFormMap.required)
    .min(2, errorsFormMap.minLength(2)).max(50, errorsFormMap.maxLength(50)),
  description: yup.string()
    .required(errorsFormMap.required)
    .min(4, errorsFormMap.minLength(4)).max(50, errorsFormMap.maxLength(50)),
  summary: yup.string().max(50, errorsFormMap.maxLength(50)),
});

const StateDetailsRequest = () => {

  const { register, handleSubmit, formState: { errors, }, setError, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const requestApi = new RequestApi();
  const [request, setRequest] = useState(null);
  const [activeEdit, setActiveEdit] = useState(false);
  const [activeDelete, setActiveDelete] = useState(false)
  const [activeResolve, setActiveResolve] = useState(false)
  const { setModal } = useContext(ApiContext);
  const params = useParams();
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  // setea los campos del formulario
  const loadData = (value) => {
    for (const key in value) {
      setValue(key, value[key]);
    }
    setRequest(value);
  }

  // obtiene la data incial
  useEffect(() => {
    if (params?.id) {
      requestApi.getById(params.id)
        .then(r => r.json())
        .then(d => {
          handleCommonResponse(d, loadData, setModal)
        })
        .catch(err => console.log(err))
    }
  }, [reload]);


  const successUpdate = () => {
    setModal({
      success: true,
      title: modalShowOperation.updateSuccessfull,
      show: true
    });
    setActiveEdit(false);
    setReload(!reload)
  }


  const clickUpdate = (dataInput) => {
    requestApi.updateById(params.id, dataInput)
      .then(res => res.json())
      .then(d => {
        handleCommonResponse(d, successUpdate, setModal);
      })
      .catch(err => console.log(err))
  }

  const successDelete = () => {
    setActiveDelete(false);
    setModal({
      success: true,
      title: modalShowOperation.deleteSuccessfull,
      show: true
    });
    navigate("/request");
  }

  const clickDelete = () => {
    requestApi.deleteById(params.id)
      .then(r => r.json())
      .then(d => {
        handleCommonResponse(d, successDelete, setModal);
      })
      .catch(err => console.log(err))
  }

  const successfullResolved = () => {
    setActiveResolve(false);
    setModal({
      success: true,
      title: modalShowOperation.requestResolve,
      show: true
    });
    setReload(!reload);
  }

  const clickRevolve = () => {
    requestApi.markResolved(params.id)
      .then(r => r.json())
      .then(d => {
        handleCommonResponse(d, successfullResolved, setModal);
      })
      .catch(err => console.log(err));

  }


  return {
    request,
    register,
    handleSubmit,
    clickUpdate,
    errors,
    activeEdit,
    setActiveEdit,
    activeDelete,
    setActiveDelete,
    clickDelete,
    activeResolve,
    setActiveResolve,
    clickRevolve
  }
}

export default StateDetailsRequest;