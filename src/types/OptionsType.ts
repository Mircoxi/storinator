import {EncodingTypeEnum} from "./EncodingTypeEnum";

export type OptionsType = {
    /**
     * Used by the API to determine whether to set an expiry time.
     */
    expireIn?: number
    /**
     * Optionally, a parameter can be set to disallow overwriting the
     * storage object. Should default to false.
     */
    protect?: boolean
}