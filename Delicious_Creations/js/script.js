function confirmSignOut() {
  var confirmLogout = window.confirm("Are you sure you want to sign out?");

  if (confirmLogout) {
    fetch('http://localhost:3000/users/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          sessionStorage.removeItem('current_user');
          sessionStorage.removeItem('current_trait');
          window.location.href = "home.html"; 
        } else {
          console.log('Error destroying session');
        }
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
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
 // document.addEventListener("DOMContentLoaded", function() {
 //   var card = document.getElementById("card2");
   // card.classList.add("fade-in");
 // });
  
  


  