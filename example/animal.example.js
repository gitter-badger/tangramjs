'use strict';

var createObject = require('../src/tangram.js').createObject;

var createAnimal = createObject
    .val('name', 'animal');

var createFlyingAnimal = createAnimal
    ._val('fly', function () {
        return this.name + ' makes flap flap';
    });

var createSwimmingAnimal = createAnimal
    ._val('swim', function () {
        return this.name + ' makes splish splash';
    });

var createTalkingAnimal = createAnimal
    .val('word', '...')

    ._val('talk', function () {
        return this.name + ' says ' + this.word;
    });

var createWalkingAnimal = createAnimal
    ._val('walk', function () {
        return this.name + ' makes stomp stomp';
    });

var createAlligator = createSwimmingAnimal.ext(createTalkingAnimal.ext(createWalkingAnimal))
    .val('name', 'alligator')
    .val('word', 'grrr');

var createDuck = createFlyingAnimal.ext(createSwimmingAnimal.ext(createTalkingAnimal.ext(createWalkingAnimal)))
    .val('name', 'duck')
    .val('word', 'quack');

var createGoat = createTalkingAnimal.ext(createWalkingAnimal)
    .val('name', 'goat')
    .val('word', 'baa');

/******************************************************************************/

var alligator = createAlligator();

console.log(alligator.swim());
console.log(alligator.talk());
console.log(alligator.walk());

var duck = createDuck();

console.log(duck.fly());
console.log(duck.swim());
console.log(duck.talk());
console.log(duck.walk());

var goat = createGoat();

console.log(goat.talk());
console.log(goat.walk());
