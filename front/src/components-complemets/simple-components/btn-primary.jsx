const BtnPrimary = ({ value, type = "submit" }) => {
  return (
    <button
      className="border border-slate-400 p-1 rounded w-full hover:bg-blue-300 duration-200 mt-5"
      type={type}
    >{value}</button>
  )
}

export default BtnPrimary;