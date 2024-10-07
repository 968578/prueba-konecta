import { useRef } from "react";
import BtnSecondary from "../simple-components/btn-secondary";

const ModalConfirmOperation = ({ text, action, setActive, active }) => {

  const c_modal = useRef();

  const desactiveModal = (e) => {
    if (!c_modal.current.contains(e.target)) {
      setActive(false);
    }
  };

  const clickNo = () => {
    setActive(false);
  };

  const clickYes = () => {
    action();
  };

  if (active) {
    return (
      <div onClick={desactiveModal} className="z-10 flex justify-center items-center fixed w-screen h-screen bg bg-[rgba(0,0,0,0.5)] top-0 left-0">
        <section ref={c_modal} className="w-[60%] h-[50%] bg-slate-100 rounded flex flex-col justify-center items-center">
          <p>{text}</p>
          <div className="flex gap-x-5 mt-2">
            <div onClick={clickYes}>
              <BtnSecondary color="green" value="Si" />
            </div>
            <div onClick={clickNo}>
              <BtnSecondary color="red" value="No" />
            </div>
          </div>


        </section>
      </div>
    )
  }

}

export default ModalConfirmOperation;