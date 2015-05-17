'use strict';

var createObject = require('../src/tangram.js').createObject;

var createAnimal = createObject
    .val('name', 'animal');

var createFlyingAnimal = createAnimal
    ._val('fly', function () {
        console.log(this.name + ' makes flap flap');
    });

var createSwimmingAnimal = createAnimal
    ._val('swim', function () {
        console.log(this.name + ' makes splish splash');
    });

var createTalkingAnimal = createAnimal
    .val('word', '...')

    ._val('talk', function () {
        console.log(this.name + ' says ' + this.word);
    });

var createWalkingAnimal = createAnimal
    ._val('walk', function () {
        console.log(this.name + ' makes stomp stomp');
    });

var createAlligator = createSwimmingAnimal
    .ext(createTalkingAnimal)
    .ext(createWalkingAnimal)

    .val('name', 'alligator')
    .val('word', 'grrr');

var createDuck = createFlyingAnimal
    .ext(createSwimmingAnimal)
    .ext(createTalkingAnimal)
    .ext(createWalkingAnimal)

    .val('name', 'duck')
    .val('word', 'quack');

var createGoat = createTalkingAnimal
    .ext(createWalkingAnimal)

    .val('name', 'goat')
    .val('word', 'baa');

/******************************************************************************/

var alligator = createAlligator();

alligator.swim(); // alligator makes splish splash
alligator.talk(); // alligator says grrr
alligator.walk(); // alligator makes stomp stomp

var duck = createDuck();

duck.fly(); // duck makes flap flap
duck.swim(); // duck makes splish splash
duck.talk(); // duck says quack
duck.walk(); // duck makes stomp stomp

var goat = createGoat();

goat.talk(); // goat says baa
goat.walk(); // goat makes stomp stomp
