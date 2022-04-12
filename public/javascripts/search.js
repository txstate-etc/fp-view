jQuery( document ).ready(function($) {
    const tabList = ['name', 'publication', 'interest', 'grant', 'award', 'service'];

    var activetab = $('#tabs > div').filter(function () { return $(this).data('total') > 0; }).first().index('#tabs > div');
    if (window.location.hash) {
      var tabname = window.location.hash.replace(/_x$/, '');
      activetab = $('#tabs a[href="'+tabname+'"]').parent().index();
    }
    if (activetab == -1) activetab = 0;
    $( "#tabs" ).tabs({
      classes : {
        "ui-tabs" : "fp-tabs"
      },
      activate: function (event, ui) {
        var newhash = ui.newTab.find('a').prop('hash')+'_x';
        window.location.hash = newhash;
      },
      active: activetab
    });

    $(window).on('popstate', function () {
      var tabname = window.location.hash.replace(/_x$/, '');
      if (tabname.length > 0) {
        var activetab = $('#tabs a[href="'+tabname+'"]').parent().index();
        $('#tabs').tabs('option', 'active', activetab);
      }
    });

    $('.faculty-department-search').submit(function () {
      $(this).attr('action', '/search'+window.location.hash);
    })

    $('.pagination-link').click(paginationClick);

    function paginationClick(evt) {
      evt.preventDefault();
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

      var url = "/api/search/" + type + shared.createUrlQuery(filters);
      history.pushState(null, null, shared.createUrlQuery(filters)+window.location.hash);

      $.ajax({
        method: 'GET',
        url: url,
        dataType: "json"
      })
      .done(function(results) {
        //var activeTab = $(`#${type}`);
        var activeTab = $("#" + type);
        var total = activeTab.data("total");
        if (type == "name") {
          var content = fptemplates.personSearchResult({params: filters, total: total, search_results: results})
        }
        else {
          var content = fptemplates.activitySearchResult({params: filters, total:total, search_results: results})
        }
        activeTab.html(content);
        $('.pagination-link').click(paginationClick);
      })
      .fail(function(err) {

      })

    }

});
