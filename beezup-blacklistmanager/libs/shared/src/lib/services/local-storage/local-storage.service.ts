import {Injectable} from '@angular/core';
import {pickBy, isObject, isUndefined} from 'lodash';


@Injectable()
export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public setItem(key, item) {
    try {
      this.storage.setItem(key, isObject(item) ? JSON.stringify(item) : item);
      return this.getItem(key);
    } catch (e) {
      console.warn(e);
    }
  }

  getStringItem(key) {
    return this.storage.getItem(key);
  }

  /**
   * getItem
   * @param key
   * @param {any} defaultValue: if item no exist on localstorage this value will return by default
   * @param {() => boolean} pickByKey
   * @returns {any}
   */
  getItem(key, defaultValue = null, pickByKey = () => true) {
    try {
      const itemStr = this.storage.getItem(key);

      let result;
      if (itemStr) {
        result = JSON.parse(itemStr);
      } else if (!isUndefined(defaultValue)) {
        return defaultValue;
      }
      return pickBy(result, pickByKey);
    } catch (e) {
      console.error(e);
    }
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }
}
