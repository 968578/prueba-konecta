import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import errorsFormMap from "../../../../map-data/errors-form";
import { EmployeeApi } from "../../services/employee-service";
import ApiContext from "../../../../global-state/api-context";
import { handleCommonResponse } from "../../../../general-services/handler";
import { modalShowOperation } from "../../../../general-services/responses-map";
import { handleDuplicateResponse } from "../../../../general-services/handler";



const schema = yup.object().shape({
  name: yup.string()
    .required(errorsFormMap.required)
    .min(4, errorsFormMap.minLength(4)).max(50, errorsFormMap.maxLength(50)),
  entry_date: yup.string().required(errorsFormMap.required),
  salary: yup.number().typeError(errorsFormMap.mustBNumber).required(errorsFormMap.required),
  password1: yup.string().max(50, errorsFormMap.maxLength(50)),
  password2: yup.string().oneOf([yup.ref("password1")], "Deben ser iguales"),
  is_admin: yup.boolean()
});

const StateDetailsEmployee = () => {

  const { register, handleSubmit, formState: { errors, }, setError, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const employeeApi = new EmployeeApi();
  const [employee, setEmployee] = useState(null);
  const [activeEdit, setActiveEdit] = useState(false);
  const [activeDelete, setActiveDelete] = useState(false)
  const { setModal } = useContext(ApiContext);
  const params = useParams();
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  // setea los campos del formulario
  const loadData = (value) => {
    for (const key in value) {
      setValue(key, value[key]);
    }
    setEmployee(value);
  }

  // obtiene la data incial
  useEffect(() => {
    if (params?.id) {
      employeeApi.getById(params.id)
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
    employeeApi.updateById(params.id, dataInput)
      .then(res => res.json())
      .then(d => {
        handleDuplicateResponse(d, successUpdate, setError, setModal);
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
    navigate("/employee");
  }

  const clickDelete = () => {
    employeeApi.deleteById(params.id)
      .then(r => r.json())
      .then(d => {
        handleCommonResponse(d, successDelete, setModal);
      })
      .catch(err => console.log(err))
  }


  return {
    employee,
    register,
    handleSubmit,
    clickUpdate,
    errors,
    activeEdit,
    setActiveEdit,
    activeDelete,
    setActiveDelete,
    clickDelete,


  }
}

export default StateDetailsEmployee;