/* global describe, it */
/* jshint -W079 */

'use strict';

var assert = require('expressive-assertion');

var toString = Function.prototype.call.bind(Function.prototype.toString);
var hasOwnProperty = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = Function.prototype.call.bind(Object.prototype.propertyIsEnumerable);

var getStatement = function (aFunction) {
    var result = /return (?:(?:\((.+?)\))|(.+?));/.exec(
        toString(aFunction).replace(/\s/g, ' ').replace(/'/g, '"')
    );

    return result[1] || result[2];
};

var getFactoryName = function (aFunction) {
    return /(\S+)/.exec(getStatement(aFunction))[1];
};

exports.testFactory = function (initializer, data, descriptors) {
    var factory = initializer();
    var factoryName = getFactoryName(initializer);

    var createObject = function () {
        return data ? factory(data) : factory();
    };

    describe(getStatement(initializer), function () {
        it('is a function', function () {
            assert(function () {
                return typeof factory === 'function';
            });
        });

        it('is frozen', function () {
            assert(function () {
                return Object.isFrozen(factory);
            });
        });

        'val|var|_val|_var|ext'.split('|').forEach(function (methodName) {
            it('has an own property ' + JSON.stringify(methodName), function () {
                assert(function () {
                    return hasOwnProperty(factory, methodName);
                });
            });

            describe(factoryName + '.' + methodName, function () {
                it('returns a function', function () {
                    assert(function () {
                        return typeof factory[methodName] === 'function';
                    });
                });

                it('is non-writable', function () {
                    assert.throws(function () {
                        factory[methodName] = function () {};
                    });
                });
            });
        });

        describe('object = ' + factoryName + '(' + (data ? JSON.stringify(data) : '') + ')', function () {
            it('is an object', function () {
                assert(function () {
                    return typeof createObject() === 'object';
                }, function () {
                    return createObject() !== null;
                });
            });

            it('is always new', function () {
                assert(function () {
                    return createObject() !== createObject();
                });
            });

            it('is frozen', function () {
                assert(function () {
                    return Object.isFrozen(createObject());
                });
            });

            it('has no prototype', function () {
                assert(function () {
                    return Object.getPrototypeOf(createObject()) === null;
                });
            });

            it('has ' + descriptors.length + ' own properties', function () {
                assert(function () {
                    return Object.getOwnPropertyNames(createObject()).length === descriptors.length;
                });
            });

            descriptors.forEach(function (descriptor) {
                it('has an own property ' + JSON.stringify(descriptor.name), function () {
                    assert(function () {
                        return hasOwnProperty(createObject(), descriptor.name);
                    });
                });

                describe('object.' + descriptor.name, function () {
                    it('returns ' + JSON.stringify(descriptor.value), function () {
                        assert(function () {
                            return createObject()[descriptor.name] === descriptor.value;
                        });
                    });

                    it('is ' + (descriptor.enumerable ? '' : 'non-') + 'enumerable', function () {
                        assert(function () {
                            return propertyIsEnumerable(createObject(), descriptor.name) === descriptor.enumerable;
                        });
                    });

                    it('is ' + (descriptor.writable ? '' : 'non-') + 'writable', function () {
                        var object = createObject();

                        if (descriptor.writable) {
                            assert(function () {
                                object[descriptor.name] = 123;

                                return object[descriptor.name] === 123;
                            });
                        } else {
                            assert.throws(function () {
                                object[descriptor.name] = 123;
                            });
                        }
                    });
                });
            });
        });
    });
};
