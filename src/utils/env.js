require('dotenv').config();

const env = {
  get: (key) => process.env[key],
  set: (key, value) => process.env[key] = value,
}

export default env;