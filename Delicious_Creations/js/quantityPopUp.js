function openQuantityPopup(seminarName, maxQuantity) {
    const popupWindow = window.open('', 'QuantityPopup', 'width=400,height=300');
  
    const htmlContent = `
      <html>
        <head>
          <title>Choose Quantity</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h2 {
              margin-top: 0;
            }
            .form-group {
              margin-bottom: 20px;
            }
            label {
              display: block;
              margin-bottom: 5px;
            }
            input[type="number"] {
              width: 100%;
              padding: 5px;
              font-size: 14px;
            }
            .btn {
              display: inline-block;
              padding: 8px 16px;
              font-size: 14px;
              font-weight: bold;
              text-align: center;
              text-decoration: none;
              border: none;
              cursor: pointer;
              background-color: #4CAF50;
              color: white;
            }
            .btn-cancel {
              background-color: #ccc;
            }
          </style>
        </head>
        <body>
          <h2>Choose Quantity for ${seminarName}</h2>
          <div class="form-group">
            <label for="quantityInput">Quantity:</label>
            <input type="number" id="quantityInput" min="1" max="${maxQuantity}" required>
          </div>
          <button class="btn" id="confirmQuantityButton">Confirm</button>
          <button class="btn btn-cancel" id="cancelQuantityButton">Cancel</button>
          <script>
            const confirmQuantityButton = document.getElementById('confirmQuantityButton');
            const cancelQuantityButton = document.getElementById('cancelQuantityButton');
            const quantityInput = document.getElementById('quantityInput');
  
            confirmQuantityButton.addEventListener('click', () => {
              const quantity = parseInt(quantityInput.value);
              if (quantity >= 1 && quantity <= ${maxQuantity}) {
                console.log('Selected quantity:', quantity);
                window.close();
              } else {
                alert('Invalid quantity. Please enter a value between 1 and ${maxQuantity}.');
              }
            });
  
            cancelQuantityButton.addEventListener('click', () => {
              window.close();
            });
          </script>
        </body>
      </html>
    `;
  
    popupWindow.document.open();
    popupWindow.document.write(htmlContent);
    popupWindow.document.close();
  }
  