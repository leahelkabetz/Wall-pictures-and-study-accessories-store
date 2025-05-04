// פונקציה שמפעילה את האנימציה של הלב
const startAnimation = (element) => {
    element.classList.add("animate");
    setTimeout(() => {
      element.classList.remove("animate");
    }, 5000);
  };



  // שמירת המוצר בשרת
  const AddToShoppingCarts = (productId) => {
    vAnmation.style.display='block';

    let currentUser = localStorage.getItem('currentUser');
    let email_ = JSON.parse(currentUser);
    
    // מציאת המוצר במערך המוצרים לפי ה-id
    const product = products.find(p => p.id === productId);
    if (!product) {
      console.error('Product not found!');
      return;
    }
  
    const body = {
      img: product.imageUrl,
      name: product.name,
      price: product.price,
      currentUser_email: email_.email
    };
    // const userstring=JSON.stringify(currentUser);
    // localStorage.setItem("currentUser",userstring);

    fetch('http://localhost:3000/shoppingCarts', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then(result => {
        if (result.ok) {
          return result;
        }
      })
      .then(() => {
        // אנימציה של הוספה לסל הקניות
      })
      .catch((error) => {
        errorDiv.textContent = 'מצטערים, אירעה שגיאה והמידע לא נשמר בשרת';
        errorDiv.classList.remove('hide');
      }).finally(()=>{
        vAnmation.style.display='none';

      })
      getproductsShoppingCarts();
    };
  
   let products = [];
  
  document.addEventListener('DOMContentLoaded', () => {
    const productsTamplate = templates[3];
    const productsContent = productsTamplate.content.cloneNode(true);
    pageContainer.appendChild(productsContent);
    const productsListDiv = document.getElementById('productsList');
    
    const createProductDiv = (product) => {
      const div = document.createElement('div');
      div.classList.add('product');
  
      div.innerHTML = `
        <img src='${product.imageUrl}' width='280px'/>
        <p>${''}</p>
        <p>${product.name}</p>
        <p>₪ ${product.price}</p>
        <button onclick="AddToShoppingCarts(${product.id})">Add to shopping carts</button>
        <div class="heart" onclick="startAnimation(this)">❤️</div>
        <hr/>
      `;
      return div;
    };
  
    const getproducts = () => {
      fetch('http://localhost:3000/products')
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(fetchedProducts => {
          products = fetchedProducts;
          products.forEach(product => {
            const productDiv = createProductDiv(product);
            productsListDiv.append(productDiv);
          });
          if (products.length == 0) {
            productsListDiv.textContent = 'אין מוצרים במערכת';
          }
        })
        .catch(error => {
          productsListDiv.textContent = 'מצטערים! אירעה שגיאה';
        });
    };
  
    getproducts();
  
  });
  