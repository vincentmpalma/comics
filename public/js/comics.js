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

  console.log("in add comment")
  let response = await fetch(`/api/comics/comments`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      comment: userComment, 
      comicId: comicId,
      userId: userId,    
    })
  })
  let data = await response.json();


  console.log('data: ', data)

}