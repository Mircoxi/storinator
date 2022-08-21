import {LocalStorage} from "../src/types/LocalStorage";
import StorageAPI from "../src";
import {expect} from "chai";

let expiryTime = Math.round(Date.now() / 1000) + 38400


describe('Local Storage Functionality', function () {
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

    describe('Null on expiry', function () {
        it('Should return null if a key has expired.', async function () {
            StorageAPI.setLocal("Expire Me", "expires soon", {expireIn: 1})
            await new Promise(r => setTimeout(r, 1500)); // Hacky sleep implementation
            expect(StorageAPI.getLocal("Expire Me")).to.equal(null)
        })
    })

    describe('Deleting items', function () {
        it('Shouldn\'t find the test item.', function () {
            StorageAPI.setLocal("remove me", "bye bye :(");
            StorageAPI.deleteLocal("remove me");
            expect(StorageAPI.getLocal("remove me")).to.equal(null)
        })
    })

})