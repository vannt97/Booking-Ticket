import { DOMAIN, TOKEN } from "../util/SystemSetting/SystemSetting";
import Axios from "axios";
class BaseService {
  get = (url) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "GET",
    });
  };
  getAuthorization = (url) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem(TOKEN)),
      },
    });
  };
  post = (url, value) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "POST",
      data: value,
    });
  };
  postAuthorization = (url, value) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "POST",
      data: value,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem(TOKEN)),
      },
    });
  };
  postAuthorizationNotValue = (url) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "POST",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem(TOKEN)),
      },
    });
  };
  delete(url) {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem(TOKEN)),
      },
    });
  }

  put(url, value) {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "PUT",
      data: value,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem(TOKEN)),
      },
    });
  }
}

export default BaseService;
