const exampleModal = document.getElementById('exampleModal')
let viewCommentsDivBody = document.querySelector("#viewCommentsModal")

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

async function addComment(id){

  let userComment = document.querySelector("#userComment").value
  let comicId = document.querySelector("#comicId").value
  let userEmail = document.querySelector("#userEmail").value
  let author = document.querySelector("#author").value

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


  console.log('data: ', data)

}