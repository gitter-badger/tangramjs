# Tangram.js

A library for class-free object-oriented programming in JavaScript.

> I used to think that the important innovation of JavaScript was prototypal inheritance.
> I now think it is class-free object-oriented programming.
> I think that is JavaScript’s *gift* to humanity.
> That is the thing that makes it really interesting, special, and an important language.
> -- <cite>[Douglas Crockford](https://www.youtube.com/watch?v=bo36MrBfTk4#t=2020)</cite>

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

### factory([data])

Creates a new instance which has an immutable set of own properties and no prototype.
Thus, an instance with only non-writable properties and only immutable property values is effectively immutable.

With the optional argument `data` the default values of specific instance properties, writable or not, can be overwritten at construction time (see [Example 2](#example-2-creating-an-object-that-behaves-like-it-inherits-from-objectprototype)).

### factory.val(name[, defaultValue])

Creates a new factory by extending the factory on which this method is called with an enumerable, non-writable property.

### factory.var(name[, defaultValue])

Creates a new factory by extending the factory on which this method is called with an enumerable, writable property.

### factory._val(name[, defaultValue])

Creates a new factory by extending the factory on which this method is called with an non-enumerable, non-writable property.

### factory._var(name[, defaultValue])

Creates a new factory by extending the factory on which this method is called with an non-enumerable, writable property.

### factory.ext(otherFactory)

Creates a new factory by extending another factory with all properties of the factory on which this method is called.

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

### Example 1: An Alligator, a Duck, and a Goat

```javascript
var createAlligator = createSwimmingAnimal
    .ext(createTalkingAnimal)
    .ext(createWalkingAnimal)

    .val('name', 'alligator')
    .val('word', 'grrr');
```

```javascript
var alligator = createAlligator();

alligator.swim(); // alligator makes splish splash
alligator.talk(); // alligator says grrr
alligator.walk(); // alligator makes stomp stomp
```

```javascript
var createDuck = createFlyingAnimal
    .ext(createSwimmingAnimal)
    .ext(createTalkingAnimal)
    .ext(createWalkingAnimal)

    .val('name', 'duck')
    .val('word', 'quack');
```

```javascript
var duck = createDuck();

duck.fly(); // duck makes flap flap
duck.swim(); // duck makes splish splash
duck.talk(); // duck says quack
duck.walk(); // duck makes stomp stomp
```

```javascript
var createGoat = createTalkingAnimal
    .ext(createWalkingAnimal)

    .val('name', 'goat')
    .val('word', 'baa');
```

```javascript
var goat = createGoat();

goat.talk(); // goat says baa
goat.walk(); // goat makes stomp stomp
```

```javascript
var createAnimal = createObject
    .val('name', 'animal');
```

```javascript
var createFlyingAnimal = createAnimal
    ._val('fly', function () {
        console.log(this.name + ' makes flap flap');
    });
```

```javascript
var createSwimmingAnimal = createAnimal
    ._val('swim', function () {
        console.log(this.name + ' makes splish splash');
    });
```

```javascript
var createTalkingAnimal = createAnimal
    .val('word', '...')

    ._val('talk', function () {
        console.log(this.name + ' says ' + this.word);
    });
```

```javascript
var createWalkingAnimal = createAnimal
    ._val('walk', function () {
        console.log(this.name + ' makes stomp stomp');
    });
```

### Example 2: Creating an object that behaves like it inherits from `Object.prototype`

```javascript
var createPerson = createStandardObject
    .val('name', 'John Doe')
    .val('age', 0);
```

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

```javascript
var createStandardObject = createObject
    ._val('hasOwnProperty', Object.prototype.hasOwnProperty)
    ._val('propertyIsEnumerable', Object.prototype.propertyIsEnumerable)
    ._val('toLocaleString', Object.prototype.toLocaleString)
    ._val('toString', Object.prototype.toString)
    ._val('valueOf', Object.prototype.valueOf);
```
