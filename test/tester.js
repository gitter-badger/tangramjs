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

    var createInstance = function () {
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

        describe('instance = ' + factoryName + '(' + (data ? JSON.stringify(data) : '') + ')', function () {
            it('is an object', function () {
                assert(function () {
                    return typeof createInstance() === 'object';
                }, function () {
                    return createInstance() !== null;
                });
            });

            it('is always new', function () {
                assert(function () {
                    return createInstance() !== createInstance();
                });
            });

            it('is frozen', function () {
                assert(function () {
                    return Object.isFrozen(createInstance());
                });
            });

            it('has no prototype', function () {
                assert(function () {
                    return Object.getPrototypeOf(createInstance()) === null;
                });
            });

            it('has ' + descriptors.length + ' own properties', function () {
                assert(function () {
                    return Object.getOwnPropertyNames(createInstance()).length === descriptors.length;
                });
            });

            descriptors.forEach(function (descriptor) {
                it('has an own property ' + JSON.stringify(descriptor.name), function () {
                    assert(function () {
                        return hasOwnProperty(createInstance(), descriptor.name);
                    });
                });

                describe('instance.' + descriptor.name, function () {
                    it('returns ' + JSON.stringify(descriptor.value), function () {
                        assert(function () {
                            return createInstance()[descriptor.name] === descriptor.value;
                        });
                    });

                    it('is ' + (descriptor.enumerable ? '' : 'non-') + 'enumerable', function () {
                        assert(function () {
                            return propertyIsEnumerable(createInstance(), descriptor.name) === descriptor.enumerable;
                        });
                    });

                    it('is ' + (descriptor.writable ? '' : 'non-') + 'writable', function () {
                        var instance = createInstance();
                        var newValue = descriptor.value + 'I';

                        if (descriptor.writable) {
                            assert(function () {
                                instance[descriptor.name] = newValue;

                                return instance[descriptor.name] === newValue;
                            });
                        } else {
                            assert.throws(function () {
                                instance[descriptor.name] = newValue;
                            });
                        }
                    });
                });
            });
        });
    });
};
