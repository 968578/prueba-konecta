
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom"
import BannerNav from "../components-complemets/complex-components/banner-nav";

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


describe("Render Banner", () => {
  afterEach(cleanup);

  it("Debe renderizar el Banner", async () => {
    render(
      <MemoryRouter>
        <BannerNav dataBaner={dataBannerRequest} />
      </MemoryRouter>
    )

  });

  it("El banner tiene botones 'Nuevo' y 'List' ", async () => {
    render(
      <MemoryRouter>
        <BannerNav dataBaner={dataBannerRequest} />
      </MemoryRouter>
    )

    const btnNew = screen.getByText("Nuevo")
    const btnList = screen.getByText("Lista")

    expect(btnNew).toBeDefined()
    expect(btnList).toBeDefined()
  });

});
