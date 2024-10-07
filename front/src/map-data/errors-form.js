const errorsFormMap = {
  required: "Es requerido",
  mustBNumber: "Debe ser un nùmero",
  minLength: (num) =>{
    return `Mínimo ${num} caracteres`
  },
  maxLength: (num) =>{
    return `Máximo ${num} caracteres`
  }
}

export default errorsFormMap;