import {EncodingTypeEnum} from "./types/EncodingTypeEnum";
import {OptionsType} from "./types/OptionsType";
import {LocalStorage} from "./types/LocalStorage";


export class StorageAPI {

    /**
     * Sets a local storage object for the browser. On success, returns a LocalStorage object.
     * @param {string} name The name of the key to set.
     * @param {string} value The value to set.
     * @param {OptionsType} options An OptionsType containing any optional parameters.
     */
    static setLocal(name: string, value: string, options: OptionsType = {}): LocalStorage {
        let expiry: number = 0;
        if (typeof(options.expireIn) !== 'undefined') {
            // Passing in an expiry time in seconds, so we need to get the correct TTL.
            // Has a margin of error of +/- 1 second due to rounding.
            expiry = this.getExpiryTime(options.expireIn)
        }
        let protect: boolean = false
        if (options.protect === true) {
            protect = true;
        }
        let obj: LocalStorage = {name: name, value: value, expires: expiry, protect: protect}
        if (this.checkProtectionLocal(name)) {
            throw new Error("Trying to overwrite protected item!")
        } else {
            try {
                this.saveLocal(obj);
            } catch (e) {
                throw new Error(e);
            }
        }
        return obj;
    }

    /**
     * Saves a local storage object. Should not be called manually
     * by users.
     * @param {LocalStorage} obj The object to save.
     * @return {boolean} Whether the operation succeeded or not.
     * @private
     */
    private static saveLocal(obj: LocalStorage): boolean {
        let arr = {}
        arr['value'] = obj.value;
        if (obj.expires !== 0) {
            arr['expires'] = obj.expires
        }
        if (obj.protect === true) {
            arr['protect'] = true;
        }
        let string = JSON.stringify(arr);
        try {
            localStorage.setItem(obj.name, string);
        } catch {
            throw new Error("Failed to save.");
        }
        return true;

    }

    /**
     * Gets data from local storage and parses it into a usable object.
     * @param {string} name The name of the data in local storage to get.
     * @return {(LocalStorage|null)} Returns a LocalStorage object with the data. If the
     *      name doesn't exist, or has expired, returns null.
     */
    static getLocal(name: string): LocalStorage|null {
        try {
            if (!localStorage.getItem(name)) {
                return null;
            }
            let obj: LocalStorage = JSON.parse(localStorage.getItem(name));
            obj.name = name // It's not stored in the key itself, so it needs to be appended separately.
            if (typeof(obj.expires) !== 'undefined' && obj.expires <= (Date.now() / 1000)) {
                this.deleteLocal(name, true);
                return null;

            } else {
                return obj;
            }
        } catch (e) {
            throw new Error("Couldn't parse local storage object.")
        }
    }

    /**
     * Deletes a local storage item. Won't be able to delete the item if it's
     * protected, unless the force parameter is set to true.
     * @param {string} name The name of the object to delete.
     * @param {boolean} force If set to true, ignore protection status.
     */
    static deleteLocal(name:string, force:boolean = false): void {
        if (this.checkProtectionLocal(name) && force === false) {
            throw new Error('Trying to delete protected item!');
        } else {
            localStorage.removeItem(name)
        }
    }

    /**
     * Get the Unix timestamp the object should expire at. While JavaScript typically
     * has millisecond precision, we use second precision for this for compatibility's
     * sake, ease of use, and being easier to work with.
     * @param {number} expireIn The number of seconds from now in which to expire.
     * @param {number} [from] If setting after the fact, but you want it to expire
     *      from a given point, this optional parameter is the timestamp that has the
     *      desired "start" time. You can use Date.UTC() to get this.
     * @return {number} The timestamp to expire at.
     */
    static getExpiryTime(expireIn: number, from?: number): number {
        if (typeof(from) !== 'undefined') {
            return Math.round(from / 1000) + expireIn;
        }
        return Math.round(Date.now() / 1000) + expireIn;
    }

    /**
     * Checks whether an item is protected or not, for example prior to any delete or
     * update operations.
     * @param {string} name Object key to check.
     * @return {boolean} True if the object is protected, or false if the object
     *      either doesn't exist, or is not protected.
     */
    static checkProtectionLocal(name:string): boolean {
        if (!localStorage.getItem(name)) {
            return false;
        }
        let obj:LocalStorage = JSON.parse(localStorage.getItem(name));
        obj.name = name // It's not stored in the key itself, so it needs to be appended separately.
        return obj.protect === true;

    }
}