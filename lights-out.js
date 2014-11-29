function create_grid(grid_size) {
  for (row = 0; row < grid_size; row++) {
  	for (col = 0; col < grid_size; col++) {
      $("#grid-container").append("<div class='light-cell on' data-row=" + row + " data-col=" + col + "></div>");
    }
  }
  $(".light-cell").css("width", (100 / grid_size) + "%");
  $(".light-cell").css("height", (100 / grid_size) + "%");
}


function show_moves(move_count) {
  $("#moves").text("Moves made: " + move_count);
}


function toggle_light(cell, game_mode) {
  
  if (game_mode === 2) {
    cell.toggleClass("on");
    cell.toggleClass("off");
  }

  if (game_mode === 3) {
    
    if (cell.hasClass("on")) {
        cell.addClass("on2");
        cell.removeClass("on");
    } 
    else if (cell.hasClass("on2")) {
        cell.addClass("off");
        cell.removeClass("on2");
    } 
    else if (cell.hasClass("off")) {
        cell.addClass("on");
        cell.removeClass("off");
    }
  }

}


function toggle_neighbors(cell, pattern, game_mode) {
	var row = cell.attr("data-row");
	var col = cell.attr("data-col");

  if (pattern === "+") {
    toggle_light( $("[data-col=" + parseInt(col)       + "][data-row=" + (parseInt(row) - 1) + "]"), game_mode );
	  toggle_light( $("[data-col=" + parseInt(col)       + "][data-row=" + (parseInt(row) + 1) + "]"), game_mode ); 
	  toggle_light( $("[data-col=" + (parseInt(col) - 1) + "][data-row=" + parseInt(row)       + "]"), game_mode );
	  toggle_light( $("[data-col=" + (parseInt(col) + 1) + "][data-row=" + parseInt(row)       + "]"), game_mode );
  }

  if (pattern === "x") {
    toggle_light( $("[data-col=" + (parseInt(col) - 1) + "][data-row=" + (parseInt(row) - 1) + "]"), game_mode );
    toggle_light( $("[data-col=" + (parseInt(col) + 1) + "][data-row=" + (parseInt(row) - 1) + "]"), game_mode ); 
    toggle_light( $("[data-col=" + (parseInt(col) - 1) + "][data-row=" + (parseInt(row) + 1) + "]"), game_mode );
    toggle_light( $("[data-col=" + (parseInt(col) + 1) + "][data-row=" + (parseInt(row) + 1) + "]"), game_mode );
  }

}


function randomize_grid(grid_size, pattern, game_mode) {
  //to be sure it's solvable, start from all on and randomly toggle them to get the random position

  var toggles = Math.floor(Math.random() * 20) + 10;
  for (i = 0; i < toggles; i++) {
    var random_row = Math.floor(Math.random() * grid_size); //random integer 0 to grid_size - 1
    var random_col = Math.floor(Math.random() * grid_size); 
    
    toggle_light(     $("[data-col=" + random_col + "][data-row=" + random_row + "]"), game_mode);
    toggle_neighbors( $("[data-col=" + random_col + "][data-row=" + random_row + "]"), pattern, game_mode);
  }  
}


function reset_grid() {
  $(".light-cell").addClass("on");
  $(".light-cell").removeClass("on2");
  $(".light-cell").removeClass("off");
  show_moves(0);
}


function check_win() {
  var all_off = true;
  $(".light-cell").each(function() {
    if ( $(this).hasClass("on") || $(this).hasClass("on2") ) {
      all_off = false;
    } 
  });
  return all_off;
}







$(document).ready(function() {
  
  var grid_size = 5;
  create_grid(grid_size);
  var move_count = 0;
  var pattern = "+"; //on-off pattern default
  var game_mode = 2; //starts on two states mode
  

  $("#grid-container").on("click", ".light-cell", function() {
    
    toggle_light($(this), game_mode);
    toggle_neighbors($(this), pattern, game_mode);
    
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


  $("#grid-size").change(function () {
    grid_size = $("option:selected").attr("value");
        
    $(".light-cell").remove();
    create_grid(grid_size);
    reset_grid();
    move_count = 0;
  });

  
  $("#change-pattern").click(function() {
    pattern === "+" ? pattern = "x" : pattern = "+";  //quick easy way to switch between the two pattern types
    reset_grid();
    move_count = 0;
    $("#pattern span").text(pattern);
  });


  $("#game-mode").click(function() {
    game_mode = 5 - game_mode; //math trick to switch between 2 states mode and 3 states mode
    reset_grid();
    move_count = 0;
    $("#mode span").text(game_mode);
  });


  $("#randomize").click(function() {
    randomize_grid(grid_size, pattern, game_mode);
  });


  $("#reset").click(function() {
    reset_grid();
    move_count = 0;
  });


});