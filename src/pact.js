



var pact = {};


(function(pact) {
    
    var Deferred = function() {
        
    };
    Deferred.prototype.promise = function() {
        if ( !this.__promise__ ) {
            this.__promise__ = new Promise();
        }
        return this.__promise__;
    };
    Deferred.prototype.resolve = function() {
        var p = this.__promise__.__thens__;
        for ( var t in p ) {
            p[t]();
        }
    };
    Deferred.prototype.reject = function() {
        var p = this.__promise__.__fails__;
        for ( var t in p ) {
            p[t]();
        }
    };
    
    
    
    var Promise = function() {
        this.__thens__ = [];
        this.__fails__ = [];
        return this;
    };
    Promise.prototype.then = function(cb) {
        this.__thens__.push(cb);
        return this;
    };
    Promise.prototype.fail = function(cb) {
        this.__fails__.push(cb);
        return this;
    };
    
    
    pact.deferred = function() {
        return new Deferred();
    };
    
    
    
    
    
    return pact;
})(pact);
