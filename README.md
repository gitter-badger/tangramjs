# Tangram.js

[![Join the chat at https://gitter.im/clebert/tangramjs](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/clebert/tangramjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A library for class-free object-oriented programming in JavaScript.

> I used to think that the important innovation of JavaScript was prototypal inheritance.
> I now think it is class-free object-oriented programming.
> I think that is JavaScript’s *gift* to humanity.
> That is the thing that makes it really interesting, special, and an important language.
> -- <cite>[Douglas Crockford](https://www.youtube.com/watch?v=bo36MrBfTk4#t=2020)</cite>

[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/clebert/tangramjs/master/LICENSE)
[![npm](http://img.shields.io/npm/v/tangramjs.svg?style=flat)](https://www.npmjs.org/package/tangramjs)
[![downloads](http://img.shields.io/npm/dm/tangramjs.svg?style=flat)](https://www.npmjs.org/package/tangramjs)

[![build](http://img.shields.io/travis/clebert/tangramjs/master.svg?style=flat)](https://travis-ci.org/clebert/tangramjs)
[![code climate coverage](http://img.shields.io/codeclimate/coverage/github/clebert/tangramjs.svg?style=flat)](https://codeclimate.com/github/clebert/tangramjs/coverage)
[![code climate](http://img.shields.io/codeclimate/github/clebert/tangramjs.svg?style=flat)](https://codeclimate.com/github/clebert/tangramjs)
[![dependencies](http://img.shields.io/david/clebert/tangramjs.svg?style=flat)](https://david-dm.org/clebert/tangramjs#info=dependencies&view=table)
[![devDependencies](http://img.shields.io/david/dev/clebert/tangramjs.svg?style=flat)](https://david-dm.org/clebert/tangramjs#info=devDependencies&view=table)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/tangramjs.svg)](https://saucelabs.com/u/tangramjs)

## Contents

- [Getting Started](#getting-started)
- [API](#api)
- [References](#references)
- [Examples](#examples)

## Getting Started

### Installation

```sh
npm install tangramjs --save
```

### Integration

```javascript
var createObject = require('tangramjs').createObject;
```

## API

### createObject

This is the immutable base **factory** of Tangram.js.
It has no property descriptors, and thus, it can only create new immutable *empty* objects.

### factory([spec])

Creates a new object which has an **immutable** set of own properties and **no prototype**.

With the optional argument `spec` the default values of specific properties, writable or not, can be overwritten at construction time.

### factory.val(name[, defaultValue])

Creates a new immutable factory, copying all existing property descriptors and the new one. The new property descriptor takes precedence over the existing ones and describes an **enumerable** and **non-writable** property.

### factory.var(name[, defaultValue])

Creates a new immutable factory, copying all existing property descriptors and the new one. The new property descriptor takes precedence over the existing ones and describes an **enumerable** and **writable** property.

### factory._val(name[, defaultValue])

Creates a new immutable factory, copying all existing property descriptors and the new one. The new property descriptor takes precedence over the existing ones and describes an **non-enumerable** and **non-writable** property.

### factory._var(name[, defaultValue])

Creates a new immutable factory, copying all existing property descriptors and the new one. The new property descriptor takes precedence over the existing ones and describes an **non-enumerable** and **writable** property.

### factory.ext(otherFactory)

Creates a new immutable factory, copying all property descriptors of both factories.
The property descriptors of the left-hand side factory are taking precedence over the other ones.

## References

- [Douglas Crockford: The Better Parts - JSConfUY 2014][1]
- [Douglas Crockford: Nordic.js 2014 - The Better Parts][2]
- [Danny Fritz: Class-Free Object-Oriented Programming][3]
- [Eric Elliott: JavaScript Constructor Functions Vs Factory Functions][4]
- [Eric Elliott: Stop Using Constructor Functions In JavaScript][5]
- [Wikipedia: Composition over inheritance][6]

[1]: https://www.youtube.com/watch?v=bo36MrBfTk4
[2]: https://www.youtube.com/watch?v=PSGEjv3Tqo0
[3]: https://dannyfritz.wordpress.com/2014/10/11/class-free-object-oriented-programming/
[4]: http://ericleads.com/2013/01/javascript-constructor-functions-vs-factory-functions/
[5]: http://ericleads.com/2012/09/stop-using-constructor-functions-in-javascript/
[6]: http://en.wikipedia.org/wiki/Composition_over_inheritance

## Examples

### An Alligator, a Duck, and a Goat

Creating a new factory called `createAnimal`:

```javascript
var createAnimal = createObject
    .val('name', 'animal');
```

Creating a new factory called `createFlyingAnimal`:

```javascript
var createFlyingAnimal = createAnimal
    ._val('fly', function () {
        console.log(this.name + ' makes flap flap');
    });
```

Creating a new factory called `createSwimmingAnimal`:

```javascript
var createSwimmingAnimal = createAnimal
    ._val('swim', function () {
        console.log(this.name + ' makes splish splash');
    });
```

Creating a new factory called `createTalkingAnimal`:

```javascript
var createTalkingAnimal = createAnimal
    .val('word', '...')

    ._val('talk', function () {
        console.log(this.name + ' says ' + this.word);
    });
```

Creating a new factory called `createWalkingAnimal`:

```javascript
var createWalkingAnimal = createAnimal
    ._val('walk', function () {
        console.log(this.name + ' makes stomp stomp');
    });
```

Creating a new factory called `createAlligator`:

```javascript
var createAlligator = createSwimmingAnimal
    .ext(createTalkingAnimal)
    .ext(createWalkingAnimal)

    .val('name', 'alligator')
    .val('word', 'grrr');
```

Creating a new factory called `createDuck`:

```javascript
var createDuck = createFlyingAnimal
    .ext(createSwimmingAnimal)
    .ext(createTalkingAnimal)
    .ext(createWalkingAnimal)

    .val('name', 'duck')
    .val('word', 'quack');
```

Creating a new factory called `createGoat`:

```javascript
var createGoat = createTalkingAnimal
    .ext(createWalkingAnimal)

    .val('name', 'goat')
    .val('word', 'baa');
```

Creating and using a new immutable object called `alligator`:

```javascript
var alligator = createAlligator();

alligator.swim(); // alligator makes splish splash
alligator.talk(); // alligator says grrr
alligator.walk(); // alligator makes stomp stomp
```

Creating and using a new immutable object called `duck`:

```javascript
var duck = createDuck();

duck.fly(); // duck makes flap flap
duck.swim(); // duck makes splish splash
duck.talk(); // duck says quack
duck.walk(); // duck makes stomp stomp
```

Creating and using a new immutable object called `goat`:

```javascript
var goat = createGoat();

goat.talk(); // goat says baa
goat.walk(); // goat makes stomp stomp
```

### Creating an object that behaves like it inherits from `Object.prototype`

Creating a new factory called `createStandardObject`:

```javascript
var createStandardObject = createObject
    ._val('hasOwnProperty', Object.prototype.hasOwnProperty)
    ._val('propertyIsEnumerable', Object.prototype.propertyIsEnumerable)
    ._val('toLocaleString', Object.prototype.toLocaleString)
    ._val('toString', Object.prototype.toString)
    ._val('valueOf', Object.prototype.valueOf);
```

Creating a new factory called `createPerson`:

```javascript
var createPerson = createStandardObject
    .val('name', 'John Doe')
    .val('age', 0);
```

Creating and using a new immutable object called `person`:

```javascript
var person = createPerson({
    name: 'Jane Doe',
    age: 99
});

console.log(person.hasOwnProperty('name')); // true
console.log(person.propertyIsEnumerable('name')); // true
console.log(person.toLocaleString()); // [object Object]
console.log(person.toString()); // [object Object]
console.log(person.valueOf()); // { name: 'Jane Doe', age: 99 }
```
