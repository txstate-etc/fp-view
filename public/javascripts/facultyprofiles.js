jQuery( document ).ready(function($) {
  $('#coll-dept').chosen({
    placeholder_text_single: 'College / Department',
    inherit_select_classes: true,
    width: "80%"
  })

  $('#coll-dept').on('change', function(evt, params) {
    var selectedOption = $("option:selected", this);
    if (selectedOption.hasClass('college')) {
      $('#college').val(params.selected)
      $('#dept').val("")
    }
    else {
      $('#college').val("")
      $('#dept').val(params.selected)
    }
    //TODO: Find a better way to do this.
    if (params.selected.length > 30) {
      var truncated = params.selected.substring(0,30) + "...";
      $('.chosen-single span').text(truncated)
    }
    //It needs to be even smaller on mobile
    var width = $('.chosen-container').width() + $('.btn-search').width()
    if ( width > $('.department-group .input-group').width() ) {
      var truncated = params.selected.substring(0,20) + "...";
      $('.chosen-single span').text(truncated)
    }
  })

  $('.btn-more').click(function() {
    var target = $(this)
    var person = target.data("person");
    var type = target.data("type");
    window.location = "/profile/" + person + "/activity/" + type
  })

  $('.show-appointments').click(function(event) {
    $('.other-appointment').slideToggle();
    $(this).children('i').toggleClass('fa-caret-down fa-caret-up');
  })

  $('.faculty-department-search').submit(function(e){
    var search = $('#q').val() + $('#college').val() + $('#dept').val();
    if (search.length == 0) {
      e.preventDefault();
    }
  })

});

function getUrlParameters() {
  return shared.parseParameterPairs(window.location.search.substring(1));
}
