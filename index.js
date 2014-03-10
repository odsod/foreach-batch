module.exports = function(arr, batchSize, fn, progressFn, timeoutLength) {
  if ('function' !== typeof fn) {
    throw new Error('Non-function callback as argument to foreachBatch: ' + fn);
  }

  if ('number' !== typeof batchSize || batchSize < 1) {
    throw new Error('Invalid batchSize as argument to foreachBatch: ' + batchSize);
  }

  var hasProgressFn = 'function' === typeof progressFn;

  timeoutLength = timeoutLength || 0;

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
      setTimeout(processNextBatch, 0);
    }
  };

  // Start processing
  processNextBatch();
};
