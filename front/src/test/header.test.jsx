
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom"

import Header from "../components-complemets/complex-components/header";

describe("Render Header", () => {
  afterEach(cleanup);

  it("Debe renderizar el header", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

  });

  it("El header tiene boton 'Solictudes' y 'Empleados' ", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const btnRequest = screen.getByText("Solicitudes")
    const btnEmployee = screen.getByText("Empleados")

    expect(btnRequest).toBeDefined()
    expect(btnEmployee).toBeDefined()
  });

});
