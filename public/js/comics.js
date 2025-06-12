const exampleModal = document.getElementById('exampleModal')
let viewCommentsDivBody = document.querySelector("#viewCommentsModal")

const addModal = document.getElementById('addModal')

let toastMessage = document.querySelector("#toastMesage");
// Toast
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

let modal = new bootstrap.Modal(addModal);


async function viewComments(id){


  console.log('in api: ')
  let response = await fetch(`/api/comics/comments/${id}`,{
    method: 'GET',
  })
  let data = await response.json();


  console.log('frontend recieved: ', data)
  console.log('data: ', data)


  viewCommentsDivBody.innerHTML = "" // fix this
  for (let comment of data){
    let content = document.createElement("h3");
    content.innerText = comment.comment
    let author = comment.author;
    let email = comment.email;

    viewCommentsDivBody.appendChild(content)
    
  }

  let modal = new bootstrap.Modal(exampleModal);
  modal.show();

}

async function showAddModal(id){

  console.log("in addComent")
  console.log("id: ", id)
  document.querySelector("#addCommentId").value = id
  // let modal = new bootstrap.Modal(addModal);
  modal.show();
}

async function addComment(){

  let userComment = document.querySelector("#userComment").value
  let comicId = document.querySelector("#addCommentId").value
  let userEmail = document.querySelector("#userEmail").value
  let author = document.querySelector("#author").value

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

  if(!userComment || !userEmail || !author || userComment=="" || userEmail=="" || author==""){
    toastMessage.innerText = "❌ Please fill out the whole form."
    toastBootstrap.show()
    return;
  }

  console.log("in add comment")
  let response = await fetch(`/api/comics/comments`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      comment: userComment, 
      comicId: comicId,
      author: author,
      email: userEmail,    
    })
  })
  let data = await response.json();

  
  if(response.ok){
    toastMessage.innerText = "✅ Your comment was added successfully!"
    modal.hide();
    viewComments(comicId)
  } else {
    toastMessage.innerText = "❌ There was an error adding your comment."
  }
  toastBootstrap.show()


  console.log('data: ', data)

}