(function() {
    'use strict';
    var _ = require('../src/misc');

    describe('misc', function() {
        describe('slice', function() {
            // Known polyfill MDN, no need to test
        });
        describe('keys', function() {
            // Known polyfill MDN, no need to test
        });
        describe('values', function() {
            it('Basic object', function() {
                expect(_.values({ hello: 'world' })).toEqual([ 'world' ]);
            });
            it('Complex object', function() {
                expect(_.values({ hello: 'world', mine: {} })).toEqual([ 'world', {} ]);
            });
            it('Array returns same array', function() {
                expect(_.values([ '1', '2', '3' ])).toEqual([ '1', '2', '3' ]);
            });
        });
        describe('toMap', function() {
            it('Basic array', function() {
                expect(_.toMap([
                    { id: 123 },
                    { id: 456 },
                    { hell: 34, id: 999 }
                ], 'id'))
                    .toEqual({ 123: { id: 123 }, 456: { id: 456 }, 999: { hell: 34, id: 999 } });
            });
            it('Basic array function', function() {
                expect(_.toMap([
                    { id: 123 },
                    { id: 456 }
                ], function(obj) {
                    return obj.id;
                })).toEqual({ 123: { id: 123 }, 456: { id: 456 } });
            });
            it('Basic array objects', function() {
                expect(_.toMap([
                    { id: { fun: 'fun' } },
                    { id: { fun: 123 } }
                ], function(obj) {
                    return obj.id.fun;
                })).toEqual({ fun: { id: { fun: 'fun' } }, 123: { id: { fun: 123 } } });
            });

            it('Missing key is not added to map', function() {
                expect(_.toMap([
                    { id: 123 },
                    { id: 456 },
                    { hell: 34 }
                ], 'id'))
                    .toEqual({ 123: { id: 123 }, 456: { id: 456 } });
            });
        });
        describe('bind', function() {
            // Known polyfill MDN, no need to test
        });
        describe('capitalize', function() {
            it('capitalizes first letter of a string', function() {
                var string = 'this is a string.';
                expect(_.capitalize(string)).toEqual('This is a string.');
            });
            it('returns correct string if string starts with a capital already', function() {
                var string = 'This is a string.';
                expect(_.capitalize(string)).toEqual('This is a string.');
            });
            it('returns correct string if character in the middle is capitalized', function() {
                var string = 'this is a STRING!';
                expect(_.capitalize(string)).toEqual('This is a STRING!');
            });
        });
        describe('indexOf', function() {
            // Known polyfill MDN, no need to test
        });
        describe('contains', function() {
            it('array with numbers', function() {
                expect(_.contains([ 1, 2, 3 ], 2)).toBe(true);
            });
            it('array with numbers not in array', function() {
                expect(_.contains([ 1, 2, 3 ], 9)).toBe(false);
            });
            it('array with objects not same instance', function() {
                expect(_.contains([
                    {},
                    {},
                    {}
                ], {})).toBe(false);
            });
            it('array with objects in array', function() {
                var a = {};
                expect(_.contains([
                    {},
                    {},
                    a
                ], a)).toBe(true);
            });
            it('string in the string', function() {
                expect(_.contains('hello world', 'hello')).toBe(true);
            });
            it('string not in the string', function() {
                expect(_.contains('hello world', 'helloo')).toBe(false);
            });
            it('string passed the starting index', function() {
                expect(_.contains('hello world', 'hello', 1)).toBe(false);
            });
            it('string passed the starting index, but there', function() {
                expect(_.contains('hello world', 'world', 6)).toBe(true);
            });
        });
        describe('extend', function() {
            it('No extend returns original object', function() {
                expect(_.extend({ hello: 'world' })).toEqual({ hello: 'world' });
            });
            it('Basic extend', function() {
                expect(_.extend({ hello: 'world' }, { test: 1234 })).toEqual({ hello: 'world', test: 1234 });
            });
            it('Overrides replace original properties', function() {
                expect(_.extend({ hello: 'world' }, { test: 1234, hello: 'cool' }))
                    .toEqual({ hello: 'cool', test: 1234 });
            });
            it('Overrides replace original properties second object', function() {
                expect(_.extend({ hello: 'world' }, { test: 1234, hello: 'cool' }, { hello: 3 }))
                    .toEqual({ hello: 3, test: 1234 });
            });
            it('Third object adds to original', function() {
                expect(_.extend({ hello: 'world' }, { test: 1234, hello: 'cool' }, { nice: 3 }))
                    .toEqual({ hello: 'cool', nice: 3, test: 1234 });
            });
            it('Third object adds to original with undefined', function() {
                expect(_.extend({ hello: 'world' }, { test: 1234, hello: 'cool' }, { nice: null, yes: undefined }))
                    .toEqual({ hello: 'cool', nice: null, test: 1234, yes: undefined });
            });
            it('Original object is changed by extend', function() {
                var originalObj = { hello: 'world' };
                _.extend(originalObj, { test: 1234, hello: 'cool' }, { nice: 3 });
                expect(originalObj).toEqual({ hello: 'cool', nice: 3, test: 1234 });
            });
        });
        describe('deepExtend', function() {
            it('No extend returns original object', function() {
                expect(_.deepExtend({ hello: 'world' })).toEqual({ hello: 'world' });
            });
            it('Basic extend', function() {
                expect(_.deepExtend({ hello: { test: 567 } }, { test: 1234 }))
                    .toEqual({ hello: { test: 567 }, test: 1234 });
            });
            it('Overrides replace original properties', function() {
                expect(
                    _.deepExtend(
                        {
                            hello: {
                                test: 'nice',
                                me: 'you'
                            }
                        }, {
                            test: 1234,
                            hello: {
                                test: 123,
                                nice: 546
                            }
                        }
                    )
                ).toEqual(
                    {
                        hello: {
                            test: 123,
                            me: 'you',
                            nice: 546
                        },
                        test: 1234
                    }
                );
            });
            it('Works 3 levels deep', function() {
                expect(
                    _.deepExtend(
                        {
                            hello: {
                                test: 'nice',
                                me: 'you'
                            }
                        }, {
                            test: 1234,
                            hello: {
                                test: 123,
                                nice: 546,
                                yes: {
                                    no: 55
                                }
                            }
                        }
                    )
                ).toEqual(
                    {
                        hello: {
                            test: 123,
                            me: 'you',
                            nice: 546,
                            yes: {
                                no: 55
                            }
                        },
                        test: 1234
                    }
                );
            });
            it('Creates 3 levels deep', function() {
                expect(_.deepExtend(
                    {},
                    {
                        test: 1234,
                        hello: {
                            test: 123,
                            nice: 546,
                            yes: {
                                no: 55
                            }
                        }
                    }
                )).toEqual(
                    {
                        hello: {
                            test: 123,
                            nice: 546,
                            yes: {
                                no: 55
                            }
                        },
                        test: 1234
                    }
                );
            });
            it('Updates original and not second', function() {
                var first = {},
                    second = {};

                _.deepExtend(first, second, { hello: 'world' });
                expect(first).toEqual({ hello: 'world' });
                expect(second).toEqual({});
            });
        });
        describe('inherit', function() {
            it('Basic inheritance', function() {
                function Car() {}

                Car.prototype.drive = function() {};

                function Truck() {}

                _.inherit(Truck, Car);
                expect(Truck.prototype.drive).toBe(Car.prototype.drive);
            });
            it('Basic inheritance instanceof', function() {
                function Car() {}

                Car.prototype.drive = function() {};

                function Truck() {}

                _.inherit(Truck, Car);
                var tr = new Truck();
                expect(tr instanceof Car).toBe(true);
            });
            it('Basic inheritance isPrototypeOf', function() {
                function Car() {}

                Car.prototype.drive = function() {};

                function Truck() {}

                _.inherit(Truck, Car);
                var tr = new Truck();
                expect(Car.prototype.isPrototypeOf(tr)).toBe(true);
            });

            it('Works with params', function() {
                function Car() {}

                Car.prototype.drive = function() {};

                function Truck() {}

                _.inherit(Truck, Car);
                var tr = new Truck();
                expect(tr instanceof Car).toBe(true);
            });
        });
        describe('trim', function() {
            it('No trimming needed', function() {
                expect(_.trim('hello')).toBe('hello');
            });
            it('Pre trimming', function() {
                expect(_.trim('  hello')).toBe('hello');
            });
            it('Post trimming', function() {
                expect(_.trim('hello  ')).toBe('hello');
            });
            it('Pre and post trimming', function() {
                expect(_.trim('      hello  ')).toBe('hello');
            });
            it('middle no trimming', function() {
                expect(_.trim('      he  llo  ')).toBe('he  llo');
            });
        });
        describe('map', function() {
            it('Basic array conversion', function() {
                var arr = [ 1, 2, 3 ];
                expect(_.map(arr, function(item) {
                    return item + 1;
                })).toEqual([ 2, 3, 4 ]);
            });
            it('object conversion', function() {
                var arr = [
                    { test: 1 },
                    { test: 2 },
                    { test: 3 }
                ];
                expect(_.map(arr, function(item) {
                    return item.test + 1;
                })).toEqual([ 2, 3, 4 ]);
            });
            it('context', function() {
                var arr = [
                    { test: 1 },
                    { test: 2 },
                    { test: 3 }
                ];
                expect(_.map(arr, function() {
                    return this;
                }, 55)).toEqual([ 55, 55, 55 ]);
            });
            it('index', function() {
                var arr = [
                    { test: 1 },
                    { test: 2 },
                    { test: 3 }
                ];
                expect(_.map(arr, function(item, index) {
                    return index;
                }, 55)).toEqual([ 0, 1, 2 ]);
            });
        });
        describe('pick', function() {
            it('Empty array returns empty object', function() {
                expect(_.pick({}, [])).toEqual({});
            });
            it('Single param', function() {
                expect(_.pick({ hello: 123, yes: 456, no: 999 }, [ 'yes' ])).toEqual({ yes: 456 });
            });
            it('Multi param', function() {
                expect(_.pick({ hello: 123, yes: 456, no: 999 }, [ 'yes', 'no' ])).toEqual({ yes: 456, no: 999 });
            });
            it('null throws error', function() {
                expect(function() {
                    _.pick(null, [ 'yes', 'no' ]);
                }).toThrow();
            });
            it('null array throws error', function() {
                expect(function() {
                    _.pick({ hello: 123, yes: 456, no: 999 }, null);
                }).toThrow();
            });
            it('check proxy', function() {
                var a = {
                    _test: function() {},
                    nice: function() {},
                    one: function() {
                        this._test();
                    }
                };
                var newObj = _.pick(a, [ 'nice', 'one' ], true);
                newObj.one();
                expect(newObj.hasOwnProperty('nice')).toBe(true);
                expect(newObj.hasOwnProperty('one')).toBe(true);
                expect(newObj.hasOwnProperty('_test')).toBe(false);
            });
        });
        describe('debounce', function() {
            it('debounce returns a function', function() {
                var a = _.debounce(function() {}, 100);
                expect(typeof a === 'function').toBe(true);
            });
            describe('single debounce', function() {
                var temp = {
                        func: function() {
                            return true;
                        }
                    };
                beforeEach(function(done) {
                    spyOn(temp, 'func');

                    var a = _.debounce(function() {
                        temp.func();
                        done();
                    }, 200);

                    a();
                });
                it('single function call', function(done) {
                    expect(temp.func).toHaveBeenCalled();
                    done();
                });
            });
            describe('multiple debounce', function() {
                var a, temp = {
                    func: function() {
                        return true;
                    }
                };
                beforeEach(function(done) {
                    spyOn(temp, 'func');
                    a = _.debounce(function() {
                        temp.func();
                        done();
                    }, 200);
                    a();
                    setTimeout(function() {
                        setTimeout(function() {
                            a();
                        }, 30);
                    }, 30);
                });
                it('3 debounce calls', function(done) {
                    expect(temp.func).toHaveBeenCalled();
                    done();
                });
            });
        });
        describe('isArray', function() {
            it('Actual array', function() {
                expect(_.isArray([])).toBe(true);
            });
            /* jshint -W009 */
            it('Actual array (new Array)', function() {
                expect(_.isArray(new Array())).toBe(true);
            });
            /* jshint +W009 */
            it('larger array', function() {
                expect(_.isArray([ 1, 2, 3, 4, 5, 6 ])).toBe(true);
            });
            it('Arguments (array like)', function() {
                expect(_.isArray(arguments)).toBe(false);
            });
            it('Object', function() {
                expect(_.isArray({})).toBe(false);
            });
            it('null', function() {
                expect(_.isArray(null)).toBe(false);
            });
            it('undefined', function() {
                expect(_.isArray(undefined)).toBe(false);
            });
        });
        describe('isObject', function() {
            it('Actual object', function() {
                expect(_.isObject({})).toBe(true);
            });
            /* jshint -W010 */
            it('Actual object (new Object)', function() {
                expect(_.isObject(new Object())).toBe(true);
            });
            /* jshint +W010 */
            it('larger object', function() {
                expect(_.isObject({
                    hello: 'world',
                    fun: {
                        test: 1234
                    },
                    nice: 1
                })).toBe(true);
            });
            it('Array', function() {
                expect(_.isObject([])).toBe(false);
            });
            it('Function', function() {
                expect(_.isObject(function() {})).toBe(false);
            });
            it('arguments', function() {
                expect(_.isObject(arguments)).toBe(false);
            });
            it('string', function() {
                expect(_.isObject('hello world')).toBe(false);
            });
            /* jshint -W053 */
            it('Object String', function() {
                expect(_.isObject(new String('hello world'))).toBe(false);
            });
            /* jshint +W053 */
            it('empty string', function() {
                expect(_.isObject('')).toBe(false);
            });
            it('number', function() {
                expect(_.isObject(1)).toBe(false);
            });
            it('0', function() {
                expect(_.isObject(0)).toBe(false);
            });
            it('NaN', function() {
                expect(_.isObject(NaN)).toBe(false);
            });
            it('null', function() {
                expect(_.isObject(null)).toBe(false);
            });
            it('undefined', function() {
                expect(_.isObject(undefined)).toBe(false);
            });
        });
        describe('containsObj', function() {
            it('same reference', function() {
                var obj = {};
                expect(_.containsObj(obj, obj)).toBe(true);
            });
            it('2 empty objects', function() {
                expect(_.containsObj({}, {})).toBe(true);
            });
            it('1 property', function() {
                expect(_.containsObj({
                    hello: 'world'
                }, {})).toBe(true);
            });
            it('multiple properties', function() {
                expect(_.containsObj({
                    hello: 'world',
                    fun: 1,
                    yes: 'sir'
                }, {
                    hello: 'world',
                    fun: 1
                })).toBe(true);
            });
            it('sub objects', function() {
                expect(_.containsObj({
                    hello: {
                        world: 3,
                        test: 'me'
                    },
                    fun: 1,
                    yes: 'sir'
                }, {
                    hello: {
                        world: 3
                    },
                    fun: 1
                })).toBe(true);
            });
            it('functions match', function() {
                expect(_.containsObj({
                    fun: function() {},
                    hello: 'world'
                }, {
                    fun: function() {}
                })).toBe(true);
            });
            it('arrays match', function() {
                expect(_.containsObj({
                    fun: [ 5, 6, 7 ]
                }, {
                    fun: [ 5, 6, 7 ]
                })).toBe(true);
            });
            it('arrays match', function() {
                expect(_.containsObj({
                    fun: [ 5, 6, 7 ]
                }, {
                    fun: [ 5, 9, 7 ]
                })).toBe(false);
            });
            it('type mismatch', function() {
                expect(_.containsObj({
                    hello: 'world',
                    fun: 1,
                    yes: 'sir'
                }, {
                    hello: {
                        world: 3
                    },
                    fun: 1
                })).toBe(false);
            });
            it('no properties', function() {
                expect(_.containsObj({}, {
                    fun: 1
                })).toBe(false);
            });
        });
        describe('safeFn', function() {
            it('Returns error on error', function() {
                var error = new Error();
                expect(_.safeFn(function() {
                    throw error;
                })()).toBe(error);
            });
            it('Calls error fn on error', function() {
                var error = new Error(), resultError;
                _.safeFn(function() {
                    throw error;
                }, function(e) {
                    resultError = e;
                })();
                expect(resultError).toBe(error);
            });
            it('returns value on success', function() {
                expect(_.safeFn(function() {
                    return 'hello';
                })()).toBe('hello');
            });
            it('this value works', function() {
                function Hello() {}

                Hello.prototype.test = _.safeFn(function() {
                    return this.fun;
                });
                var h = new Hello();
                h.fun = 'cool';
                expect(h.test()).toBe('cool');
            });
        });
    });
})();