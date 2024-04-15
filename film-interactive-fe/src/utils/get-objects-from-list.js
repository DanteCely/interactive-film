export const getObjectsFromList = (keys = [], list) => {
  if (keys && list) return keys.map((key) => list.get(key));
  else return [];
};
