jQuery( document ).ready(function($) {

    const tabList = ['faculty-name', 'scholarly-creative', 'interests', 'grants', 'awards'];

    $( "#tabs" ).tabs({
      classes : {
        "ui-tabs" : "fp-tabs"
      },
      activate: activateTab,
      create: createTabs
    });

    function createTabs() {
      var urlParams = getUrlParameters();
      var type="faculty-name";
      if (urlParams.type.length > 0 && tabList.includes(urlParams.type)) {
        type= urlParams.type;
      }
      var selector = `#tabs a[href="#${type}"]`;
      var index = $(selector).parent().index();
      $( "#tabs" ).tabs("option", "active", index);
    }

    function activateTab(event, ui) {
      var activeTab = ui.newPanel.attr('id');
      console.log("activateTab: " + activeTab)
      

    }

});
