describe("pact", function() {
    
        var wait100millis = function(pass) {
            var dfd = pact.deferred();
            setTimeout(function() {
                resolverVal = pass;
                if ( pass ) {
                    dfd.resolve();
                } else {
                    dfd.reject();
                }
            }, 100);
            return dfd.promise();
        };
        var wait100millisAndPass = function() {
            return wait100millis(true);
        };
        var wait100millisAndFail = function() {
            return wait100millis(false);
        };
        
        var testResolved = function() {
            return (resolverVal !== null);
        };
    
    
    
    it("should fire 'then' functions when async operations are complete", function() {
        
        var success = null;
        wait100millisAndPass().then(function() {
            success = true;
        });
        
        expect(success).toBe(null);
        
        waitsFor(function() {
            return (success !== null);
        }, "then() function to be fired ", 200);
        
        runs(function() {
            expect(success).toBeTruthy();
        });
        
    });
    
});