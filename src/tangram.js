/* jshint -W079 */

'use strict';

var hasOwnProperty = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

var defineProperty = function (object, descriptor, value) {
    return Object.defineProperty(object, descriptor.name, descriptor.writable ? {
        enumerable: descriptor.enumerable,
        get: function () {
            return value;
        },
        set: function (newValue) {
            value = newValue;
        }
    } : {
        enumerable: descriptor.enumerable,
        value: value
    });
};

var getPropertyValue = function (object, descriptor) {
    return (object && hasOwnProperty(object, descriptor.name)) ? object[descriptor.name] : descriptor.defaultValue;
};

var createFactory = function (descriptors) {
    var factory = function (data) {
        return Object.freeze(descriptors.reduce(function (object, descriptor) {
            return defineProperty(object, descriptor, getPropertyValue(data, descriptor));
        }, Object.create(null)));
    };

    'val|var|_val|_var'.split('|').forEach(function (keyword) {
        factory[keyword] = function (name, defaultValue) {
            return createFactory(descriptors.filter(function (descriptor) {
                return descriptor.name !== name;
            }).concat({
                keyword: keyword,
                name: name,
                defaultValue: defaultValue,
                enumerable: /^v/.test(keyword),
                writable: /var/.test(keyword)
            }));
        };
    });

    factory.ext = function (factory) {
        return descriptors.reduce(function (factory, descriptor) {
            return factory[descriptor.keyword](descriptor.name, descriptor.defaultValue);
        }, factory);
    };

    return Object.freeze(factory);
};

exports.createObject = createFactory([]);
