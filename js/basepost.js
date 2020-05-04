$(document).ready(function() {
  $(".showModal").click(function(e) {

    e.preventDefault();
    var url = $(this).attr("data-href");
    console.log($(this));
if (window.innerWidth >= 576){
    $("#staticBackdropLabel").text($(this).text());

    $("#dynamicModal iframe").attr("src", url);
    $("#dynamicModal").modal("show");
    $("#aSite").attr("href", url);
}else{  var win = window.open(url, '_blank'); win.focus();}

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
