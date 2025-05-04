const adminTemplate = templates[2];
const adminContent = adminTemplate.content.cloneNode(true);
const productsListAdmin = adminContent.querySelector('#productsListAdmin');
const message = adminContent.querySelector('#message');
const productsForm = adminContent.querySelector('#productsForm');
const editProductSection = adminContent.querySelector('#editProductSection');

pageContainer.appendChild(adminContent);
const getProducts = () => {
    PasAnmation.style.display='block';
    fetch('http://localhost:3000/products').then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(products => {
        productsListAdmin.innerHTML = ''; // Clear existing products

        products.forEach(product => {
            const productDiv = createProductDiv(product);
            productsListAdmin.append(productDiv);
        });

        if (products.length === 0) {
            message.textContent = " אין עדיין מוצרים במערכת";
        }
    }).catch(error => {
        message.textContent = " מצטערים! אירעה שגיאה";
    }).finally(() => {
        PasAnmation.style.display='none';
    });
};

const editProduct = (id, name, price, image) => {
    const product = {
        name: name,
        price: price,
        imageUrl: image
    };

    fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    }).then(response => {
        if (response.ok) {
            return response;
        }
    }).then(() => {
        getProducts();
    }).catch(error => {
        message.textContent = 'מצטערים! אירעה שגיאה';
    }).finally(() => {
        // PasAnmation.classList.add('hide');

    });
};
const showEditSection = (id, name, price, imageUrl) => {
    
    const editNameInput = document.getElementById('editNameInput');
    editNameInput.value = name;
    const editPriceInput = document.getElementById('editPriceInput');
    editPriceInput.value = price;
    const editImageInput = document.getElementById('editImageInput');
    editImageInput.value = imageUrl;
    
    const editProductForm = document.getElementById('editProductsForm');
    editProductForm.addEventListener('submit', (e) => {
    // PasAnmation.style.display='block';

        e.preventDefault();
        const productName = editProductForm.name.value;
        const productPrice = editProductForm.price.value;
        const productImage = editProductForm.imageUrl.value;
        editProduct(id, productName, productPrice, productImage);
        getProducts();
        editProductSection.style.display = 'none';
    });
    
    editProductSection.style.display = 'block';
};
// document.addEventListener('DOMContentLoaded', () => {
const deleteProduct = (id) => {
        fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                return response;
            }
        }).then(() => {
            getProducts();
        }).catch(error => {
            message.textContent = 'מצטערים! אירעה שגיאה';
        }).finally(() => {
            // PasAnmation.classList.add('hide');

        });
    };

    
//להצגת המוצרים יצירת דיב של כל מוצר
    const createProductDiv = (product) => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <img src='${product.imageUrl}' width='280px'/>
            <p>Name: ${product.name}</p>
            <p>Price: ${product.price}</p>
            <button class="editProduct" onclick="showEditSection(${product.id}, '${product.name}', '${product.price}', '${product.imageUrl}')">Edit</button>
            <button class="deleteProduct" data-id="${product.id}">Delete</button>
            <hr/>
        `;
        return div;
    };

    //להכניס למוצרים מוצר חדש
    function createProduct(name, price, imageUrl) {
        const product = {
            name: name,
            price: price,
            imageUrl: imageUrl
        };

        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        }).then(response => {
            if (response.ok) {
                return response;
            }
        }).then(data => {
            console.log('Product created:', data);
            getProducts();
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            // PasAnmation.classList.add('hide');

        });
    }

    

   
    getProducts();
    productsForm.addEventListener('submit', (e) => {
        // PasAnmation.style.display='block';

        e.preventDefault(); 
        const productName = productsForm.name.value;
        const productPrice = productsForm.price.value;
        const imageUrl = `../products/${productName}.jpg`;
        createProduct(productName, productPrice, imageUrl);
        productsForm.reset(); // Clear the form fields
    });

    productsListAdmin.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteProduct')) {
            //  PasAnmation.style.display='block';

            event.preventDefault();
            const productId = event.target.getAttribute('data-id');
            deleteProduct(productId);
        }
    

    });
// });