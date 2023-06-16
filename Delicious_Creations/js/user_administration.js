$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
  
    // Append table with add row form on add new button click
    $(".add-new").click(function() {
      $(this).attr("disabled", "disabled");
      var index = $("table tbody tr:last-child").index();
      var row =
        '<tr>' +
        '<td><input type="text" class="form-control" name="username" id="username"></td>' +
        '<td><input type="text" class="form-control" name="email" id="email"></td>' +
        '<td><input type="text" class="form-control" name="password" id="password"></td>' +
        '<td><input type="text" class="form-control" name="gender" id="gender"></td>' +
        '<td><input type="text" class="form-control" name="country" id="country"></td>' +
        '<td><input type="text" class="form-control" name="city" id="city"></td>' +
        '<td><input type="text" class="form-control" name="address" id="address"></td>' +
        '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
        '<td>' +
        '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
        '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
        '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
        '</td>' +
        '</tr>';
      $("table").append(row);
      $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
      $('[data-toggle="tooltip"]').tooltip();
    });
  
    // Add row on add button click
    $(document).on("click", ".add", function() {
      var empty = false;
      var input = $(this).parents("tr").find('input[type="text"]');
      input.each(function() {
        if (!$(this).val()) {
          $(this).addClass("error");
          empty = true;
        } else {
          $(this).removeClass("error");
        }
      });
      $(this).parents("tr").find(".error").first().focus();
      if (!empty) {
        input.each(function() {
          $(this).parent("td").html($(this).val());
        });
        $(this).parents("tr").find(".add, .edit").toggle();
        $(".add-new").removeAttr("disabled");
      }
    });
  
    // Edit row on edit button click
    $(document).on("click", ".edit", function() {
      var row = $(this).parents("tr");
      if (row.hasClass("edit-mode")) {
        // Save the changes
        var inputs = row.find("input[type='text']");
        inputs.each(function() {
          var inputValue = $(this).val();
          $(this).parent("td").html(inputValue);
        });
        row.removeClass("edit-mode");
        $(this).find("i").text("edit");
      } else {
        // Enter edit mode
        var tds = row.find("td:not(:last-child)");
        tds.each(function() {
          var currentValue = $(this).text();
          $(this).html('<input type="text" class="form-control" value="' + currentValue + '">');
        });
        row.addClass("edit-mode");
        $(this).find("i").text("save");
      }
    });
  
    // Delete row on delete button click
    $(document).on("click", ".delete", function() {
      var row = $(this).parents("tr");
      var confirmDelete = confirm("Are you sure you want to delete this row?");
      if (confirmDelete) {
        row.fadeOut(500, function() {
          row.remove();
          $(".add-new").removeAttr("disabled");
        });
      }
    });
  });
  