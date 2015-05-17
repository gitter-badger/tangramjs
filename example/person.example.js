'use strict';

var createObject = require('../src/tangram.js').createObject;

var createStandardObject = createObject
    ._val('hasOwnProperty', Object.prototype.hasOwnProperty)
    ._val('propertyIsEnumerable', Object.prototype.propertyIsEnumerable)
    ._val('toLocaleString', Object.prototype.toLocaleString)
    ._val('toString', Object.prototype.toString)
    ._val('valueOf', Object.prototype.valueOf);

var createPerson = createStandardObject
    .val('name', 'John Doe')
    .val('age', 0);

var person = createPerson({
    name: 'Jane Doe',
    age: 99
});

console.log(person.hasOwnProperty('name')); // true
console.log(person.propertyIsEnumerable('name')); // true
console.log(person.toLocaleString()); // [object Object]
console.log(person.toString()); // [object Object]
console.log(person.valueOf()); // { name: 'Jane Doe', age: 99 }
