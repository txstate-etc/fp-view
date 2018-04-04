jQuery( document ).ready(function($) {
  $('#department').chosen({
    placeholder_text_single: 'College / Department',
    inherit_select_classes: true
  })

  $('.btn-more').click(function(event) {
    var target = $(event.target)
    var person = target.data("person");
    var type = target.data("type")
    window.location = "/profile/" + person + "/activity/" + type
  })

  $('.show-appointments').click(function(event) {
    $('.other-appointment').slideToggle();
    $(this).children('i').toggleClass('fa-caret-down fa-caret-up');
  })

});

//functions from Gato to handle the URL parameters
function parseParameterPairs(query) {
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
}

function getUrlParameters() {
  return parseParameterPairs(window.location.search.substring(1));
}

function constructParameterPairs(params) {
  var pairs = [];
  for (var key in params) {
    if (params.hasOwnProperty(key) && !isBlank(params[key])) {
      pairs.push(encodeURIComponent(key)+'='+encodeURIComponent(params[key]));
    }
  }
  return pairs.join('&');
}

function createUrlQuery(params) {
  return '?'+constructParameterPairs(params);
}

function isBlank(str) {
  if (str === undefined) return true;
  if (str.trim === undefined) return false;
  if (str.trim().length == 0) return true;
  return false;
}
