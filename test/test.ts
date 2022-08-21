import {LocalStorage} from "../src/types/LocalStorage";
import {StorageAPI} from "../src";
import {expect} from "chai";

let expiryTime = Math.round(Date.now() / 1000) + 38400


describe('Base Functionality', function () {
    describe('Testing Expiry Time', function () {
        it('Should return an identical expiry time to the test one', function() {
            let expiryTime = Math.round(Date.now() / 1000) + 38400
            expect(StorageAPI.getExpiryTime(38400)).to.equal(expiryTime)
        })
    })

    describe('Setting Local Storage', function () {
        it('Should return an identical LocalStorage object to the test one', function() {
            let test: LocalStorage = {name: "Test", value: "Test Value", expires: expiryTime, readOnly: true}
            let returned = StorageAPI.setLocal("Test", "Test Value", {readOnly: true, expireIn: 38400})
            expect(test).to.eql(returned) // Use eql here because the objects are different! to.deep.equal would also work.
        })
    })

    describe('Getting from local storage', function () {
        it('Should return an identical LocalStorage object to the test one', function() {
            let test: LocalStorage = {name: "Test", value: "Test Value", expires: expiryTime, readOnly: true}
            let returned = StorageAPI.getLocal("Test")
            expect(test).to.eql(returned) // Use eql here because the objects are different! to.deep.equal would also work.

        })
    })

})