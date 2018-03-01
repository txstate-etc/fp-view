module.exports = {
  yell : function(s, options) {
    return s.toUpperCase();
  },
  eachHalf : function(list, index, options) {
    var arrayChunk= "";
    var splitPoint = Math.ceil(list.length / 2);
    var start = (index == 0) ? 0 : splitPoint;
    var end = (index == 0) ? splitPoint : list.length;
    list.slice(start,end).forEach(function(item) {
      arrayChunk += options.fn(item)
    });
    return arrayChunk;
  }
}
