const loginBtn = document.getElementById('login');
const signBtn = document.getElementById('signup');

loginBtn.addEventListener('click',()=>{
    location.href='./login/index.html';
})

signBtn.addEventListener('click',()=>{
    location.href='./signup/index.html'
})