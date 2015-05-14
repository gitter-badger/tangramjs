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
        return (createObject1 = createObject.val('p1', 'p1_I'));
    }, null, [
        {
            name: 'p1',
            value: 'p1_I',
            enumerable: true,
            writable: false
        }
    ]);

    var createObject2;

    tester.testFactory(function () {
        return (createObject2 = createObject.var('p2', 'p2_I'));
    }, null, [
        {
            name: 'p2',
            value: 'p2_I',
            enumerable: true,
            writable: true
        }
    ]);

    var createObject3;

    tester.testFactory(function () {
        return (createObject3 = createObject._val('p3', 'p3_I'));
    }, null, [
        {
            name: 'p3',
            value: 'p3_I',
            enumerable: false,
            writable: false
        }
    ]);

    var createObject4;

    tester.testFactory(function () {
        return (createObject4 = createObject._var('p4', 'p4_I'));
    }, null, [
        {
            name: 'p4',
            value: 'p4_I',
            enumerable: false,
            writable: true
        }
    ]);

    var createObject5;

    tester.testFactory(function () {
        return (createObject5 = createObject4.ext(createObject3.ext(createObject2.ext(createObject1))));
    }, null, [
        {
            name: 'p1',
            value: 'p1_I',
            enumerable: true,
            writable: false
        },
        {
            name: 'p2',
            value: 'p2_I',
            enumerable: true,
            writable: true
        },
        {
            name: 'p3',
            value: 'p3_I',
            enumerable: false,
            writable: false
        },
        {
            name: 'p4',
            value: 'p4_I',
            enumerable: false,
            writable: true
        }
    ]);

    var createObject6;

    tester.testFactory(function () {
        return (createObject6 = createObject5._var('p1', 'p1_II').val('p5', 'p5_I'));
    }, null, [
        {
            name: 'p1',
            value: 'p1_II',
            enumerable: false,
            writable: true
        },
        {
            name: 'p2',
            value: 'p2_I',
            enumerable: true,
            writable: true
        },
        {
            name: 'p3',
            value: 'p3_I',
            enumerable: false,
            writable: false
        },
        {
            name: 'p4',
            value: 'p4_I',
            enumerable: false,
            writable: true
        },
        {
            name: 'p5',
            value: 'p5_I',
            enumerable: true,
            writable: false
        }
    ]);

    var createObject7;

    tester.testFactory(function () {
        return (createObject7 = createObject5.var('p6', 'p6_I').ext(createObject6));
    }, null, [
        {
            name: 'p1',
            value: 'p1_I',
            enumerable: true,
            writable: false
        },
        {
            name: 'p2',
            value: 'p2_I',
            enumerable: true,
            writable: true
        },
        {
            name: 'p3',
            value: 'p3_I',
            enumerable: false,
            writable: false
        },
        {
            name: 'p4',
            value: 'p4_I',
            enumerable: false,
            writable: true
        },
        {
            name: 'p5',
            value: 'p5_I',
            enumerable: true,
            writable: false
        },
        {
            name: 'p6',
            value: 'p6_I',
            enumerable: true,
            writable: true
        }
    ]);

    tester.testFactory(function () {
        return createObject7;
    }, {
        p1: 'p1_II',
        p2: 'p2_II',
        p3: 'p3_II',
        p4: 'p4_II',
        p7: 'p7_I'
    }, [
        {
            name: 'p1',
            value: 'p1_II',
            enumerable: true,
            writable: false
        },
        {
            name: 'p2',
            value: 'p2_II',
            enumerable: true,
            writable: true
        },
        {
            name: 'p3',
            value: 'p3_II',
            enumerable: false,
            writable: false
        },
        {
            name: 'p4',
            value: 'p4_II',
            enumerable: false,
            writable: true
        },
        {
            name: 'p5',
            value: 'p5_I',
            enumerable: true,
            writable: false
        },
        {
            name: 'p6',
            value: 'p6_I',
            enumerable: true,
            writable: true
        }
    ]);
});
