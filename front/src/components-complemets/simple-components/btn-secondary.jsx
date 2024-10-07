const BtnSecondary = ({ value, type = "button", color }) => {

  if (color) {
    return (
      <button
        className={`w-10 border bg-${color}-200 p-1 rounded w-full hover:bg-${color}-300 duration-200 mt-5"`}
        type={type}
      >{value}</button>
    )
  }
}

export default BtnSecondary;