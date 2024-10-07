import Header from "../../components-complemets/complex-components/header";
import ModalShowOperation from "../../components-complemets/complex-components/modal-show-operation";

const Layout = ({ children }) => {
  return (
    <main>
      <Header />
      <ModalShowOperation />
      {children}
    </main>
  )
}

export default Layout;