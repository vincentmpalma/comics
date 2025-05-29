async function viewComments(id){


  console.log('in api: ')
  let response = await fetch(`/api/comics/comments/${id}`,{
    method: 'GET',
  })
  let data = await response.json();


  console.log('data: ', data)

}