

(function(root, undefined) {

    var pact = {};

    var Deferred = function() {
        var dfd,
            resolved = null,
            resolvedArgs,
            prm,
            doneFns = [],
            failFns = [],
            progressFns = [],
            Promise;

        prm = {
            done: function(fn) {
                if ( typeof fn == 'function' ) {
                    if ( resolved === null ) {
                        doneFns.push(fn);
                    } else if ( resolved === true ) {
                        fn.apply(root, resolvedArgs);
                    }
                }
                return prm;
            },
            fail: function(fn) {
                if ( typeof fn == 'function' ) {
                    if ( resolved === null ) {
                        console.log('pushing', fn);
                        failFns.push(fn);
                    } else if ( resolved === false ) {
                        fn.apply(root, resolvedArgs);
                    }
                }
                return prm;
            },
            progress: function(fn) {
                if ( typeof fn == 'function' ) {
                    if ( resolved === null ) {
                        progressFns.push(fn);
                    }
                }
                return prm;
            },
            then: function(doneFn, progressFn, failFn) {
                prm.done(doneFn);
                prm.progress(progressFn);
                prm.fail(failFn);
                return prm;
            }
        };

        dfd = {
            promise: function() {
                return prm;
            },
            resolve: function() {
                resolved = true;
                resolvedArgs = Array.prototype.slice.call(arguments);
                doneFns.forEach(function(fn) {
                    fn.apply(root, resolvedArgs);
                });
            },
            reject: function() {
                resolved = false;
                resolvedArgs = Array.prototype.slice.call(arguments);
                failFns.forEach(function(fn) {
                    console.log('failFn', fn);
                    fn.apply(root, resolvedArgs);
                });
            },
            notify: function() {
                var progressArgs = Array.prototype.slice.call(arguments);
                progressFns.forEach(function(fn) {
                    fn.apply(root, progressArgs);
                });
            },
            resolved: function() {
                return resolved;
            }
        };
        return dfd;
    };

    pact.Deferred = Deferred;
    pact.deferred = function() {
        return new Deferred();
    };

    if ( typeof module !== 'undefined' && module.exports ) {
        module.exports.pact = pact;
    } else if ( typeof exports !== 'undefined' ) {
        exports.pact = pact;
    } else {
        root.pact = pact;
    }

})(this);

