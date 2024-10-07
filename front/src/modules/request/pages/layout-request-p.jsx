import BannerNav from "../../../components-complemets/complex-components/banner-nav";
import Layout from "../../config-pages/layout-p";

const dataBannerRequest =[
  {
    title:"Nuevo",
    link: "/request/add"
  },
  {
    title:"Lista",
    link: "/request"
  },
]

const LayoutRequest = ({ children }) => {


  return (
    <Layout >
      <div className="border px-2">
        <section >
          <BannerNav dataBaner={dataBannerRequest} />
        </section>
        <section>
          {children}
        </section>
      </div>
    </Layout>
  )
}

export default LayoutRequest;