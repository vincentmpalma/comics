// even listener(s)
let randomButton = document.querySelector("#randomButton");
randomButton.addEventListener("click", displayRandomComic);

let newComicForm = document.querySelector("#newComicForm");
newComicForm.addEventListener("submit", addNewComic);

// html elements to change
let randomTitle = document.querySelector("#randomComicTitle");
let randomImg = document.querySelector("#randomComicImg");

// function calls api to get new random comic and display it on the page
async function displayRandomComic(){

  // api call
  let url = "/api/comics/random";
  let res = await fetch(url);
  let data = await res.json();

  // changing title and image on page
  randomTitle.innerText = data[0].comicTitle
  randomImg.src = data[0] = data[0].comicUrl

}

async function addNewComic(e){
  e.preventDefault();
  alert("clicked");

let newTitle = document.querySelector("#newTitle");
let newUrl = document.querySelector("#newUrl");
let newDate = document.querySelector("#newDate");
let newSite = document.querySelector("#newSite");

  console.log(`

    ${newTitle.value}\n
    ${newUrl.value}\n
    ${newDate.value}\n
    ${newSite.value}\n
    
    `)

    
}