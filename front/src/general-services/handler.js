import { closeSession } from "../components-complemets/complex-components/header";
import { errorResponsesMap, modalShowOperation } from "./responses-map";


// maneja los errores comunes de respuesta del backend
export const handleErrorResponse = (d, setModal) => {
  console.log("hola")
  console.log(d)
  // mostrar error en pantalla por el estado global
  if (d.message == errorResponsesMap.unauthorized) {
    console.log("aqui error")
    console.log("setModal->")
    console.log(setModal)
    setModal({
      title: modalShowOperation.unauthorized,
      success: false,
      show: true
    });
    console.log("Despues de todo")
  } else if ([errorResponsesMap.tokenMissing, errorResponsesMap.tokenInvalid].includes(d.message)) {
    // si no tiene el token cierra la session
    closeSession();
  } else {
    setModal({
      title: modalShowOperation.error,
      success: false,
      show: true
    });
  }
}

// maneador de respuestas del backend cuando es ok
export const handleCommonResponse = (d, cbSuccess = null, setModal) => {
  if (d.name == "ok") {
    // si hay un callback que lo ejecute
    if (cbSuccess) {
      cbSuccess(d.value);
    }
  } else {
    handleErrorResponse(d, setModal);
  }

}

// maneja las respuesta del back end cuando es un registro que tiene campos unicos
export const handleDuplicateResponse = (d, cbSuccess = null, setError, setModal) => {
  const duplicate = d.message.split(":")?.[0] || null;
  const field = d.message.split(":")?.[1] || null;
  if (d.name == errorResponsesMap.conflict && duplicate == errorResponsesMap.duplicate) {
    if (field) {
      setError(field, { message: "Ya existe" });
    }
  }
  else {
    handleCommonResponse(d, cbSuccess, setModal)
  }
}


