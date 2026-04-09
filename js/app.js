  const categoryList = document.getElementById("categoryList");
  const productList = document.getElementById("productList");

  // 🔹 Get Categories
  function getCategories() {
    axios.get("https://dummyjson.com/products/categories")
      .then(res => {
        let html = "";

        res.data.forEach(cat => {
          const slug = cat.slug || cat;
          const name = cat.name || cat;

          html += `
            <div class="col-6 col-md-4 col-lg-3">
              <div class="category-box shadow-sm"
                onclick="getProducts('${slug}')">
                <i class="fa-solid fa-tag mb-2"></i>
                <div>${name}</div>
              </div>
            </div>
          `;
        });

        categoryList.innerHTML = html;
      });
  }

  // 🔹 Get Products by Category
  function getProducts(slug) {
    productList.innerHTML = "<p>Loading...</p>";

    axios.get(`https://dummyjson.com/products/category/${slug}`)
      .then(res => {
        let html = "";

        res.data.products.forEach(product => {
          html += `
            <div class="card me-3" style="max-width: 320px">
    <img src="${product.thumbnail}" class="card-img-top" alt="Product Image">
    <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <div class="d-flex justify-content-between align-items-center">
            <span class="h5 mb-0">$${product.price}</span>
            <div>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-half text-warning"></i>
                <small class="text-muted">${product.rating}</small>
            </div>
        </div>
    </div>
    <div class="card-footer d-flex justify-content-between bg-light">
        <button class="btn btn-primary btn-sm">Add to Cart</button>
        <button class="btn btn-outline-secondary btn-sm"><i class="fa-regular fa-heart"></i></button>
    </div>
</div>
          `;
        });

        productList.innerHTML = html;
      })
      .catch(err => {
        productList.innerHTML = "<p>Error loading products</p>";
      });
  }

  // Initial Load
  getCategories();

//   scroll bar 
$('.sliding-br').slick({
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});
// accordion here 

var title = document.querySelectorAll(".title");
var para = document.querySelectorAll(".para");

for (let t of title) {
  t.addEventListener("click", function (e) {
    var pp = e.target.nextElementSibling;
    if (e.target.classList.contains("click")) {
      e.target.classList.remove("click");
      pp.style.height = "";
      pp.classList.remove("open");
    } else {
      var currentac = document.querySelector(".click");
      if (currentac) {
        currentac.classList.remove("click");
      }
      var currentop = document.querySelector(".open");
      if (currentop) {
        currentop.classList.remove("open");
        currentop.style.height = "";
      }
      e.target.classList.add("click");
      pp.style.height = pp.scrollHeight + "px";
      pp.classList.add("open");
    }
  });
}
// form validtaion 
 const form = document.getElementById("contactForm");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message").value.trim();

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let phoneError = document.getElementById("phoneError");
    let messageError = document.getElementById("messageError");
    let successMsg = document.getElementById("successMsg");

    nameError.innerText = "";
    emailError.innerText = "";
    phoneError.innerText = "";
    messageError.innerText = "";
    successMsg.innerText = "";

    let isValid = true;

    if (name === "") {
      nameError.innerText = "Name is required";
      isValid = false;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === "") {
      emailError.innerText = "Email is required";
      isValid = false;
    } else if (!email.match(emailPattern)) {
      emailError.innerText = "Enter valid email";
      isValid = false;
    }

    let phonePattern = /^[0-9]+$/;
    if (phone === "") {
      phoneError.innerText = "Phone is required";
      isValid = false;
    } else if (!phone.match(phonePattern)) {
      phoneError.innerText = "Phone must be numeric";
      isValid = false;
    }

    if (message === "") {
      messageError.innerText = "Message is required";
      isValid = false;
    }

    if (isValid) {
      successMsg.innerText = "Form submitted successfully!";
      form.reset();
    }

  });