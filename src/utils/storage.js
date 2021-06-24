
export const set = (key, item) => {
  if (typeof (item) !== 'string') item = JSON.stringify(item);

  localStorage.setItem(key, item);
}

export const get = (key) => {

  let item = localStorage.getItem(key);
  try {
    return JSON.parse(item);
  } catch (err) {
    return item;
  }
}

export const remove = (key) => {
  localStorage.removeItem(key);
}


const storage = {
  set,
  get,
  remove,
}

export default storage;