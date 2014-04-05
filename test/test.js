var assert = require('assert');

describe('forEachBatch', function() {

  var forEachBatch = require('../');

  it('should at the very least pass one random test case', function(done) {
    var numItems = 10;
    var i = 0;
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var resultArr = [];
    var callback = function() {
      resultArr[i] = i;
      i += 1;
      if (i === numItems) {
        assert.deepEqual(resultArr, arr);
        done();
      }
    };
    forEachBatch(arr, callback, 3);
  });
});
