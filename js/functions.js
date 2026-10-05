// * Get Data
let data = null,
    cartProducts = [];

async function getData(urlPath, id = null) {
    // * URL
    let parameter = new URLSearchParams({
        id: id,
    });

    let allData = await fetch(`${urlPath}?${parameter.toString()}`);

    respondData = await allData.json();

    data = respondData.products;

    showProductData(data);

}

//  * Show Products Data
function showProductData(data) {

    data.forEach(product => {
        $("#Shop .swiper-wrapper").append(productCardComponent(product));

        // * Show Products Page Data
        $("#AllProducts .content .row").append(pageOfProductsCardsComponent(product));

    });
}

function productCardComponent(product) {
    return `
        <div class="swiper-slide">
            <div class="image">
                <img src="./images/products/${product.image}" alt="product" class="img-fluid">
            </div>
        </div>
`;
}

// * Products Page
function pageOfProductsCardsComponent(product) {
    return `
        <div class="box col-11 col-md-6 col-lg-4 wow animate__fadeIn" data-id="${product.id}">
            <div class="product text-light">
                <img src="../images/products/${product.image}" class="img-fluid" alt="product">
                <div class="layout">
                    <h5 class="product-name m-0">${product.title}</h5>
                    <div id="Price">
                        <p class="m-0 fs-6">
                            <span class="fs-5">Price :</span>
                            <span class="text-secondary ${(Number(product.discountPercentage) == "") ? 'd-none' : ''}"><del>${Number(product.price)}</del><sup>$</sup></span>
                            <span class="price">${(Number(product.price) * (1 - Number(product.discountPercentage) / 100)).toFixed(2)}<sup>$</sup></span>
                        </p>
                    </div>
                    <div class="dimensions my-2">
                        <ul class="m-0 p-0">
                            <li><span>width :</span> <span class="dim-content ml-2">${product.dimensions.width}</span></li>
                            <li><span>height :</span> <span class="dim-content ml-2">${product.dimensions.height}</span></li>
                            <li><span>depth :</span> <span class="dim-content ml-2">${product.dimensions.depth}</span></li>
                        </ul>
                    </div>
                    <div class="description">
                        <p class="m-0">${product.description}</p>
                    </div>
                </div>
                <button class="shop-now" onclick="addProductToCart(this)">
                    <i class="fa-brands fa-opencart fa-wag"></i>
                </button>
            </div>
        </div>
        `;
}
// * LocalStorage in Product Page 

// * LocalStorage
if (localStorage.getItem("cartProducts") === null) {
    updateLocalStorage();
} else {
    cartProducts = JSON.parse(
        localStorage.getItem("cartProducts")
    );

    $(".cart-counter").text(cartProducts.length);
}


function updateLocalStorage() {
    localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
    );
}

function addProductToCart(that) {
    getProductById(that.closest(".box").getAttribute("data-id"));
}

// * Get Product By ID
function getProductById(productId) {
    let product = data.find(product => product.id == productId);

    cartProducts.push(product);

    updateLocalStorage();
    $(".cart-counter").text(cartProducts.length);

}


function showCartProducts() {
    cartProducts.forEach(function (product) {
        $(".cart-content").append(cartProductComponent(product));
    });
}


function cartProductComponent(product) {
    return `
        <div class="product mx-auto" data-id="${product.id}">
            <div class="image d-flex flex-column align-items-center gap-3">
                <img src="../images/products/${product.image}" class="img-fluid" alt="product">
                <h5 class="product-name m-0 mx-3">${product.title}</h5>
            </div>
            <div class="text">
                <div class="description">
                    <p class="m-0">
                        ${product.description}
                    </p>
                </div>

                <div class="dimensions my-2">
                    <ul class="m-0 p-0 d-flex flex-column gap-1">
                        <li><span>width :</span> <span class="dim-content ml-2 fw-bold">${product.dimensions.width}</span></li>
                        <li><span>height :</span> <span class="dim-content ml-2 fw-bold">${product.dimensions.height}</span></li>
                        <li><span>depth :</span> <span class="dim-content ml-2 fw-bold">${product.dimensions.depth}</span></li>
                    </ul>
                </div>

                <div id="Price" class="fw-bold">
                    <p class="m-0 fs-6">
                        <span class="fs-5">Price :</span>
                        <span class="text-secondary ${(Number(product.discountPercentage) == "") ? 'd-none' : ''}"><del>${Number(product.price)}</del><sup>$</sup></span>
                        <span class="price">${(Number(product.price) * (1 - Number(product.discountPercentage) / 100)).toFixed(2)}<sup>$</sup></span>
                    </p>
                </div>

                <button class="btn btn-danger" onclick="removeProduct(this)">Remove</button>
            </div>
        </div>

    `
}

function removeProduct(that) {
    let product = that.closest(".product"),
        productId = product.getAttribute("data-id");

    product.remove();

    let removedProduct = cartProducts.find(product => product.id == productId);
    cartProducts.splice(removedProduct, 1);

    updateLocalStorage();
}


// * Loading Function
function loading() {
    $("body").css("overflow", "hidden");

    window.addEventListener("DOMContentLoaded", function () {
        setTimeout(function () {
            $(".loading").fadeOut(1000);
            $("body").css("overflow", "", 1000);
        }, 1000);
    });
}