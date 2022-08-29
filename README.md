# Storinator

A simple helper library for Local Storage.

* Works in all browsers
* Adds functionality
* No dependencies
* Supports ES modules

## Installation

To install, simply use `npm`.

`$ npm install storinator`

UMD, CJS, and ES modules are included alongside types.

## Usage

The recommended way to use Storinator is as an ES module.

```javascript
import Storinator from 'storinator' 
```

You can use any name you like for the import; simply replace "Storinator" in the methods below with your chosen import name.

To create a simple object in local storage, simply do the following:

```javascript
Storinator.setLocal('name', 'some value here');
```

To retrieve it, do the following:

```javascript
let storedObject = Storinator.getLocal('name');
console.log(storedObject.value);
// 'some value here'
```

Storinator provides additional functionality, including allowing expiry. 

```javascript
Storinator.setLocal('temporary', 'I expire soon!', {expireIn: 30})
```
If we then wait a minute...
```javascript
let storedObject = Storinator.getLocal('temporary');
console.log(storedObject);
// null
```
A null value is returned, and the object in browser storage is deleted. If you want to manually remove an object:
```javascript
Storinator.deleteLocal('name');
```

Storinator is extended over time with additional functionality. A full usage guide can be found in the [docs](https://storinator.readthedocs.io).
