// * Get Data
let data = null;
async function getData(urlPath) {
    let allData = await fetch(urlPath ?? '../data/data.json');

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
        <div class="box col-11 col-md-6 col-lg-4 wow animate__fadeIn">
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
                <button class="shop-now">
                    <i class="fa-brands fa-opencart fa-wag"></i>
                </button>
            </div>
        </div>
        `;
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