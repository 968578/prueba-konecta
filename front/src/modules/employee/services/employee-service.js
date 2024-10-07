import { ApiService } from "../../../general-services/api-service";

export class EmployeeApi extends ApiService {

  constructor() {
    super(import.meta.env.VITE_API_URL_EMPLOYEE)
  }

  // creamos el metodo de login
  login(inputLogin) {
    return fetch(`${this.apiUrl}/login`, {
      mode: "cors",  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputLogin)
    });
  }
}