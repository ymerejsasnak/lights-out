function create_grid() {
  for (row = 0; row < 5; row++) {
  	for (col = 0; col < 5; col++) {
      $("#grid-container").append("<div class='light-cell on' data-row=" + row + " data-col=" + col + "></div>");
      
  	}
  }
}


function toggle_light(cell) {
  cell.toggleClass("on");
  cell.toggleClass("off");
}


function toggle_neighbors(cell) {
	var row = cell.attr("data-row");
	var col = cell.attr("data-col");

	toggle_light( $("[data-col=" + parseInt(col)       + "][data-row=" + (parseInt(row) - 1) + "]") );
	toggle_light( $("[data-col=" + parseInt(col)       + "][data-row=" + (parseInt(row) + 1) + "]") ); 
	toggle_light( $("[data-col=" + (parseInt(col) - 1) + "][data-row=" + parseInt(row)       + "]") );
	toggle_light( $("[data-col=" + (parseInt(col) + 1) + "][data-row=" + parseInt(row)       + "]") ); 	
}


function check_win() {
  var all_off = true;
  $(".light-cell").each(function() {
    if ($(this).hasClass("on")) {
      all_off = false;
    } 
  });
  return all_off;
}




$(document).ready(function() {
  
  create_grid();
  move_count = 0;

  $(".light-cell").click(function() {
    
    toggle_light($(this));
    toggle_neighbors($(this));
    move_count++;
    $("#moves").text("Moves made: " + move_count);
    
    if (check_win()) {
      $("body").append("<h1 id='win-message'>CONGRATULATIONS!  YOU ARE SMART!</h1>");  
      window.setTimeout(function() { location.reload() }, 2000);
      move_count = 0;
    }
  
  });



});