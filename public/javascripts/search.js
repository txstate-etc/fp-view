jQuery( document ).ready(function($) {

    const tabList = ['faculty-name', 'scholarly-creative', 'interests', 'grants', 'awards'];

    $( "#tabs" ).tabs({
      classes : {
        "ui-tabs" : "fp-tabs"
      },
      activate: activateTab,
      create: createTabs
    });

    function createTabs(event, ui) {
      var urlParams = getUrlParameters();
      var type="faculty-name";
      if (urlParams.type && urlParams.type.length > 0 && tabList.includes(urlParams.type)) {
        type= urlParams.type;
      }
      var selector = `#tabs a[href="#${type}"]`;
      var index = $(selector).parent().index();
      if (index > 0) {
        $( "#tabs" ).tabs("option", "active", index);
      }
      else {
        tabContent('faculty-name')
      }
    }

    function activateTab(event, ui) {
      var activeTab = ui.newPanel.attr('id');
      tabContent(activeTab)
    }

    function tabContent(type) {
      var params = getUrlParameters();
      params.type = type;
      //todo: update url with type
      var url = "http://localhost:3000/search" + createUrlQuery(params);

      $.ajax({
        method: 'GET',
        url: url,
        dataType: "json"
      })
      .done(function(result){
        var tabId = `#${type}`;
          $(tabId).html(`<span>This is the ${type} tab.</span>`)
      })
      .fail(function() {
        console.log("failed")
      })
    }

});
