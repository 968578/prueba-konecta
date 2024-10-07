import BannerNav from "../../../components-complemets/complex-components/banner-nav";
import Layout from "../../config-pages/layout-p";


const dataBannerEmployee =[
  {
    title:"Nuevo",
    link: "/employee/add"
  },
  {
    title:"Lista",
    link: "/employee"
  },
]

const LayoutEmployee = ({ children }) => {

  return (
    <Layout >
      <div className=" px-2">
        <section >
          <BannerNav dataBaner={dataBannerEmployee} />
        </section>
        <section>
          {children}
        </section>
      </div>
    </Layout>
  )
}

export default LayoutEmployee;