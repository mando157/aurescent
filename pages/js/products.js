// * WOW
wow = new WOW(
    {
        animateClass: 'animate__animated',
    }
)
wow.init();

// * LocalStorage
if(localStorage.getItem("cartProducts") === null){
    updateLocalStorage();
}else{
    cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
}

getData("../data/products.json");
loading();

