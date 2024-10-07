
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import FormEmployeeComponent from "../modules/employee/components/form-employee-c/c-form-employee";
import ApiContext from "../global-state/api-context";


describe("Render Formulario Empleados", () => {
  afterEach(cleanup);

  it("Renderiza el formulario", async () => {
    render(
      <ApiContext.Provider value={{}}>
        <FormEmployeeComponent />
      </ApiContext.Provider>
    )
  });

  it("El formulario tiene input(2) 'name' y 'salary'", async () => {
    render(
      <ApiContext.Provider value={{}}>
        <FormEmployeeComponent />
      </ApiContext.Provider>
    )

    const inputs = screen.getAllByRole("textbox")
    expect(inputs.length).toBe(2)

  });

  it("El formulario tiene input(1) 'entry_date'", async () => {
    render(
      <ApiContext.Provider value={{}}>
        <FormEmployeeComponent />
      </ApiContext.Provider>
    )

    const inputDate = screen.getByTestId("entry_date");
    expect(inputDate).toBeDefined();
  });

  it("El formulario tiene input(2) 'password1' y 'password2'", async () => {
    render(
      <ApiContext.Provider value={{}}>
        <FormEmployeeComponent />
      </ApiContext.Provider>
    )

    const inputPassword1 = screen.getAllByTestId("password1")
    const inputPassword2 = screen.getAllByTestId("password2")

    expect(inputPassword1).toBeDefined()
    expect(inputPassword2).toBeDefined()
  });

  it("El formulario tiene 1 boton para agregar", async () => {
    render(
      <ApiContext.Provider value={{}}>
        <FormEmployeeComponent />
      </ApiContext.Provider>
    )

    const btnAdd = screen.getByRole("button");
    expect(btnAdd.innerText).toBe("Agregar")
  });

});
