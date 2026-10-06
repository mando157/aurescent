// * Get Data
let data = null,
    cartProducts = [],
    feedBackContainer = [];

async function getData(urlPath) {

    let allData = await fetch(`${urlPath}`);

    respondData = await allData.json();

    data = respondData.products;


    showProductData(data);

}

//  * Show Products Data
function showProductData(data) {

    data.forEach(product => {
        product.numberOfItems = 0;

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
                            <li><span>Amount :</span> <span class="dim-content ml-2">${((product.dimensions.height) * (product.dimensions.width)).toFixed(0)}ml</span></li>
                            <li><span>Depth :</span> <span class="dim-content ml-2">${product.dimensions.depth}</span></li>
                            <li><span>Quantity :</span> <span class="numberOfItems dim-content ml-2">0</span></li>
                        </ul>
                    </div>
                    <div class="description">
                        <p class="m-0">${product.description}</p>
                    </div>
                </div>
                <button class="shop-now" onclick="addProductToCart(this);alert('Added to your Cart' , 'success');">
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

    let totalQuantity = cartProducts.reduce(function (total, product) {
        return total + product.numberOfItems;
    }, 0);

    $(".cart-counter").text(totalQuantity);

    // * Check Cart
    if (cartProducts.length > 0) {
        $(".no-product").addClass("d-none");
    } else {
        $(".no-product").removeClass("d-none");
    }

    feedBackContainer = JSON.parse(
        localStorage.getItem("feedBackContainer")
    );
}

function updateLocalStorage() {
    localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
    );

    localStorage.setItem(
        "feedBackContainer",
        JSON.stringify(feedBackContainer)
    );
}

function addProductToCart(that) {
    getProductById(that.closest(".box").getAttribute("data-id"), that);
}

// * Get Product By ID
function getProductById(productId, that) {

    let product = data.find(product => product.id == productId),
        isProduct = cartProducts.find(product => product.id == productId);

    if (!isProduct) {
        cartProducts.push(product);
        product.numberOfItems = 1;

        that.closest(".box").querySelector(".numberOfItems").textContent = product.numberOfItems;

    } else {
        isProduct.numberOfItems++;

        that.closest(".box").querySelector(".numberOfItems").textContent = isProduct.numberOfItems;
    }

    updateLocalStorage();

    let totalQuantity = cartProducts.reduce(function (total, product) {
        return total + product.numberOfItems;
    }, 0);

    $(".cart-counter").text(totalQuantity);

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
                <h5 class="product-name m-0">${product.title.slice(0, 15)}</h5>
            </div>
            <div class="text">
                <div class="description">
                    <p class="m-0">
                        ${product.description}
                    </p>
                </div>

                <div class="dimensions my-2">
                    <ul class="m-0 p-0 d-flex flex-column gap-1">
                        <li><span>Quantity :</span> <span class="numberOfItems dim-content ml-2 fw-bold">${product.numberOfItems}</span></li>
                        <li><span>Amount :</span> <span class="dim-content ml-2 fw-bold">${((product.dimensions.height) * (product.dimensions.width)).toFixed(0)}ml</span></li>
                        <li><span>Depth :</span> <span class="dim-content ml-2 fw-bold">${product.dimensions.depth}</span></li>
                    </ul>
                </div>

                <div id="Price" class="fw-bold">
                    <p class="m-0 fs-6">
                        <span class="fs-5">Price :</span>

                        <span class="text-secondary ${(Number(product.discountPercentage) == "") ? 'd-none' : ''}"><del>${Number(product.price)}
                        </del><sup>$</sup></span>
                        <span class="price">${(Number(product.price) * (1 - Number(product.discountPercentage) / 100)).toFixed(2)}<sup>$</sup></span>
                    </p>
                    <p>
                        <span class="fs-5">Total Price :</span>
                        <span class="price">${((Number(product.price) * (1 - Number(product.discountPercentage) / 100)) * product.numberOfItems).toFixed(2)}<sup>$</sup></span>
                    </p>
                </div>

                <button class="btn btn-danger" onclick="removeProductFromCart(this) ; alert('Removed Successfully' ,'success')">Remove</button>
            </div>
        </div>

    `
}

function removeProductFromCart(that) {
    let product = that.closest(".product"),
        productId = product.getAttribute("data-id"),
        removedProduct = cartProducts.find(product => product.id == productId),
        removedProductIndex = cartProducts.findIndex(product => product.id == productId);

    if (removedProduct.numberOfItems == 1) {
        product.remove();
        cartProducts.splice(removedProductIndex, 1);

        if (cartProducts.length == 0) {
            $(".no-product").removeClass("d-none");
        }
    }
    else if (removedProduct.numberOfItems > 1) {
        --removedProduct.numberOfItems;

        product.querySelector(".numberOfItems").textContent = removedProduct.numberOfItems;
    }

    updateLocalStorage();

    let totalQuantity = cartProducts.reduce(function (total, product) {
        return total + product.numberOfItems;
    }, 0);

    $(".cart-counter").text(totalQuantity);
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

function alert(message, alertIcon = "success") {
    Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        customClass: {
            popup: "aurescent-toast",
            title: "aurescent-toast-title",
            timerProgressBar: "aurescent-progress"
        },

        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },

        showClass: {
            popup: `
                animate__animated
                animate__fadeInRight
                animate__faster
            `
        },

        hideClass: {
            popup: `
                animate__animated
                animate__fadeOutRight
                animate__faster
            `
        }

    }).fire({
        icon: alertIcon,
        title: message,
    });
}

// * Message Section
function addFeedBack() {
    let $form = $("#Message form"),
        $input = $("#Message input.form-control"),
        $textarea = $("#Message textarea.form-control"),
        nameRegex = /^[A-Za-z ]+$/,
        nameValue = $input.val().trim(),
        messageValue = $textarea.val().trim();

    $form.off("submit").on("submit", function (e) {
        e.preventDefault();

        if (nameValue == ""
            || messageValue == ""
            || nameValue.length < 3
            || messageValue.length < 10
            || !nameRegex.test(nameValue)) {

            if (nameValue.length < 3 || messageValue.length < 10) {
                alert("Enter a Correct Name and Feedback", "warning");
            } else {
                alert("You must enter your Name and Feedback", "warning");
            }

            return;
        } else {

            let feedBack = {
                name: nameValue,
                message: messageValue,
            };

            feedBackContainer.push(feedBack);

            updateLocalStorage();

            showFeedBack();

        }
    });
}
function showFeedBack() {
    $(".feedback-container").empty();

    feedBackContainer.forEach(function (feedBack) {
        $(".feedback-container").append(feedBackComponent(feedBack));
    });
}

function feedBackComponent(feedBack) {
    return `
        <div class="feedback mb-3">
            <h5 class="name"><i class="fa-regular fa-circle-user"></i> ${((feedBack.name == "") ? "User" : feedBack.name).slice(0, 15)} ...</h5>
            <p>${(feedBack.message) || "Don't have any feedback"}</p>
        </div>
    `
}

function reset(that){
    let form = that.closest("form"),
    inputs = form.querySelectorAll("input"),
    textarea = form.querySelector("textarea");

    textarea.value = "";
    inputs.forEach(function(input){
        input.value = "";
    });

}