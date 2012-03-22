Bond - A Simple CommonJS Promises Implementation
================================================

Bond is a simple implementation of the [Promises/A](http://wiki.commonjs.org/wiki/Promises/A "CommonJS Promises/A Proposal") specification.

It allows authors to write promise-compatible methods; which in turn allow users to add multiple functions to call on "success" or "failure" of the original call.

Example
-------
    
    
    // This is a promise-compatible method that
    // waits for 10 milliseconds and then keep
    // or break the promise depending on the
    // 'pass' argument.
    var wait10millis = function(pass) {
        var dfd = bond.deferred();
        setTimeout(function() {
            if ( pass ) {
                dfd.resolve();
            } else {
                dfd.reject();
            }
        }, 10);
        // promise methods must return a promise
        return dfd.promise();
    };
    
    
    // USAGE EXAMPLES:
    
    // single "then()" (or 'success')
    wait10millis(true).then(function() {
        alert('yay');
    });
    
    // single "then()", single "fail()":
    wait10millis( (Math.rand()>0.5) )
        .then(function() { alert('yay'); })
        .fail(function() { alert('boo'); });
    
    // keep the promise to add more methods later
    var promise = wait10millis( (Math.rand()>0.5) );
    // NB - this will all happen long after the 10 millis
    setTimeout(function() {
        promise.then(function() { alert('hi'); });
        promise.then(function() { alert('ho'); });
        promise.fail(function() { alert('no'); });
        promise.fail(function() { alert('go'); });
    }, 100);