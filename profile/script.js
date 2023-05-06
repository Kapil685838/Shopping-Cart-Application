const firstName=document.querySelector("#firstName")
const lastName=document.querySelector("#lastName")
const oldPassword=document.querySelector("#oldPassword")
const newPassword=document.querySelector("#newPassword")
const confirmPassword=document.querySelector("#confirmPassword")

const saveButton=document.querySelector("#saveBtn")
const logoutButton=document.querySelector("#logoutBtn")

const currentUser=JSON.parse(localStorage.getItem("currentUser"))
let allUsersArr=JSON.parse(localStorage.getItem("user"))

firstName.value=currentUser.firstName
lastName.value=currentUser.lastName

//function for saving users data--------------------------------------------->
saveButton.addEventListener("click", saveFunction)
function saveFunction(e){
  e.preventDefault()
   if(oldPassword.value != currentUser.password){
    alert("Please Put The Correct Password")
   }

  if(newPassword.value != confirmPassword.value){
  alert("New Password And Confirm Password Missmatch")
  }
   else if(newPassword.value==""){
alert("Please put the New Password Before Saving")
  }
  else if(newPassword.value!="" && newPassword.value == confirmPassword.value && oldPassword.value == currentUser.password ){
  currentUser.password=newPassword.value
  currentUser.firstName=firstName.value
  currentUser.lastName=lastName.value

  console.log(currentUser)
  localStorage.setItem("currentUser", JSON.stringify(currentUser))
  
    allUsersArr.forEach((item) => {
      if(currentUser.email == item.email){
        item.password=newPassword.value
        item.firstName=firstName.value
        item.lastName=lastName.value
      }
    });
  localStorage.setItem("user", JSON.stringify(allUsersArr))


 alert("Success")
 oldPassword.value=""
 newPassword.value=""
 confirmPassword.value=""
}

   
}

//function for logout-------------------------------------------->
logoutButton.addEventListener("click",logoutFunction)
function logoutFunction(e){
  e.preventDefault()
    localStorage.setItem("currentUser", JSON.stringify({}))
     window.location.href="../index.html";
 return;
}
