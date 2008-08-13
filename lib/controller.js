var Controller = new Class({
    
    controls: {},
    
    initialize: function (element, controls) {
        this.element = element;
        this.element.store('app:controller', this);
        this.setControls(controls);
        this.delegateControls();
    },
    
    setControls: function (controls) {
        this.controls = $merge(this.controls, controls);
    },
    
    delegateControls: function () {
        $each(this.controls, function (fn, desc) {
            var desc = desc.trim().split(" "), type = desc.pop(), selector = desc.join(" ");
            this.element.delegate(selector, type, fn, this); 
        }, this);
    }
});

Element.implement({
    controller: function () {
        return this.retrieve('app:controller');
    }
});