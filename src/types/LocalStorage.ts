export type LocalStorage = {
    /**
     * The name of the object. Not stored in the key itself, but is added
     * when converting the value to the type.
     */
    name: string

    /**
     * The raw value of the key.
     */
    value: string

    /**
     * The Unix timestamp at which to consider the key expired.
     */
    expires?: number

    /**
     * Whether the key is protected or not. If true, the key can't be
     * overwritten or deleted unless expired.
     */
    protect?: boolean
}