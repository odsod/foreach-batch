(function(global) {

  var forEachBatch = function(arr, fn, batchSize, progressFn, timeoutDelay) {
    // must supply a callback
    if ('function' !== typeof fn) {
      throw new Error('Non-function callback as argument to foreachBatch: ' + fn);
    }

    // batchSize must be > 0
    if ('number' !== typeof batchSize || batchSize < 1) {
      throw new Error('Invalid batchSize as argument to foreachBatch: ' + batchSize);
    }

    // progressFn is optional
    var hasProgressFn = 'function' === typeof progressFn;

    // Use a default timeout delay of 0
    timeoutDelay = timeoutDelay || 0;

    var currBatchStart = 0;

    var processNextBatch = function() {
      var currBatchEnd = Math.min(currBatchStart + batchSize, arr.length);

      // Process this batch
      for (var i = currBatchStart; i < currBatchEnd; i++) {
        fn(arr[i]);
      }

      // Report progress
      if (hasProgressFn) {
        var progress = currBatchEnd / arr.length;
        progressFn(progress);
      }

      // Stop if done, otherwise defer processing of next batch
      if (currBatchEnd < arr.length) {
        currBatchStart = currBatchEnd;
        setTimeout(processNextBatch, timeoutDelay);
      }
    };

    // Start processing
    processNextBatch();
  };

  if (typeof self !== 'undefined') {
    self.forEachBatch = forEachBatch; // Web Worker
  } else if (typeof window !== 'undefined') {
    window.forEachBatch = forEachBatch; // Browser
  } else if (typeof global !== 'undefined') {
    module.exports = forEachBatch; // NodeJS
  }

}(this));
