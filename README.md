MooDelegate
===========

A simple library for event delegation using the 
(MooTools)[http://mootools.net] JavaScript library. At it's simplest, 
delegator.js implements a #delegate method on Element, so you can call:

    $('myelement').delegate('li.delete', 'click', function () {
        this.dispose();
    });

This would make sure that any child of 'myelement' that was a list item with 
the class "delete" would be removed from the DOM when it was clicked. This 
applies no matter when the list item was added to the DOM: even if it was 
added *after* the call to delegate.

A more advanced (and yet simpler) way to use MooDelegate is to use the 
included Controller class:

HTML:

    <div id="textsizeController">
      <span>Hello</span>
      <button id="bigger">Bigger</button>
      <button id="smaller">Smaller</button>
    </div>

JS:

    var TextSizeController = new Class({
      Extends: Controller,
      
      // ... see examples/textsize.html for the full example.
      
      controls: {
          '#bigger click': function () {
            this.increaseSize();
          },
          '#smaller click': function () {
            this.decreaseSize();
          }
      }
  
    });

    window.addEvent('domready', function () {
      new TextSizeController($('textsizeController'));
    });


OK, so it's a silly example, but you should get the idea. Once you've made
that call to new TextSizeController in the above example, you could remove the
"bigger" button from the DOM, to prevent the user making the text bigger, and then put it back in, and it would work just as expected.

