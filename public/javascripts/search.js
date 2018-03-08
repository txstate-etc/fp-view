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
      var url = "http://localhost:3000/results" + createUrlQuery(params);

      $.ajax({
        method: 'GET',
        url: url,
        dataType: "json"
      })
      .done(function(results){
        var tabId = `#${type}`;
        var results = buildResults(type, results);
        var pagination = buildPagination(1,20)
        var page = $('<div/>').append(results).append(pagination);
        $(tabId).html(page)
      })
      .fail(function() {
        console.log("failed")
      })
    }

    function buildResults(type, data) {
      var formatter;
      var resultList = $('<ul class="search-results"></ul>');
      switch(type) {
        case 'faculty-name':
        default:
          formatter = buildNameResult;
      }
      for (var i=0; i<data.length; i++) {
        resultList.append(formatter(data[i]))
      }
      return resultList;
    }

    function buildNameResult(data) {
      var html = $('<li></li>');
      html.append('<div class="name"><a href="/profile/123">' + buildDisplayName(data) + '</a></div>');
      html.append('<div class="department-rank">' + data.title + '- ' + data.department + '</div>')
      return html;
    }

    //or send it from server already built?
    function buildDisplayName(data) {
      var name = data.fname;
      if (data.mname && data.mname.length > 0) {
        name += " " + data.mname;
      }
      name += " " + data.lname;
      return name;
    }

    function buildPagination(page, lastpage) {
          if (lastpage == 1) return '';
          var html = '<div class="sr-only">Pagination</div>';
            html += '<ul role="navigation" class="pagination">';
            html += '<li><a href="#" class="pagination-link previous' + (page > 1 ? " enabled" : "") + '" aria-label="Previous Page" data-page="'+Math.max(page-1, 1)+'" aria-disabled="'+(page == 1 ? 'true' : 'false')+'">< Previous</a></li>';
            //first page
            html += '<li><a href="#" class="pagination-link" aria-selected="' + (page == 1) + '" aria-label="Page 1" data-page="1">1</a></li>';
            //first ellipsis, if needed
            if(lastpage > 4 && page > 3){
                html += '<li><span class="nonlink">...</span></li>';
            }
            if(lastpage > 2){
                if(lastpage == 3){
                    html += '<li><a href="#" class="pagination-link" aria-selected="'+(page == 2)+'" aria-label="Page 2" data-page="2">2</a></li>';
                }
                else{
                    for (var i = Math.min(Math.max(page - 1, 2), lastpage-2); i <= Math.max(Math.min(page + 1, lastpage - 1),3); i++) {
                      html += '<li><a href="#" class="pagination-link" aria-selected="'+(i==page)+'" aria-label="Page '+i+'" data-page="'+i+'">'+i+'</a></li>';
                    }
                }
            }
            //second ellipsis, if needed
            if(lastpage > 4 && page < (lastpage - 2)){
                html += '<li><span class="nonlink">...</span></li>';
            }
            //last page
            html += '<li><a href="#" class="pagination-link" aria-selected="' + (page == lastpage) + '" aria-label="Page ' + lastpage + '" data-page="' + lastpage + '">' + lastpage + '</li>';
            html += '<li><a href="#" class="pagination-link next' + (page < lastpage ? " enabled" : "") + '" aria-label="Next Page" data-page="'+Math.min(page+1, lastpage)+'" aria-disabled="'+(page == lastpage ? 'true' : 'false')+'">Next ></a></li>';
            html += '</ul>';
            return html;
        };
});
