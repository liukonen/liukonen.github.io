$(document).ready(function() {
  $(".showModal").click(function(e) {
    e.preventDefault();
    var url = $(this).attr("data-href");
    $("#dynamicModal iframe").attr("src", url);
    $("#dynamicModal").modal("show");
  });
});

// Submenu support
$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
  if (!$(this).next().hasClass('show')) {
    $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
  }
  var $subMenu = $(this).next(".dropdown-menu");
  $subMenu.toggleClass('show');
  $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
    $('.dropdown-submenu .show').removeClass("show");
  });
  return false;
});
//Sub Menu Support End
