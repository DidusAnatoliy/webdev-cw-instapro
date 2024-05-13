import { formatDistanceToNow } from "date-fns";
import { ru } from 'date-fns/locale';


export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

String.prototype.sanitize = function () {
  return this.trim()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

Date.prototype.print = function () {
  return formatDistanceToNow(this, { addSuffix:true, locale:ru })
}

Array.prototype.getJustOneRandom = function () {
  return this[Math.floor(Math.random() * this.length)]
}
