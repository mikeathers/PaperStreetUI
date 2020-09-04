import { AxiosResponse } from "axios";
import { Agent } from "api";

const responseBody = (response: AxiosResponse) => response;

export default class Requests {
  Agent: Agent;
  constructor(microservice: string) {
    this.Agent = new Agent(microservice);
  }

  get = (url: string) => {
    return this.Agent.get(url, responseBody);
  };

  post = (url: string, body: Object) => {
    return this.Agent.post(url, body, responseBody);
  };

  put = (url: string, body: Object) => {
    return this.Agent.post(url, body, responseBody);
  };

  patch = (url: string, body: Object) => {
    return this.Agent.post(url, body, responseBody);
  };

  del = (url: string) => {
    return this.Agent.del(url, responseBody);
  };

  // get(url: string) => _Agent.get(url).then(responseBody),
  // post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  // put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  // del: (url: string) => axios.delete(url).then(responseBody),
  // postForm: async (url: string, file: Blob) => {
  //   let formData = new FormData();
  //   formData.append("File", file);
  //   const response = await axios.post(url, formData, {
  //     headers: { "Content-type": "multipart/form-data" },
  //   });
  //   return responseBody(response);
  // },
}
