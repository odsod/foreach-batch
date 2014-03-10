foreach-batch
=============

A simple combinator for deferred batch processing to keep the UI responsive under long-running
computations.

I wrote this to build a big [Lunr.js](https://github.com/olivernn/lunr.js) search index without
blocking the UI and without using WebWorkers.

```javascript
var forEachBatch = require('foreach-batch');

// Process everything at once - will possibly block the UI
stuff.forEach(someExpensiveFunction);

// Process in batches of 10 - giving the UI some breathing room in between batches
forEachBatch(stuff, someExpensiveFunction, 10, function(progress) {
  // ...and we can keep track of our progress
  console.log(progress);
});
```
