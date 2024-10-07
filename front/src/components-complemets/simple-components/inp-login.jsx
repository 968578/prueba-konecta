const InpLogin = ({ placeholder, type, name, register }) => {
  return (
    <input 
      {...register(name)}
      className="border-none focus:outline-none w-full " 
      type={type} placeholder={placeholder} 
    />
  )
}

export default InpLogin;