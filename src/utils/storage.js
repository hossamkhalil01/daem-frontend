
export const set = (key, item) => {
  if (typeof (item) !== 'string')
    item = JSON.stringify(item);

  localStorage.setItem(key, item);
}

export const get = (key) => {
  const item = localStorage.getItem(key);
  if (item && typeof (item) !== 'string') return JSON.parse(item);

  return item;
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