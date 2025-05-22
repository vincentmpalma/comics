// even listener(s)
let randomButton = document.querySelector("#randomButton");
randomButton. addEventListener("click", displayRandomComic);

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