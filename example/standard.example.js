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

/******************************************************************************/

var person = createPerson({
    age: 29
});

console.log(person.hasOwnProperty('name'));
console.log(person.propertyIsEnumerable('name'));
console.log(person.toLocaleString());
console.log(person.toString());
console.log(person.valueOf());
