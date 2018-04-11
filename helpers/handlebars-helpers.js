module.exports = {
  any: function() {
    var options = arguments[arguments.length-1];
		for (var i = 0; i < arguments.length-1; i++)
      if (arguments[i] && arguments[i].length > 0) return options.fn(this);
		return options.inverse(this);
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
  },
  ifeval : function(v1, operator, v2, options) {
    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  }
}
