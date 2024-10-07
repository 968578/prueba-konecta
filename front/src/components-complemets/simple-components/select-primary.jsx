// queda pendiente para cuando retomemos el filtro
const SelectPrimary = ({ name, register, type = "text", active = true }) => {

  if (name && register) {
    return (
      <input
        {...register(name)}
        className={"border-b border-black focus:outline-none w-full " + (!active ? "border-dashed border-slate-300" : "")}
        type={type}
        disabled={!active}
      />
    )
  }
}

export default SelectPrimary;