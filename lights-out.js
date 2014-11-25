//1 is 'on' and 0 is 'off'
var grid = [ [1,1,1,1,1] ,  [1,1,1,1,1] , [1,1,1,1,1] , [1,1,1,1,1] , [1,1,1,1,1] ]  


function create_grid() {
  for (x = 0; x < 5; x++) {
  	for (y = 0; y < 5; y++) {
      $("#grid-container").append("<div class='light-cell on'></div>");
  	}
  }
}







$(document).ready(function() {
  
  create_grid();

  $(".light-cell").click(function() {
    $(this).toggleClass("on");
    $(this).toggleClass("off");
  });

});