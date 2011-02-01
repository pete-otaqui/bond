



var pact = {};


(function(pact) {
    
    var Deferred = function() {
        this._resolved = false;
    };
    Deferred.prototype.promise = function() {
        if ( !this.__promise__ ) {
            this.__promise__ = new Promise();
        }
        return this.__promise__;
    };
    Deferred.prototype.resolve = function() {
        this.__promise__.__resolved__ = true;
        var p = this.__promise__.__thens__;
        for ( var t in p ) {
            p[t]();
        }
    };
    Deferred.prototype.reject = function() {
        this.__promise__.__rejected__ = true;
        var p = this.__promise__.__fails__;
        for ( var t in p ) {
            p[t]();
        }
    };
    
    
    
    var Promise = function() {
        // @fixme this shouldn't all be visible in a promise
        // but should be in a private scope
        this.__thens__ = [];
        this.__fails__ = [];
        this.__resolved__ = false;
        this.__rejected__ = false;
        return this;
    };
    Promise.prototype.then = function(cb) {
        if ( !this.__resolved__ ) {
            this.__thens__.push(cb);
        } else {
            cb();
        }
        return this;
    };
    Promise.prototype.fail = function(cb) {
        if ( !this.__rejected__ ) {
            this.__fails__.push(cb);
        } else {
            cb();
        }
        return this;
    };
    
    
    pact.deferred = function() {
        return new Deferred();
    };
    
    
    
    
    
    return pact;
})(pact);
