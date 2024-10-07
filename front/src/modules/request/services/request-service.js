import { ApiService } from "../../../general-services/api-service";

export class RequestApi extends ApiService {

  constructor() {
    super(import.meta.env.VITE_API_URL_REQUEST)
  }

  markResolved = (id) => {
    return fetch(`${this.apiUrl}/close/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: this.getHeaders(),
    });
  }
}