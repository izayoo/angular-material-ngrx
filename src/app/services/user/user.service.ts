import { Injectable } from '@angular/core';
import { User } from "../../models/user";

const DATA_STORE_KEY = "mtc_users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
    if (!localStorage.getItem(DATA_STORE_KEY)) {
      localStorage.setItem(DATA_STORE_KEY, "[]");
    }
  }

  getAll() {
    let data = localStorage.getItem(DATA_STORE_KEY);
    return data ? JSON.parse(data) : [];
  }

  getOneById(id: number) {
    let data = this.getAll();
    let record = data.find((item: User) => item.id == id);
    if (record != undefined) {
      return record;
    } else {
      throw new Error("User not Found");
    }
  }

  create(user: User) {
    let data = this.getAll();
    let index = data.findIndex((item: User) => item.id == user.id);
    if (index >= 0) {
      throw new Error("User exists.");
    } else {
      data.push(user)
      localStorage.setItem(DATA_STORE_KEY, JSON.stringify(data));
    }
  }

  update(id: number, user: User) {
    let data = this.getAll();
    let index = data.findIndex((item: User) => item.id == id && item.id == user.id);
    if (index >= 0) {
      data[index] = user;
      localStorage.setItem(DATA_STORE_KEY, JSON.stringify(data));
    } else {
      throw new Error("User does not exist.");
    }
  }

  delete(id: number) {
    let data = this.getAll();
    let index = data.findIndex((item: User) => item.id == id);
    if (index > 0) {
      data.splice(index, 1);
      localStorage.setItem(DATA_STORE_KEY, JSON.stringify(data));
    } else {
      throw new Error("User not found.");
    }
  }
}
