import CheckI from "../../../../assets/icons/check-i/check-i";
import PencilI from "../../../../assets/icons/pencil-i/pencil-i";
import TrashI from "../../../../assets/icons/trash-i/trash-i";
import ModalConfirmOperation from "../../../../components-complemets/complex-components/modal-confirm-operation";
import BtnPrimary from "../../../../components-complemets/simple-components/btn-primary";
import ErrorForm from "../../../../components-complemets/simple-components/error-form";
import InpPrimary from "../../../../components-complemets/simple-components/inp-primary";
import LblPrimary from "../../../../components-complemets/simple-components/lbl-primary";
import StateDetailsRequest from "./state-details-request";


const DetailsRequestComponent = () => {
  const {
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
    clickRevolve,
  } = StateDetailsRequest();


  return (
    <div className="flex justify-center items-center">
      <ModalConfirmOperation
        active={activeDelete}
        setActive={setActiveDelete}
        action={clickDelete}
        text={`¿Quieres eliminar la solicitud ${request?.code} ?`}
      />
      <ModalConfirmOperation
        active={activeResolve}
        setActive={setActiveResolve}
        action={clickRevolve}
        text={`¿Marcar la solcitud ${request?.code} como "Resuelta"?`}
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
              {      
                !request?.done ?
                  <div title="Resolver" onClick={() => setActiveResolve(true)}
                    className="cursor-pointer rounded-md hover:bg-green-300 flex items-center justify-center bg-green-200 w-8 h-8">
                    <CheckI />
                  </div>
                  :
                  <div className="bg-gray-500 rounded-xl w-5 h-5"></div>
              }
            </div>
          </div>
          <div className="grid">
            <LblPrimary value="Código:" />
            <InpPrimary name="code" register={register} active={activeEdit} />
            <ErrorForm error={errors?.code?.message} />
          </div>
          <div className="grid">
            <LblPrimary value="Descripción:" />
            <InpPrimary type="text" name="description" register={register} active={activeEdit} />
            <ErrorForm error={errors?.description?.message} />
          </div>
          <div className="grid">
            <LblPrimary value="Resumen:" />
            <InpPrimary name="summary" register={register} active={activeEdit} />
            <ErrorForm error={errors?.summary?.message} />
          </div>
          {
            activeEdit &&
            <BtnPrimary value="Agregar" />
          }
        </div>
      </form>
    </div>
  )

}

export default DetailsRequestComponent;
