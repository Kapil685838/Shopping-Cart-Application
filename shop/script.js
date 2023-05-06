//Filter buttons-------------------------------------------------------------------------------------------->
const allFilter = document.querySelector("#all-btn");
const mensFilter = document.querySelector("#mens-btn");
const womensFilter = document.querySelector("#womens-btn");
const jewelleryFilter = document.querySelector("#jewellery-btn");
const electronicsFilter = document.querySelector("#electronics-btn");

//different sections---------------------------------------------------------------------------------------->
const mensSection = document.querySelector("#mens-section");
const womensSection = document.querySelector("#womens-section");
const jewellerySection = document.querySelector("#jewellery-section");
const electronicsSection = document.querySelector("#electronics-section");
const searchSection = document.querySelector("#searched-section");

const search = document.querySelector("#searchBar");
const rangeBar=document.querySelector("#range")

const applyBtn=document.querySelector("#apply-btn")
const lowPrice=document.querySelector("#low")
const midPrice=document.querySelector("#mid")
const highPrice=document.querySelector("#high")
const vHighPrice=document.querySelector("#vHigh")



let men = []; 
let women = []; 
let jewelery = [];
let electronics = []; 
let response = [];
let myCartArray = []; 
let temp=JSON.parse(localStorage.getItem("cart"))
if(temp){
  myCartArray=temp
}
//fetching api---------------------------------------------------------------------------------------------->
fetchAPI("https://fakestoreapi.com/products");
async function fetchAPI(url) {
  try {
    let data = await fetch(url);
    console.log(data);
    response = await data.json();
    console.log(response);

    men = response.filter((item) => {
      return item.category == "men's clothing";
    });
    console.log(men);

    jewelery = response.filter((item) => {
      return item.category == "jewelery";
    });
    console.log(jewelery);

    electronics = response.filter((item) => {
      return item.category == "electronics";
    });
    console.log(electronics);

    women = response.filter((item) => {
      return item.category == "women's clothing";
    });
    console.log(women);

    showAll();
  } catch (error) {
    console.log("error-msg" + error);
  }
}

//add to cart function-------------------------------------------------------------------------------------->
function addToCart(itemId) {
  let temp = response.filter((item) => {
    return item.id == itemId;
  });
  
  myCartArray.push(temp[0]);
  localStorage.setItem("cart", JSON.stringify(myCartArray));
}

//allFilter function---------------------------------------------------------------------------------------->
allFilter.addEventListener("click", showAll);
function showAll() {
  allFilter.classList.add("active");
  searchSection.classList.add("hide-class");

  const allSections = [
    mensSection,
    womensSection,
    jewellerySection,
    electronicsSection,
  ];
  allSections.forEach((section) => section.classList.remove("hide-class"));

  const allFilters = [
    mensFilter,
    womensFilter,
    jewelleryFilter,
    electronicsFilter,
  ];
  allFilters.forEach((section) => section.classList.remove("active"));

  const myHTML_1 = men.map((item) => {
    return renderItems(item);
  });
  document.getElementById("mens-items").innerHTML = myHTML_1.join("");

  const myHTML_2 = women.map((item) => {
    return renderItems(item);
  });
  document.getElementById("womens-items").innerHTML = myHTML_2.join("");

  const myHTML_3 = jewelery.map((item) => {
    return renderItems(item);
  });
  document.getElementById("jewellery-items").innerHTML = myHTML_3.join("");

  const myHTML_4 = electronics.map((item) => {
    return renderItems(item);
  });
  document.getElementById("electronics-items").innerHTML = myHTML_4.join("");
}

//mensFilter function--------------------------------------------------------------------------------------->
mensFilter.addEventListener("click", showMensClothings);
function showMensClothings() {
  mensSection.classList.remove("hide-class");
  mensFilter.classList.add("active");

  const allSections = [womensSection, jewellerySection, electronicsSection];
  allSections.forEach((section) => section.classList.add("hide-class"));

  const allFilters = [
    allFilter,
    womensFilter,
    jewelleryFilter,
    electronicsFilter,
  ];
  allFilters.forEach((section) => section.classList.remove("active"));

  const myHTML = men.map((item) => {
    return renderItems(item);
  });
  document.getElementById("mens-items").innerHTML = myHTML.join("");
}

//womesFilter function-------------------------------------------------------------------------------------->
womensFilter.addEventListener("click", showWomensClothings);
function showWomensClothings() {
  womensSection.classList.remove("hide-class");
  womensFilter.classList.add("active");

  const allSections = [mensSection, jewellerySection, electronicsSection];
  allSections.forEach((section) => section.classList.add("hide-class"));

  const allFilters = [
    allFilter,
    mensFilter,
    jewelleryFilter,
    electronicsFilter,
  ];
  allFilters.forEach((section) => section.classList.remove("active"));

  const myHTML = women.map((item) => {
    return renderItems(item);
  });
  document.getElementById("womens-items").innerHTML = myHTML.join("");
}

