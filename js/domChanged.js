(function ( $ ) {
    $.fn.domChanged = function( options ) {
        return this.each(function() {
            var domChanged = new DomChanged(this, options);
            $(this).data('domChanged', domChanged);
        });
    }
    var DomChanged = function(element,options){
        var defaults = {
            pollTime : 100,//for ie
            callback:false,
            eventName:"domChanged",
            timeout:0// 0 means no timeout
        }
        var settings;
        if(typeof options =="function"){
            settings= defaults;
            settings.callback = options;
        }else{
            settings = $.extend(defaults, options );
        }
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        if(MutationObserver){
            //webkit and gecko
            var observer = new MutationObserver(function(mutationRecords) {
                // Handle mutations
                changeDetected();
            });
            observer.observe(element,
                {  // options:
                    subtree: true,  // observe the subtree rooted at myNode
                    childList: true,  // include information childNode insertion/removals
                    attribute: true,  // include information about changes to attributes within the subtree
                    characterData:true
                });
        }else {
            if(typeof element.onpropertychange=="object"){
                element.attachEvent('onpropertychange',function(e){
                    changeDetected();
                })
            }
            var allChildrenCount= 0,timer=0;
            var interval = setInterval(function(){
                var allChildren = element.getElementsByTagName("*");
                if(allChildren.length!=allChildrenCount ){
                    allChildrenCount = allChildren.length;
                    changeDetected();
                }
                if(timer>settings.timeout){
                    clearInterval(interval);
                }else{
                    timer+=settings.pollTime;
                }
            },settings.pollTime)
        }
        this.stop= function(){
           //need to stop observing
            if(MutationObserver){
                observer.disconnect();
            }
            if(typeof interval !="undefined"){
                clearInterval(interval)
            }
        }
        var  changeDetected= function (){
            $(element).trigger(settings.eventName);
            if(typeof settings.callback == "function"){
                settings.callback.call();
            }
        }
    }
}( jQuery ));