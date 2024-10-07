const InpPrimary = ({ placeholder = "", name, register, type = "text", active = true }) => {

  if (name && register) {
    return (
      <input
        data-testid={name}
        {...register(name)}
        className={"border-b border-black focus:outline-none w-full " + (!active ? "border-dashed border-slate-300" : "")}
        type={type}
        placeholder={placeholder}
        disabled={!active}
      />
    )
  }
}

export default InpPrimary;