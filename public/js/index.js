document.querySelector("#signUpForm").addEventListener("submit", async function (e){
  e.preventDefault();
  console.log("in signUpForm JS")

  let email = document.querySelector("#newEmail").value
  let username = document.querySelector("#newUsername").value
  let password = document.querySelector("#newPassword").value
  let confirmPassword = document.querySelector("#newConfirmPassword").value


  let emptyFieldsError = document.querySelector("#emptyFieldsError");
  let passwordMatchError = document.querySelector("#passwordMatchError");

  emptyFieldsError.innerText = "";
  passwordMatchError.innerText = "";

  if(!username || !email || !password || !confirmPassword){
    emptyFieldsError.innerText = "Please fill in all fields.";
    return;
  }

  console.log("middle")

  if(password != confirmPassword){
    passwordMatchError.innerText = "Passwords do not match";
    return;
  }

  console.log("end")

})