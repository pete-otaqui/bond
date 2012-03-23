describe("bond", function() {
    
        var wait10millis = function(pass) {
            var dfd = bond.deferred();
            setTimeout(function() {
                resolverVal = pass;
                if ( pass ) {
                    dfd.resolve();
                } else {
                    dfd.reject();
                }
            }, 10);
            return dfd.promise();
        };
        var wait10millisAndPass = function() {
            return wait10millis(true);
        };
        var wait10millisAndFail = function() {
            return wait10millis(false);
        };
        
        var testResolved = function() {
            return (resolverVal !== null);
        };
    
    
    
    it("should fire a 'then' function when an async operations completes", function() {
        
        var success = null;
        wait10millisAndPass().then(function() {
            success = true;
        });
        
        expect(success).toBe(null);
        
        waitsFor(function() {
            return (success !== null);
        }, "then() function to be fired ", 20);
        
        runs(function() {
            expect(success).toBeTruthy();
        });
        
    });
    
    it("should fire multiple 'then' functions when an async operation completes", function() {
        
        var success1 = null;
        var success2 = null;
        
        wait10millisAndPass()
            .then(function() {
                success1 = true;
            })
            .then(function() {
                success2 = true;
            });
        
        expect(success1).toBe(null);
        expect(success2).toBe(null);
        
        waitsFor(function() {
            return (success1 !== null && success2 !== null);
        }, "then() function to be fired ", 20);
        
        runs(function() {
            expect(success1).toBeTruthy();
            expect(success2).toBeTruthy();
        });
        
    });
    
    it("should fire a 'fail' function when an async operation fails", function() {
        
        var success = -1;
        
        wait10millisAndFail()
            .then(function() {
                success = 1;
            })
            .fail(function() {
                success = 0;
            });
        
        waitsFor(function() {
            return (success !== -1);
        }, "then() or fail() function to be fired", 20);
        
        runs(function() {
            expect(success).toEqual(0);
        });
    });
    
    it("should fire multiple 'fail' functions when an async operation fails", function() {
        
        var success1 = -1;
        var success2 = -1;
        
        wait10millisAndFail()
            .then(function() {
                success1 = 1;
                success2 = 1;
            })
            .fail(function() {
                success1 = 0;
                success2 = 0;
            });
            
        expect(success1).toBe(-1);
        expect(success2).toBe(-1);
        
        waitsFor(function() {
            return (success1 !== -1 && success2 !== -1);
        }, "then() or fail() function to be fired", 20);
        
        runs(function() {
            expect(success1).toEqual(0);
            expect(success2).toEqual(0);
        });
    });
    
    it("should allow for unchained, asynchronous addition of then() functions", function() {
        
        var success1 = null;
        var success2 = null;
        
        var promise = wait10millisAndPass();
        promise.then(function() {
            success1 = true;
        });
        
        setTimeout(function() {
            promise.then(function() {
                success2 = true;
            });
        }, 5);
        
        expect(success1).toBe(null);
        expect(success2).toBe(null);
        
        waitsFor(function() {
            return (success1 !== null && success2 !== null);
        }, "then() function to be fired ", 20);
        
        runs(function() {
            expect(success1).toBeTruthy();
            expect(success2).toBeTruthy();
        });
        
    });

    it("should support multiple arguments for resolution", function() {

        var args = null;
        var dfd = bond.deferred();
        var prm = dfd.promise();

        prm.done(function(f, b) {
            args = arguments;
        });

        setTimeout(function() {
            dfd.resolve('foo', 'bar');
        }, 10);
        
        waitsFor(function() {
            return (args !== null);
        }, "done() didn't fire", 20);
        
        runs(function() {
            expect(typeof args).toEqual('object');
            expect(args.length).toEqual(2);
            expect(args[0]).toEqual('foo');
            expect(args[1]).toEqual('bar');
        });

    });

    it("should support multiple arguments for rejection", function() {

        var args = null;
        var dfd = bond.deferred();
        var prm = dfd.promise();

        prm.fail(function(f, b) {
            args = arguments;
        });

        setTimeout(function() {
            dfd.reject('foo', 'bar');
        }, 10);
        
        waitsFor(function() {
            return (args !== null);
        }, "done() didn't fire", 20);
        
        runs(function() {
            expect(typeof args).toEqual('object');
            expect(args.length).toEqual(2);
            expect(args[0]).toEqual('foo');
            expect(args[1]).toEqual('bar');
        });

    });
    
});