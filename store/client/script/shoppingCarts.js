// document.addEventListener('DOMContentLoaded', () => {
  //
  {
    const shoppingCartsTamplate = templates[4];
    const shoppingCartsContent = shoppingCartsTamplate.content.cloneNode(true);
    pageContainer.appendChild(shoppingCartsContent);
    const shoppingCartsListDiv = document.getElementById('productsShoppingCarts');
const errorDiv = shoppingCartsContent.querySelector('#errorDiv');
    
    const deleteProductFromCarts = (id) => {
      console.log('delete product: ', id);
      fetch(`http://localhost:3000/ShoppingCarts/${id}`, {
          method: 'DELETE'
      }).then(response => {
          if (response.ok) {
              return response;
          }
      }).then(() => {
        getproductsShoppingCarts();
      }).catch(error => {
        errorDiv.textContent = 'מצטערים! אירעה שגיאה';
      }).finally(() => {
        // PasAnmation.classList.add('hide');

      });
  };

    const createProductDiv = (product) => {
      const div = document.createElement('div');
      div.classList.add('product');
  
      div.innerHTML = `
        <img src='${product.img}' width='280px'/>
        <p>${product.name}</p>
        <p>₪ ${product.price}</p>
        <button class="deleteProduct" data-id="${product.id}">Delete</button>
        <div class="heart" onclick="startAnimation(this)">❤️</div>
        <hr/>
      `;
      return div;
    };
    

  // localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let shoppingCarts = [];
//
    function getproductsShoppingCarts() {
      //מחיקת כל התצוגה בעגלת הקניות
      while(shoppingCartsListDiv.firstChild){
        shoppingCartsListDiv.removeChild(shoppingCartsListDiv.firstChild);
    }

      let currentUser = localStorage.getItem('currentUser');
      let email_ = JSON.parse(currentUser);
      fetch('http://localhost:3000/shoppingCarts')
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(fetchedProducts => {
          shoppingCarts = fetchedProducts;
          shoppingCarts.forEach(product => {
            if(email_.email==product.currentUser_email){
              console.log('Current user email:', email_.email);
                const productDiv = createProductDiv(product);
                shoppingCartsListDiv.append(productDiv);
            }
          });
          if (shoppingCarts.length == 0) {
            errorDiv.textContent = 'אין מוצרים במערכת';
          }
        })
        .catch(error => {
          console.log(error);
          errorDiv.textContent = 'מצטערים! אירעה שגיאה';
        }).finally(() => {
          // PasAnmation.classList.add('hide');
        });
    };
    let currentUser = localStorage.getItem('currentUser');
    let email_ = JSON.parse(currentUser);
    getproductsShoppingCarts();

    shoppingCartsListDiv.addEventListener('click', (event) => {
    // PasAnmation.style.display='block';

      if (event.target.classList.contains('deleteProduct')) {
          event.preventDefault();
          const productId = event.target.getAttribute('data-id');
          deleteProductFromCarts(productId);
      }
    
  });

  }
  //  });
  
