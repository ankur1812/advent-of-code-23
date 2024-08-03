export function LS_set(key, funcDefinition) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, funcDefinition);
  }
}

export function LS_get(key) {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
}
