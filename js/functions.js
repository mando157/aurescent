// * Get Data
let data = null;
async function getData() {
    let allData = await fetch("../data/products.json");

    respondData = await allData.json();

    data = respondData.products;

    showProductData(data);

}
getData();
//  * Show Products Data
function showProductData(data) {

    data.forEach(product => {
        $("#Products .swiper-wrapper").append(productCardComponent(product));
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
            <div class="product">
                <img src="../images/products/${product.image}" class="img-fluid" alt="product">
                <div class="layout">
                    <h5 class="product-name m-0">${product.title}</h5>
                    <div id="Price">
                        <p class="m-1 fs-5"><span>Price :</span> <span>${product.price} <sup>$</sup></span></p>
                    </div>
                    <div class="description">
                        <p class="m-0">${product.description}</p>
                    </div>
                </div>
                <button class="read-more"><i class="fa-brands fa-opencart fa-wag"></i></button>
            </div>
        </div>
        `;
}
