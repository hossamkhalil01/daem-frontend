import { getClientObj } from "../services/clientService";

const client = getClientObj();

const requests = {
  create: async function (url, body = {}, params = {}) {
    return client.post(url, body, { params });
  },

  update: async function (url, body = {}, params = {}) {
    return client.patch(url, body, { params });
  },

  get: async function (url, params = {}) {
    return client.get(url, { params });
  },

  delete: async function (url, params = {}) {
    return client.delete(url, { params });
  },
};

export default requests;
