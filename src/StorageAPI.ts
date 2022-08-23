import {EncodingTypeEnum} from "./types/EncodingTypeEnum";
import {OptionsType} from "./types/OptionsType";
import {LocalStorage} from "./types/LocalStorage";


export class StorageAPI {

    static setLocal(name: string, value: string, options: OptionsType = {}): LocalStorage {
        let expiry: number = 0;
        if (typeof(options.expireIn) !== 'undefined') {
            // Passing in an expiry time in seconds, so we need to get the correct TTL.
            // Has a margin of error of +/- 1 second due to rounding.
            expiry = this.getExpiryTime(options.expireIn)
        }
        let protect:boolean = false
        if (options.protect === true) {
            protect = true;
        }
        let obj:LocalStorage = {name: name, value: value, expires: expiry, protect: protect}
        if (!this.checkProtectionLocal(name)) {
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

    static saveLocal(obj: LocalStorage):boolean {
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
            let obj:LocalStorage = JSON.parse(localStorage.getItem(name));
            obj.name = name // It's not stored in the key itself, so it needs to be appended separately.
            if (typeof(obj.expires) !== 'undefined'  && obj.expires <= (Date.now() / 1000)) {
                this.deleteLocal(name)
                return null;
            } else {
                return obj;
            }
        } catch (e) {
            throw new Error("Couldn't parse local storage object.")
        }
    }

    static deleteLocal(name:string): void {
        if (!this.checkProtectionLocal(name)) {
            throw new Error("Trying to delete protected item!")
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
     * @private
     */
    static getExpiryTime(expireIn: number, from?: number): number {
        if (typeof(from) !== 'undefined') {
            return Math.round(from / 1000) + expireIn;
        }
        return Math.round(Date.now() / 1000) + expireIn;
    }

    static checkProtectionLocal(name:string) {
        let obj = this.getLocal(name);
        if (obj !== null && obj.protect === true) {
            return false
        } else {
            return true;
        }

    }
}