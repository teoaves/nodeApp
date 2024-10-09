$(document).ready(function() {
  // Φόρτωση προϊόντων κατά την αρχική φόρτωση
  loadProducts();

  $('.btnSubmit').on('click', function () {
      // Συλλογή δεδομένων από τα πεδία
      let productName = $("#productName").val();
      let productCost = $("#productCost").val();
      let productDescription = $("#productDescription").val();
      let productQuantity = $("#productQuantity").val();

      // Έλεγχος εάν όλα τα απαραίτητα πεδία είναι συμπληρωμένα
      if (!productName || !productCost || !productQuantity) {
          alert("Πρέπει να συμπληρώσετε όλα τα υποχρεωτικά πεδία.");
          return false; // Μην προχωρήσεις αν λείπουν απαραίτητα πεδία
      }

      // Δημιουργία αντικειμένου για αποστολή
      const item = {
          'product': productName,
          'cost': parseFloat(productCost), // Βεβαιωθείτε ότι είναι αριθμός
          'description': productDescription,
          'quantity': parseInt(productQuantity) // Βεβαιωθείτε ότι είναι ακέραιος
      };

      // Αποστολή AJAX
      $.ajax({
          url: "http://localhost:3000/api/product",
          type: "post",
          data: item,
          dataType: "JSON",
      })
      .done(function(response) {
          let data = response.data;
          let status = response.status;

          if (status) {
              alert(true, 'Επιτυχής εισαγωγή του προϊόντος');
              $('#frmProduct')[0].reset(); // Επαναφορά της φόρμας
              loadProducts(); // Επαναφόρτωση των προϊόντων
          } else {
              alert(false, 'Πρόβλημα στην εισαγωγή του προϊόντος (' + data.message + ')');
          }
      })
      .fail(function(jqXHR) {
          alert(false, 'Σφάλμα κατά την αποστολή: ' + jqXHR.responseText);
      });

      return false; // Αποφυγή της προεπιλεγμένης συμπεριφοράς της φόρμας
  });
});

// Λειτουργία για τη δημιουργία του πίνακα προϊόντων
function createTbody(data) {
  $("#productTable > tbody").empty();

  const len = data.length;
  for (let i = 0; i < len; i++) {
      let productName = data[i].product;
      let price = data[i].cost;
      let quantity = data[i].quantity;
      let description = data[i].description;
      
      let tr_str = "<tr>" +
          "<td>" + productName + "</td>" +
          "<td>" + price + "</td>" +
          "<td>" + quantity + "</td>" +
          "<td>" + description + "</td>" +      
          "<td>" +
              "<button class='btnUpdate btn btn-primary' value='" + productName + "'>Τροποποίηση</button> " +
              "<button class='btnDelete btn btn-primary' value='" + productName + "'>Διαγραφή</button>" +
          "</td>" + 
          "</tr>";

      $("#productTable tbody").append(tr_str);
  }
}

// Λειτουργία φόρτωσης προϊόντων
function loadProducts() {
  $.ajax({
      url: "http://localhost:3000/api/product",
      type: "get",
      dataType: "json",
  })
  .done(function(response) {
      if (response.status) {
          createTbody(response.data); // Δημιουργεί το σώμα του πίνακα με τα δεδομένα
      } else {
          alert(false, 'Πρόβλημα στην ανάκτηση των προϊόντων: ' + response.data.message);
      }
  })
  .fail(function(jqXHR) {
      alert(false, 'Σφάλμα κατά την ανάκτηση: ' + jqXHR.responseText);
  });
}

// Λειτουργία ειδοποίησης
function alert(status, message) {
  if (status) {
      $('.alert').addClass('alert-success');
      $('.alert').removeClass('alert-danger');
  } else {
      $('.alert').addClass('alert-danger');
      $('.alert').removeClass('alert-success');
  }
  $('.alert').html(message);
}
