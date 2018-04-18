jQuery( document ).ready(function($) {

    const tabList = ['name', 'publication', 'interest', 'grant', 'award'];

    $( "#tabs" ).tabs({
      classes : {
        "ui-tabs" : "fp-tabs"
      },
      create: createTabs
    });

    function createTabs(event, ui) {
      var urlParams = getUrlParameters();
      var type="name";
      if (urlParams.type && urlParams.type.length > 0 && tabList.includes(urlParams.type)) {
        type= urlParams.type;
      }
      var selector = `#tabs a[href="#${type}"]`;
      var index = $(selector).parent().index();
      if (index > 0) {
        $( "#tabs" ).tabs("option", "active", index);
      }
    }

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
      var page = $(this).data("page");

      var filters = {q:query, page: page, perpage: 10};
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
          var template = Handlebars.template(personResultTemplate);
          var content = template({page: page, total: total, search_results: results})
        }
        else {
          var template = Handlebars.template(activityResultTemplate)
          var content = template({page: page, total:total, search_results: results})
        }
        activeTab.html(content);
        $('.pagination-link').click(paginationClick);
      })
      .fail(function(err) {

      })

    }

});
