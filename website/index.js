var divTag = document.getElementById("counts");
var searchInput = document.getElementById("search");
var cartCount = document.querySelector('.cart span');  // To display cart item count
var api = "https://dummyjson.com/products";
var cart = []; // Initialize an empty cart

fetch(api)
  .then((res) => res.json())
  .then((data) => {
    let ads = data.products;

    // Function to render products
    const renderProducts = (filteredAds) => {
      divTag.innerHTML = '';
      filteredAds.forEach((product) => {
        divTag.innerHTML += `<div class='card'>
          <img src="${product.images[0]}" alt="Product Image"/>
          <p>${product.title}</p>
          <span>Price: $${product.price}</span>
          <div class="rating">
            ${generateStars(product.rating)}
          </div>
          <button class="btn-buy" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.images[0]}">Buy Now</button>
        </div>`;
      });
      
      // Add event listeners to "Buy Now" buttons
      const buyButtons = document.querySelectorAll('.btn-buy');
      buyButtons.forEach((button) => {
        button.addEventListener('click', addToCart);
      });
    };

    // Function to generate star ratings
    const generateStars = (rating) => {
      let stars = '';
      for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
          stars += `<span class="star">&#9733;</span>`;
        } else {
          stars += `<span class="star">&#9734;</span>`;
        }
      }
      return stars;
    };

    // Function to add products to the cart
    const addToCart = (e) => {
      const product = {
        id: e.target.getAttribute('data-id'),
        title: e.target.getAttribute('data-title'),
        price: e.target.getAttribute('data-price'),
        image: e.target.getAttribute('data-image'),
      };

      cart.push(product);
      updateCartCount();
    };

    // Update the cart count display
    const updateCartCount = () => {
      cartCount.textContent = cart.length; // Display the number of items in the cart
    };

    // Initial render
    renderProducts(ads);

    // Search functionality
    searchInput.addEventListener("input", (e) => {
      let searchTerm = e.target.value.toLowerCase();
      let filteredAds = ads.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
      renderProducts(filteredAds);
    });
  });
