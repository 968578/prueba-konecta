export class ApiService {

  apiUrl;

  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  getHeaders() {
    const headers = new Headers()
    const token = localStorage.getItem("konecta_token");
    headers.append("authorization", token);
    headers.append("Content-Type", "application/json");
    return headers;
  }

  save(dataInput) {
    return fetch(this.apiUrl, {
      method: "POST",
      mode: "cors",
      headers: this.getHeaders(),
      body: JSON.stringify(dataInput)
    });
  }

  getByPagination(page, numItems) {
    return fetch(`${this.apiUrl}/${page}/${numItems}`, {
      method: "GET",
      mode: "cors",
      headers: this.getHeaders(),
    });
  }


  getById(id) {
    return fetch(`${this.apiUrl}/${id}`, {
      method: "GET",
      mode: "cors",
      headers: this.getHeaders(),
    });
  }

  updateById(id, dataInput) {
    return fetch(`${this.apiUrl}/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: this.getHeaders(),
      body: JSON.stringify(dataInput)
    });

  }

  deleteById(id) {
    return fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: this.getHeaders(),
    });
  }


}