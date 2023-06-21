function confirmSignOut() {
    var confirmLogout = window.confirm("Are you sure you want to sign out?");
  
    if (confirmLogout) {
      window.location.href = "home.html"; // Replace with your actual sign-out URL
    } else {
      // User clicked 'Cancel' - do nothing
    }
  }

  $(document).ready(function() {
    $('#toggleDarkMode').click(function() {
      $('body').toggleClass('dark-mode');
    });
  });

  
  /* Sign in*/
  document.addEventListener("DOMContentLoaded", function() {
    var card = document.getElementById("card2");
    card.classList.add("fade-in");
  });
  

  