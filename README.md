domChanged
==========

Jquery plugin to fire a callback function when an element's DOM has been changed.

Webkit & Gecko uses MutationObserver and ie uses polling.

Settings and Defaults
=====================

pollTime : 100,//for ie
callback:false,
eventName:"domChanged",//name of the event that you must bind to
timeout:0// this is to stop ie polling after a certain time, default is 0 which means never stop

How to use
==========

Nominate an element to watch.
```
$("#target").domChanged();
```
Or change a default setting...
```
$("#target").domChanged({timeout:5000}); //stop watching after 5 seconds
```
React to the target element changing by binding to it's domChanged event...
```
$("#target").on("domChanged",function(){
    console.log("It changed, notified by event")
})
```
Don't use event instead pass a callback...
```
$("#target").domChanged(function(){
    console.log("callback function passed as parameter")

});
```
