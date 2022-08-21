import {LocalStorage} from "../src/types/LocalStorage";
import {StorageAPI} from "../src";
import {expect} from "chai";

describe('Base', function () {
    describe('Setting Local Storage', function () {
        it('Should return an identical LocalStorage object to the test one', function() {
            let expiryTime = Math.round(Date.now() / 1000) + 38400
            let test: LocalStorage = {name: "Test", value: "Test Value", expires: expiryTime, readOnly: true}
            let returned = StorageAPI.setLocal("Test", "Test Value", {readOnly: true, expireIn: 38400})
            expect(test).to.eql(returned) // Use eql here because the objects are different!
        })
    }),
    describe('Testing Expiry Time', function () {
        it('Should return an identical expiry time to the test one', function() {
            let expiryTime = Math.round(Date.now() / 1000) + 38400
            expect(StorageAPI.getExpiryTime(38400)).to.equal(expiryTime)
        })
    })
})