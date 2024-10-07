
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import ApiContext from "../global-state/api-context";
import FormRequestComponent from "../modules/request/components/form-request-c/c-form-request";


describe("Render Formulario Solicitudes", () => {
  afterEach(cleanup);

  it("Renderiza el formulario", async () => {
    render(
      <ApiContext.Provider value={{}}>
        <FormRequestComponent />
      </ApiContext.Provider>
    )
  });

  it("El formulario tiene input 'code' ", async () => {
    render(
      <ApiContext.Provider value={{}}>
        <FormRequestComponent />
      </ApiContext.Provider>
    )

    const inputCode = screen.getByTestId("code");
    expect(inputCode).toBeDefined();

  });

  it("El formulario tiene input 'description' ", async () => {
    render(
      <ApiContext.Provider value={{}}>
        <FormRequestComponent />
      </ApiContext.Provider>
    )

    const inputDescription = screen.getByTestId("description");
    expect(inputDescription).toBeDefined();

  });

  it("El formulario tiene input 'summary' ", async () => {
    render(
      <ApiContext.Provider value={{}}>
        <FormRequestComponent />
      </ApiContext.Provider>
    )

    const inputSummary = screen.getByTestId("summary");
    expect(inputSummary).toBeDefined();

  });

  it("El formulario tiene 1 boton para agregar", async () => {
    render(
      <ApiContext.Provider value={{}}>
        <FormRequestComponent />
      </ApiContext.Provider>
    )

    const btnAdd = screen.getByRole("button");
    expect(btnAdd.innerText).toBe("Agregar")
  });

});
