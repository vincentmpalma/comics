// even listener(s)
let randomButton = document.querySelector("#randomButton");
randomButton.addEventListener("click", displayRandomComic);

let newComicForm = document.querySelector("#saveNewComic");
newComicForm.addEventListener("click", addNewComic);

// Toast
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

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
//   e.preventDefault();
//   alert("clicked");


//   console.log(`

//     ${newTitle.value}\n
//     ${newUrl.value}\n
//     ${newDate.value}\n
//     ${newSite.value}\n
    
//     `)

let newTitle = document.querySelector("#newTitle").value;
let newUrl = document.querySelector("#newUrl").value;
let newDate = document.querySelector("#newDate").value;
let newSite = document.querySelector("#newSite").value;

console.log(newTitle)
console.log(newUrl)
console.log(newDate)
console.log(newSite)

  let response = await fetch('/api/comics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: newTitle,
      url: newUrl,
      date: newDate,
      site: newSite
    })
  });

  if(response.ok){
    let data = await response.json();
    console.log('Success:', data.message);
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
  } else {
    console.error('Server error:', response.status);
    let errorData = await response.json(); 
    console.error('Error details:', errorData.message);
  }
    
}