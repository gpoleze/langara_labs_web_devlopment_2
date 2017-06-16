// 
// Add an indexOf method to the array object if it doesn't exist already.  
// Code stolen from: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this === void 0 || this === null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n !== n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}


// Note the wrapper around the functions so that what is provided doesn't pollute the global namespace!
var langara = (function () {
    //
    //  A home grown get method that gets the value of an element based on the id.
    //  It does the obvious "right" thing about getting the value from inside the element, no matter what it is.
    //  If the value true is passed as the optional 2nd argument, then you get back the whole object instead of 
    //  just the "value inside" the object.
    //  If the id refers to a multiple select then the value gotten is an array of all the selected values
    //
    var get = function (id, wantObjectOnly) {
        if (typeof id !== 'string') {
            throw new ReferenceError("Id: '" + id + "' must be a string!");
        } else {
            // if (wantObjectOnly == null)  // deal with optional 2nd argument
            //     wantObjectOnly = false;
            var specialFormElements = ["radio", "checkbox"];
            var multipleSelectElement = ["select-multiple"];
            var regularFormElements = ["button", "color", "date", "datetime", "datetime-local",
                "email", "file", "hidden", "image", "month", "number",
                "password", "range", "reset", "search", "select-one",
                "submit", "tel", "text", "textarea", "time", "url", "week"];
			var objectFormElements = ["canvas"];

            var h = document.getElementById(id);
            if (h === null) // error! id doesn't exist in DOM
            	throw new ReferenceError("Id: '" + id + "' does not exist.  Check your spelling!");
            else if (wantObjectOnly || objectFormElements.indexOf(h.type) >= 0) return h;
            else if (specialFormElements.indexOf(h.type) >= 0) // it's a special 'radio' form element
            	return h.checked;
            else if (multipleSelectElement.indexOf(h.type) >= 0) // it's a multiple select
            {
                var completeList = [];
                for (var index = 0; index < h.options.length; index++) { // create a list of elements from the options
                    //alert ("Here is the option:" + opt + "\ntype: " + opt.type);
                    if (h.options[index].selected) completeList.push(h.options[index].value);
                }
                return completeList;
            } else if (regularFormElements.indexOf(h.type) >= 0) // it's a regular form element
            	return h.value;
            else // it's not a form element so it's probably just a text element
           		return h.innerHTML;
        }
    };
    //
    // A home grown set method that takes the id of an element and sets the value appropriately.
    // It does the obvious "right" thing depending on what the element type is.
    //
    var set = function (id, value) {
        if (typeof id !== 'string') {
            throw new ReferenceError("Id: '" + id + "' must be a string!");
        } else {

            var specialFormElements = ["radio", "checkbox"];
            var regularFormElements = ["button", "color", "date", "datetime", "datetime-local",
                "email", "file", "hidden", "image", "month", "number",
                "password", "range", "reset", "search", "select-one", "select-multiple", // the two forms of select have not been tested
            	"submit", "tel", "text", "textarea", "time", "url", "week"];
			var objectFormElements = ["canvas"];
			

            var h = document.getElementById(id);
            if (h === null) // error id doesn't exist in DOM
            	throw new ReferenceError("Id: '" + id + "' does not exist.  Check your spelling!");
			else if (objectFormElements.indexOf(h.type) >= 0)
				return;		//what is the right thing when setting a canvas object?
            else if (specialFormElements.indexOf(h.type) >= 0) // it's a special 'radio' form element
            	h.checked = value;
            else if (regularFormElements.indexOf(h.type) >= 0) // it's a regular form element
            	h.value = value;
            else // it's not a form element so it's probably just a text element
            	h.innerHTML = value;
        }
    };

    // Event functions from http://www.quirksmode.org/js/eventSimple.html
    // (originally obtained from http://code.google.com/edu/submissions/html-css-javascript/
    // Converted to a library, qmUtils, by Cathy Levinson, Nov-3-2012
    // Finally added here. Jan 1, 2013 by Bryan Green, so students from 1045 and 2030 can use the same library

    var addEventSimple = function (el, evt, fn) {
		if (!el) {
			throw new ReferenceError("No DOM element given!");
		} else {
			if (typeof evt !== 'string') {
				throw new ReferenceError("Event Type: '" + evt + "' must be a string!");
			} else {
				if (typeof fn !== 'function') {
					throw new ReferenceError("Event Handler: '" + fn + "' must be a function!");
				} else {			
					if (el.addEventListener) {
						el.addEventListener(evt, fn, false);
					} else if (el.attachEvent) {
						el.attachEvent('on' + evt, fn);
					}
				}
			}
		}
    };

    var removeEventSimple = function (el, evt, fn) {
		if (!el) {
			throw new ReferenceError("No DOM element given!");
		} else {
			if (typeof evt !== 'string') {
				throw new ReferenceError("Event Type: '" + evt + "' must be a string!");
			} else {
				if (typeof fn !== 'function') {
					throw new ReferenceError("Event Handler: '" + fn + "' must be a function!");
				} else {			
					if (el.removeEventListener) {
						el.removeEventListener(evt, fn, false);
					} else if (el.detachEvent) {
						el.detachEvent('on' + evt, fn);
					}
				}
			}
		}
    };
    // alias
    var addEvent = addEventSimple;
    var removeEvent = removeEventSimple;

    // Add/remove/has class functions from http://snipplr.com/view/3561/addclass-removeclass-hasclass/
    var hasClass = function (ele, cls) {
		if (!ele) {
			throw new ReferenceError("No DOM element given!");
		} else {
			if (typeof cls !== 'string') {
				throw new ReferenceError("Class Name: '" + cls + "' must be a string!");
			} else {
      			  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
			}
		}
    };

    var addClass = function (ele, cls) {
        if (!hasClass(ele, cls)) {
            ele.className += " " + cls;
			// Replace multiple adjacent spaces with one, 
			// finally remove single spaces at beginning or end of string.
			ele.className = ele.className.replace(/\s+/g,' ').replace(/^\s|\s$/,'');
        }
    };

    var removeClass = function (ele, cls) {
        if (hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			//replace the desired classname with a space, then replace multiple adjacent spaces with one, 
			//finally remove single spaces at beginning or end of string.
            ele.className = ele.className.replace(reg, ' ').replace(/\s+/g,' ').replace(/^\s|\s$/,''); 
        }
    };

    // getElementsByClass function from ddiaz
    var getElementsByClass = function (searchClass, node, tag) {
		if (!searchClass || typeof searchClass !== 'string') {
			throw new ReferenceError("Class Name: '" + searchClass + "' must be a string!");
		} else {
			var classElements = [];
			if (!node) {
				node = document;
			} else if (typeof node !== 'object'){
				throw new ReferenceError("Node: '" + node + "' must be a DOM element!");
			}
			if (!tag) {
				tag = '*';
			} else if (typeof tag !== 'string') {
				throw new ReferenceError("Tag: '" + tag + "' must be a string!");
			}
			
			var els = node.getElementsByTagName(tag);
			var elsLen = els.length;
			var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
			for (i = 0, j = 0; i < elsLen; i++) {
				if (pattern.test(els[i].className)) {
					classElements[j] = els[i];
					j++;
				}
			}
			return classElements;
		}
    };

    // Checks if id is valid. If not, logs an error. Otherwise, it registers the event handler.
    var registerEventHandler = function (id, event, handler) {
        if (typeof id !== 'string') {
            throw new ReferenceError("Id: '" + id + "' must be a string!");
        } else {
			var inputThing = document.getElementById(id); // find it in the DOM
			if (inputThing) {
				langara.addEventSimple(inputThing, event, handler);
			} else {
				throw new ReferenceError("Id: '" + id + "' does not exist.  Check your spelling!");
			}
		}
    };

    // Checks if id is valid. If not, logs an error. Otherwise, it registers the event handler.
    var unregisterEventHandler = function (id, event, handler) {
        if (typeof id !== 'string') {
            throw new ReferenceError("Id: '" + id + "' must be a string!");
        } else {
			var inputThing = document.getElementById(id); // find it in the DOM
			if (inputThing) {
				langara.removeEventSimple(inputThing, event, handler);
			} else {
				throw new ReferenceError("Id: '" + id + "' does not exist.  Check your spelling!");
			}
		}
    };


    // make these routines publically accessible
    return {
        get: get,
        set: set,
        registerEventHandler: registerEventHandler,
		unregisterEventHandler: unregisterEventHandler,
        addEventSimple: addEventSimple,
        addEvent: addEvent,
        removeEventSimple: removeEventSimple,
        removeEvent: removeEvent,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementsByClass: getElementsByClass
    };
})();
