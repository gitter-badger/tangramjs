/* global describe */

'use strict';

var tangram = require('../src/tangram.js');
var tester = require('./tester.js');

describe('tangram', function () {
    var createObject;

    tester.testFactory(function () {
        return (createObject = tangram.createObject);
    }, null, []);

    var createObject1;

    tester.testFactory(function () {
        return (createObject1 = createObject.val('name1', 'value1'));
    }, null, [
        {
            name: 'name1',
            value: 'value1',
            enumerable: true,
            writable: false
        }
    ]);

    var createObject2;

    tester.testFactory(function () {
        return (createObject2 = createObject.var('name2', 'value2'));
    }, null, [
        {
            name: 'name2',
            value: 'value2',
            enumerable: true,
            writable: true
        }
    ]);

    var createObject3;

    tester.testFactory(function () {
        return (createObject3 = createObject._val('name3', 'value3'));
    }, null, [
        {
            name: 'name3',
            value: 'value3',
            enumerable: false,
            writable: false
        }
    ]);

    var createObject4;

    tester.testFactory(function () {
        return (createObject4 = createObject._var('name4', 'value4'));
    }, null, [
        {
            name: 'name4',
            value: 'value4',
            enumerable: false,
            writable: true
        }
    ]);

    var createObject5;

    tester.testFactory(function () {
        return (createObject5 = createObject4.ext(createObject3.ext(createObject2.ext(createObject1))));
    }, null, [
        {
            name: 'name1',
            value: 'value1',
            enumerable: true,
            writable: false
        },
        {
            name: 'name2',
            value: 'value2',
            enumerable: true,
            writable: true
        },
        {
            name: 'name3',
            value: 'value3',
            enumerable: false,
            writable: false
        },
        {
            name: 'name4',
            value: 'value4',
            enumerable: false,
            writable: true
        }
    ]);

    var createObject6;

    tester.testFactory(function () {
        return (createObject6 = createObject5._var('name1').val('name5', null));
    }, null, [
        {
            name: 'name1',
            value: undefined,
            enumerable: false,
            writable: true
        },
        {
            name: 'name2',
            value: 'value2',
            enumerable: true,
            writable: true
        },
        {
            name: 'name3',
            value: 'value3',
            enumerable: false,
            writable: false
        },
        {
            name: 'name4',
            value: 'value4',
            enumerable: false,
            writable: true
        },
        {
            name: 'name5',
            value: null,
            enumerable: true,
            writable: false
        }
    ]);

    var createObject7;

    tester.testFactory(function () {
        return (createObject7 = createObject5.var('name6', 'value6').ext(createObject6));
    }, null, [
        {
            name: 'name1',
            value: 'value1',
            enumerable: true,
            writable: false
        },
        {
            name: 'name2',
            value: 'value2',
            enumerable: true,
            writable: true
        },
        {
            name: 'name3',
            value: 'value3',
            enumerable: false,
            writable: false
        },
        {
            name: 'name4',
            value: 'value4',
            enumerable: false,
            writable: true
        },
        {
            name: 'name5',
            value: null,
            enumerable: true,
            writable: false
        },
        {
            name: 'name6',
            value: 'value6',
            enumerable: true,
            writable: true
        }
    ]);

    tester.testFactory(function () {
        return createObject7;
    }, {
        name1: true,
        name2: false,
        name3: null,
        name7: 'value7'
    }, [
        {
            name: 'name1',
            value: true,
            enumerable: true,
            writable: false
        },
        {
            name: 'name2',
            value: false,
            enumerable: true,
            writable: true
        },
        {
            name: 'name3',
            value: null,
            enumerable: false,
            writable: false
        },
        {
            name: 'name4',
            value: 'value4',
            enumerable: false,
            writable: true
        },
        {
            name: 'name5',
            value: null,
            enumerable: true,
            writable: false
        },
        {
            name: 'name6',
            value: 'value6',
            enumerable: true,
            writable: true
        }
    ]);
});
