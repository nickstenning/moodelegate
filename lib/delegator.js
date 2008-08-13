var Delegator = new Class({
    
    quirks: {
        focus: 'handleFocus',
        blur: 'handleBlur',
        reset: 'handleFormAction',
        submit: 'handleFormAction'
    },
    
    initialize: function(element, selector, type, fn, binding) {
        this.element = $(element);
        this.type = type;
        this.selector = selector;
        this.fn = fn;
        this.binding = binding;
        
        this.eventHandler = function (e) {
            if (e.target.match(selector)) {
                return fn.apply($pick(binding, $(e.target)), [e]);
            }
        };
    },
    
    delegate: function () {        
        $pick(this[this.quirks[this.type]], this.handle).apply(this);
        return this.element;
    },
    
    handle: function () {
        this.element.addEvent(this.type, this.eventHandler);
    },
    
    handleFocus: function () {
        if (Browser.Engine.trident) {
            this.element.onfocusin = this.eventHandler;
        } else {            
            this.handleCapture();
        }
    },
    
    handleBlur: function () {
        if (Browser.Engine.trident) {
            this.element.onfocusout = this.eventHandler;
        } else {
            this.handleCapture();
        }
    },
    
    handleCapture: function () {
        // The last argument to addEventListener causes the event to be raised
        // on capture, rather than on bubble. See http://tinyurl.com/636x4d
        this.element.addEventListener(this.type, this.eventHandler, true);        
    },
    
    handleFormAction: function () {        
        this.element.addEvent('click', function (e) {
            // If target element is an {input,button} with type this.type, which
            // will be either reset or submit, raise the event on the element's
            // form.
            if ( $(e.target).match('[type=' + this.type + ']') &&
                 $(e.target.form).match(this.selector) ) {
                
                return this.fn.apply($pick(this.binding, $(e.target.form)), [e]);
            }
        }.bind(this));
    }
});

Element.implement({
    delegate: function (selector, type, fn, binding) {
        return new Delegator(this, selector, type, fn, binding).delegate();
    }
});