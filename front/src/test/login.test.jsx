
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom"

import LoginPage from "../modules/config-pages/login-p";

describe("Render Login", () => {
  afterEach(cleanup);

  it("Debe renderizar los inputs del login", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText("Nombre...")).toBeDefined();
    expect(screen.getByPlaceholderText("Contraseña...")).toBeDefined();
  });

  it("Al dar click en ingresar muestra aviso 'Es requerido'", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )
    const btnLogin = screen.getByRole("button")
    fireEvent.click(btnLogin);

    await waitFor(() => {
      const isRequired = screen.getAllByText("Es requerido");
      expect(isRequired).toBeDefined();
    })
  });

});