//jewelleryFilter function---------------------------------------------------------------------------------->
jewelleryFilter.addEventListener("click", showJewellery);
function showJewellery() {
  jewellerySection.classList.remove("hide-class");
  jewelleryFilter.classList.add("active");

  const allSections = [mensSection, womensSection, electronicsSection];
  allSections.forEach((section) => section.classList.add("hide-class"));

  const allFilters = [allFilter, mensFilter, womensFilter, electronicsFilter];
  allFilters.forEach((section) => section.classList.remove("active"));

  const myHTML = jewelery.map((item) => {
    return renderItems(item);
  });
  document.getElementById("jewellery-items").innerHTML = myHTML.join("");
}

//electronicsFilter function---------------------------------------------------------------------------------->
electronicsFilter.addEventListener("click", showElectronics);
function showElectronics() {
  electronicsSection.classList.remove("hide-class");
  electronicsFilter.classList.add("active");

  const allSections = [mensSection, jewellerySection, womensSection];
  allSections.forEach((section) => section.classList.add("hide-class"));

  const allFilters = [allFilter, mensFilter, jewelleryFilter, womensFilter];
  allFilters.forEach((section) => section.classList.remove("active"));

  const myHTML = electronics.map((item) => {
    return renderItems(item);
  });
  document.getElementById("electronics-items").innerHTML = myHTML.join("");
}

//search function------------------------------------------------------------------------------------------->
search.addEventListener("input", searchItems);
function searchItems() {
  const searchTerm = search.value.toLowerCase().trim();
  let searchResults = response.filter((item) =>
    item.title.toLowerCase().includes(searchTerm)
  );

  const allSections = [
    mensSection,
    womensSection,
    jewellerySection,
    electronicsSection,
  ];
  allSections.forEach((section) => section.classList.add("hide-class"));

  const allFilters = [
    allFilter,
    mensFilter,
    womensFilter,
    jewelleryFilter,
    electronicsFilter,
  ];
  allFilters.forEach((section) => section.classList.remove("active"));
  
  
console.log(searchResults)


  if (searchTerm !== "") {
   
    const searchHTML = searchResults.map((item) => renderItems(item));
    document.getElementById("searched-items").innerHTML = searchHTML.join("");
    searchSection.classList.remove("hide-class");
  } else {
    document.getElementById("searched-items").innerHTML = "No items found";
    // document.getElementById("searched-section").classList.add("hide-class");
  }
  if(searchResults.length==0){
    document.getElementById("searched-items").innerHTML = "No items found";
  
    }
}

//render function------------------------------------------------------------------------------------------->
function renderItems(item) {
   //  <div class="title">${item.title}</div>  after div class info
  return `
 <div class="item">
 <div id="img-div">
 <img src=${item.image} alt="Item" />
 </div>
   <div class="info" id="info-div">
   <div class="title">${item.title.slice(0,42)}...</div>
   <div class="row">
     <div class="price">$${item.price}</div>
     <div class="sized">S,M,L</div>
   </div>
   <div class="colors">
     Colors:
     <div class="row">
       <div class="circle" style="background-color: #000"></div>
       <div class="circle" style="background-color: #4938af"></div>
       <div class="circle" style="background-color: #203d3e"></div>
     </div>
   </div>
   <div class="row">Rating: ${item.rating.rate}⭐</div>
 </div>
  <div id="btn-div">
 <button id="addBtn" onclick="addToCart(${item.id})">Add to Cart</button>
 </div>
</div>`;
}

//function for the range bar--------------------------------------->
rangeBar.addEventListener("input", applyRatingFilter)
function applyRatingFilter(){
  const ratingValue = rangeBar.value
  let ratingResults = response.filter((item) =>{
    return Math.floor(item.rating.rate)==(ratingValue)

  } );
  const searchHTML = ratingResults.map((item) => renderItems(item));
  document.getElementById("searched-items").innerHTML = searchHTML.join("");
  searchSection.classList.remove("hide-class");
}

//function for  filtering according ti price--------------------------------->
applyBtn.addEventListener("click",filterPrice)
function filterPrice(){
  let resultsArr=[]
  if(lowPrice.checked==true){
    
    let temp=response.filter((item)=>{
      return item.price<=25.0
    })
    
   temp.forEach((item)=>{
    resultsArr.push(item)
   })
   
  }
  if(midPrice.checked==true){
    
    let temp=response.filter((item)=>{
      return item.price>=25.0 && item.price<=50.0
    })
    
   temp.forEach((item)=>{
    resultsArr.push(item)
   })
   
  }
  if(highPrice.checked==true){
    
    let temp=response.filter((item)=>{
      return item.price>=50.0 && item.price<=100.0
    })
    
   temp.forEach((item)=>{
    resultsArr.push(item)
   })
   
  }
  if(vHighPrice.checked==true){
    
    let temp=response.filter((item)=>{
      return item.price>=100.0
    })
    
   temp.forEach((item)=>{
    resultsArr.push(item)
   })
   
  }
 
  const searchHTML = resultsArr.map((item) => renderItems(item));
  document.getElementById("searched-items").innerHTML = searchHTML.join("");
  searchSection.classList.remove("hide-class");
  
  if(lowPrice.checked==false && midPrice.checked==false && highPrice.checked==false && vHighPrice.checked==false){
    document.getElementById("searched-items").innerHTML =""
    searchSection.classList.add("hide-class");

  }
  }
      
