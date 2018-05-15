jQuery( document ).ready(function($) {

    const tabList = ['name', 'publication', 'interest', 'grant', 'award'];

    var activetab = $('#tabs > div').filter(function () { return $(this).data('total') > 0; }).first().index('#tabs > div');
    if (window.location.hash) {
      activetab = $('#tabs a[href="'+window.location.hash+'"]').parent().index();
    }
    if (activetab == -1) activetab = 0;
    $( "#tabs" ).tabs({
      classes : {
        "ui-tabs" : "fp-tabs"
      },
      activate: function (event, ui) {
        var newhash = ui.newTab.find('a').prop('hash');
        if (history.pushState) {
          history.pushState(null, null, newhash);
        } else {
          window.location.hash = newhash;
        }
      },
      active: activetab,
      heightStyle: 'auto'
    });

    $('.faculty-department-search').submit(function () {
      $(this).attr('action', '/search'+window.location.hash);
    })

    $('.pagination-link').click(paginationClick);

    function paginationClick(evt) {
      if ($('#tabs').length) {
        var activeTabIndex = $('#tabs').tabs("option", "active");
        var type = tabList[activeTabIndex];
      }
      else {
        var type = "name";
      }
      var query = $('#search-data').data('q');
      var college = $('#search-data').data('college');
      var department = $('#search-data').data('dept');
      var perpage = $('#search-data').data('perpage');
      var page = $(this).data("page");

      var filters = {q:query, page: page, perpage: perpage};
      if (college) {
        filters.college = college;
      }
      else if (department) {
        filters.dept = department;
      }

      var url = `/api/search/${type}${shared.createUrlQuery(filters)}`;

      $.ajax({
        method: 'GET',
        url: url,
        dataType: "json"
      })
      .done(function(results) {
        var activeTab = $(`#${type}`);
        var total = activeTab.data("total")
        if (type == "name") {
          var content = fptemplates.personSearchResult({page: page, total: total, search_results: results, perpage: perpage})
        }
        else {
          var content = fptemplates.activitySearchResult({page: page, total:total, search_results: results, perpage: perpage})
        }
        activeTab.html(content);
        $('.pagination-link').click(paginationClick);
      })
      .fail(function(err) {

      })

    }

});
