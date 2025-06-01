async function viewComments(id){


  console.log('in api: ')
  let response = await fetch(`/api/comics/comments/${id}`,{
    method: 'GET',
  })
  let data = await response.json();


  console.log('data: ', data)

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