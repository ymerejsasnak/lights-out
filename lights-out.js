function create_grid() {
  for (row = 0; row < 5; row++) {
  	for (col = 0; col < 5; col++) {
      $("#grid-container").append("<div class='light-cell on' data-row=" + row + " data-col=" + col + "></div>");
      
  	}
  }
}


function show_moves(move_count) {
  $("#moves").text("Moves made: " + move_count);
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


function randomize_grid() {
  //to be sure it's solvable, start from all on and randomly toggle them to get the random position

  var toggles = Math.floor(Math.random() * 20) + 10;
  for (i = 0; i < toggles; i++) {
    var random_row = Math.floor(Math.random() * 5); //random integer 0 to 4
    var random_col = Math.floor(Math.random() * 5); 
    
    toggle_light(     $("[data-col=" + random_col + "][data-row=" + random_row + "]"));
    toggle_neighbors( $("[data-col=" + random_col + "][data-row=" + random_row + "]"));
  }  
}


function reset_grid() {
  $(".light-cell").addClass("on");
  $(".light-cell").removeClass("off");
  show_moves(0);
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
    show_moves(move_count);
    
    
    if (check_win()) {
      $("body").append("<h1 id='win-message'>CONGRATULATIONS!  YOU ARE SMART!</h1>");  
      window.setTimeout(function() { 
        reset_grid();
        move_count = 0;
        $("h1").remove();
       }, 2500); //2.5 second delay for setTimeout
    }
  
  });

  
  $("#randomize").click(function() {
    randomize_grid();
  });


  $("#reset").click(function() {
    reset_grid();
    move_count = 0;
  });


});