(function(exports){

  exports.test = function(){
       return 'This is a function from shared module';
  };

  exports.parseParameterPairs = function(query) {
    var ret = {};
    if (query.length > 0) {
      var pairs = query.split("&");
      for(var i=0; i<pairs.length; i++){
          var param = pairs[i].split("=");
          var val = decodeURIComponent(param[1]);
          if (parseInt(val, 10) == val) val = parseInt(val, 10);
          ret[decodeURIComponent(param[0])] = val;
      }
    }
    return ret;
  };

  exports.constructParameterPairs = function(params) {
    var pairs = [];
    for (var key in params) {
      if (params.hasOwnProperty(key) && !this.isBlank(params[key])) {
        pairs.push(encodeURIComponent(key)+'='+encodeURIComponent(params[key]));
      }
    }
    return pairs.join('&');
  }

  exports.createUrlQuery = function(params) {
    return '?'+ this.constructParameterPairs(params);
  }

  exports.isBlank= function(str) {
    if (str === undefined) return true;
    if (str.trim === undefined) return false;
    if (str.trim().length == 0) return true;
    return false;
  }

}(typeof exports === 'undefined' ? this.shared = {} : exports));
