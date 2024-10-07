import PencilI from "../../../../assets/icons/pencil-i/pencil-i";
import TrashI from "../../../../assets/icons/trash-i/trash-i";
import ModalConfirmOperation from "../../../../components-complemets/complex-components/modal-confirm-operation";
import BtnPrimary from "../../../../components-complemets/simple-components/btn-primary";
import ErrorForm from "../../../../components-complemets/simple-components/error-form";
import InpPrimary from "../../../../components-complemets/simple-components/inp-primary";
import LblPrimary from "../../../../components-complemets/simple-components/lbl-primary";
import StateDetailsEmployee from "./state-details-employee";

const DetailsEmployeeComponent = () => {
  const {
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
  } = StateDetailsEmployee();


  return (
    <div className="flex justify-center items-center">
      <ModalConfirmOperation
        active={activeDelete}
        setActive={setActiveDelete}
        action={clickDelete}
        text={`¿Quieres eliminar el usuario ${employee?.name} ?`}
      />
      <form onSubmit={handleSubmit(clickUpdate)}
        className="flex justify-center rounded shadow-lg border border-slate-200 w-[500px] mt-2 py-4"
      >
        <div className="w-80 grid gap-y-5">
          <div>
            <div className="flex justify-center items-center gap-x-2">
              <div title="Editar" onClick={() => setActiveEdit(!activeEdit)}
                className={"cursor-pointer rounded-md hover:bg-blue-300 flex items-center justify-center w-8 h-8 " + (activeEdit ? "bg-blue-300 scale-110" : "bg-blue-200")}>
                <PencilI />
              </div>
              <div title="Eliminar" onClick={() => setActiveDelete(true)}
                className="cursor-pointer rounded-md hover:bg-red-300 flex items-center justify-center bg-red-200 w-8 h-8">
                <TrashI />
              </div>
            </div>
          </div>
          <div className="grid">
            <LblPrimary value="Nombre:" />
            <InpPrimary name="name" register={register} active={activeEdit} />
            <ErrorForm error={errors?.name?.message} />
          </div>
          <div className="grid">
            <LblPrimary value="Fecha ingreso:" />
            <InpPrimary type="date" name="entry_date" register={register} active={activeEdit} />
            <ErrorForm error={errors?.entry_date?.message} />
          </div>
          <div className="grid">
            <LblPrimary value="Salario:" />
            <InpPrimary name="salary" register={register} active={activeEdit} />
            <ErrorForm error={errors?.salary?.message} />
          </div>
          <div className="grid">
            <p className="text-blue-800 underline">Si no quieres cambiar la contraseña deja el espacio en blanco</p>
            <LblPrimary value="Contraseña:" />
            <InpPrimary type="password" name="password1" register={register} active={activeEdit} />
            <ErrorForm error={errors?.password1?.message} />
          </div>
          <div className="grid">
            <LblPrimary value="Confirmar contraseña:" />
            <InpPrimary type="password" name="password2" register={register} active={activeEdit} />
            <ErrorForm error={errors?.password2?.message} />
          </div>
          <div className="grid">
            <div className="flex gap-x-3">
              <LblPrimary value="Es Administrador:" />
              <input disabled={!activeEdit} className={"w-4 " + (!activeEdit ? "border-dashed border-slate-300" : "")} type="checkbox" {...register("is_admin")} />
            </div>
            <ErrorForm error={errors?.is_admin?.message} />
          </div>
          {
            activeEdit &&
            <BtnPrimary value="Actualizar" />
          }
        </div>
      </form>
    </div>
  )
};

export default DetailsEmployeeComponent;