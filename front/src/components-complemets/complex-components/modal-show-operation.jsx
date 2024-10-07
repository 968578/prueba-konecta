import { useContext, useEffect } from "react";
import ApiContext from "../../global-state/api-context";

const ModalShowOperation = () => {

  const { modal, setModal } = useContext(ApiContext);

  // cierra el modal cuando dan click en la "X"
  const clickClose = () => {
    setModal({
      ...modal,
      show: false,
    });
  }

  // limpia el modal despues de 5 sec
  useEffect(() => {
    setTimeout(() => {
      if (modal.show) {
        clickClose();
      }
    }, 7000)
  }, [modal.show])

  console.log("modal--z")
  console.log(modal)
  return (
    <div
      className={"z-20 fixed text-white p-2 flex justify-center items-center gap-x-3 duration-300 rounded right-10 -top-12 " +
        (modal.success == true ? " bg-zinc-500 " : "bg-red-500 ") + (modal.show ? "translate-y-24" : "")}>
      <p>{modal.title}</p>
      <p onClick={clickClose} className="cursor-pointer text-lg font-bold ">X</p>
    </div>
  )


}

export default ModalShowOperation;