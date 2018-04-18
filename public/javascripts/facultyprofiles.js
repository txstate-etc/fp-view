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

});

function getUrlParameters() {
  return shared.parseParameterPairs(window.location.search.substring(1));
}
