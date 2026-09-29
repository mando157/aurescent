// * Get Data
let data = null;
async function getData() {
    let allData = await fetch("../data/products.json");

    data = await allData.json();

    showProductData(data);

}
getData()
//  * Show Products Data
function showProductData(data) {

    data.forEach(product => {
        $("#Products .swiper-wrapper").append(productCardComponent(product));
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