var constructParameterPairs = function(params) {
  var pairs = [];
  for (var key in params) {
    if (params.hasOwnProperty(key) && params[key]) {
      pairs.push(encodeURIComponent(key)+'='+encodeURIComponent(params[key]));
    }
  }
  return pairs.join('&');
}

var createUrlQuery = function(params) {
  return '?'+ constructParameterPairs(params);
}

helpers = {
  any: function() {
    var options = arguments[arguments.length-1];
		for (var i = 0; i < arguments.length-1; i++)
      if (arguments[i] && arguments[i].length > 0) return options.fn(this);
		return options.inverse(this);
  },
  all: function() {
    var options = arguments[arguments.length-1];
		for (var i = 0; i < arguments.length-1; i++)
			if (!arguments[i] || !arguments[i].length > 0) return options.inverse(this);
		return options.fn(this);
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
  },
  lastpage : function(total, perpage) {
    return Math.ceil(total/perpage);
  },
  paginate : function(lastpage, params) {
        if (lastpage < 2) return '';
        var page = 0+params.page;
        var html = '<div class="sr-only">Pagination</div>';
          html += '<ul role="navigation" class="pagination">';
          params.page = Math.max(page-1, 1);
          html += '<li><a href="'+createUrlQuery(params)+'" class="pagination-link previous' + (page > 1 ? " enabled" : "") + '" aria-label="Previous Page" data-page="'+params.page+'" aria-disabled="'+(page == 1 ? 'true' : 'false')+'">&lt; Previous</a></li>';
          //first page
          params.page = 1;
          html += '<li><a href="'+createUrlQuery(params)+'" class="pagination-link" aria-selected="' + (page == 1) + '" aria-label="Page 1" data-page="1">1</a></li>';
          //first ellipsis, if needed
          if(lastpage > 4 && page > 3){
              html += '<li><span class="nonlink">...</span></li>';
          }
          if(lastpage > 2){
              if(lastpage == 3){
                  params.page = 2;
                  html += '<li><a href="'+createUrlQuery(params)+'" class="pagination-link" aria-selected="'+(page == 2)+'" aria-label="Page 2" data-page="2">2</a></li>';
              }
              else{
                  for (var i = Math.min(Math.max(page - 1, 2), lastpage-2); i <= Math.max(Math.min(page + 1, lastpage - 1),3); i++) {
                    params.page = i;
                    html += '<li><a href="'+createUrlQuery(params)+'" class="pagination-link" aria-selected="'+(i==page)+'" aria-label="Page '+i+'" data-page="'+i+'">'+i+'</a></li>';
                  }
              }
          }
          //second ellipsis, if needed
          if(lastpage > 4 && page < (lastpage - 2)){
              html += '<li><span class="nonlink">...</span></li>';
          }
          //last page
          params.page = lastpage;
          html += '<li><a href="'+createUrlQuery(params)+'" class="pagination-link" aria-selected="' + (page == lastpage) + '" aria-label="Page ' + lastpage + '" data-page="' + lastpage + '">' + lastpage + '</a></li>';
          params.page = Math.min(page+1, lastpage);
          html += '<li><a href="'+createUrlQuery(params)+'" class="pagination-link next' + (page < lastpage ? " enabled" : "") + '" aria-label="Next Page" data-page="'+params.page+'" aria-disabled="'+(page == lastpage ? 'true' : 'false')+'">Next &gt;</a></li>';
          html += '</ul>';
          // Set the page field in params object back so that future tabs will be correct.
          // Really we shouldn't be altering the params object if it is intended to be used
          // for other tabs.
          params.page = page;
          return html;
      },
  encodeURIComponent : function(component) {
    return encodeURIComponent(component);
  },
  fallback: function (value, alternate) {
    return value || alternate;
  }
}
if(typeof module != "undefined") {
  module.exports = helpers;
}
