
import BtnPrimary from "../../../../components-complemets/simple-components/btn-primary";
import ErrorForm from "../../../../components-complemets/simple-components/error-form";
import InpPrimary from "../../../../components-complemets/simple-components/inp-primary";
import LblPrimary from "../../../../components-complemets/simple-components/lbl-primary";
import StateFormRequest from "./state-form-request";


const FormRequestComponent = () => {
  const {  
    register,  
    handleSubmit,  
    errors, 
    submitRequest
  } = StateFormRequest();    

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit(submitRequest)}
        className="flex justify-center rounded shadow-lg border border-slate-200 w-[500px] mt-2 py-4"
      >
        <div className="w-80 grid gap-y-5">
          <h1 className="text-xl font-bold">Crear Solicitud</h1>
          <div className="grid">
            <LblPrimary value="Código:" />
            <InpPrimary name="code" register={register} />
            <ErrorForm error={errors?.code?.message} />
          </div>
          <div className="grid">  
            <LblPrimary value="Descripción:" />
            <InpPrimary type="text" name="description" register={register} /> 
            <ErrorForm error={errors?.description?.message} />
          </div>      
          <div className="grid">  
            <LblPrimary value="Resumen:" />
            <InpPrimary name="summary" register={register} />
            <ErrorForm error={errors?.summary?.message} />
          </div>
          <BtnPrimary value="Agregar" />  
        </div>
      </form>
    </div>
  )

}

export default FormRequestComponent;