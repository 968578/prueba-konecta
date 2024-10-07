import BtnPrimary from "../../../../components-complemets/simple-components/btn-primary";
import ErrorForm from "../../../../components-complemets/simple-components/error-form";
import InpPrimary from "../../../../components-complemets/simple-components/inp-primary";
import LblPrimary from "../../../../components-complemets/simple-components/lbl-primary";
import StateFormEmployee from "./state-form-employee";


const FormEmployeeComponent = () => {

  const {
    register,
    handleSubmit,
    submitEmployee,
    errors  
  } = StateFormEmployee();  


  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit(submitEmployee)}
        className="flex justify-center rounded shadow-lg border border-slate-200 w-[500px] mt-2 py-4"
      >
        <div className="w-80 grid gap-y-5">
          <h1 className="text-xl font-bold">Crear Empleado</h1>
          <div className="grid">
            <LblPrimary value="Nombre:" />
            <InpPrimary name="name" register={register} />
            <ErrorForm error={errors?.name?.message} />
          </div>
          <div className="grid">
            <LblPrimary value="Fecha ingreso:" />
            <InpPrimary type="date" name="entry_date" register={register} />
            <ErrorForm error={errors?.entry_date?.message} />
          </div>
          <div className="grid">
            <LblPrimary value="Salario:" />
            <InpPrimary name="salary" register={register} />
            <ErrorForm error={errors?.salary?.message} />
          </div>
          <div className="grid">
            <LblPrimary value="Contraseña:" />
            <InpPrimary type="password" name="password1" register={register} />
            <ErrorForm error={errors?.password1?.message} />
          </div>
          <div className="grid">
            <LblPrimary value="Confirmar contraseña:" />
            <InpPrimary type="password" name="password2" register={register} />
            <ErrorForm error={errors?.password2?.message} />
          </div>
          <div className="grid">
            <div className="flex gap-x-3">
              <LblPrimary value="Es Administrador:" />
              <input className="w-4" type="checkbox" {...register("is_admin")} />
            </div>
            <ErrorForm error={errors?.is_admin?.message} />
          </div>
          <BtnPrimary value="Agregar" />
        </div>
      </form>
    </div>
  )
}

export default FormEmployeeComponent;