//alert("i");
function validate_password() {

    var pass = document.getElementById('password').value;
    var confirm_pass = document.getElementById('confirmPassword').value;
    if (pass != confirm_pass) {

      // document.getElementById('confirmPassword').style.borderColor = 'red';
      document.getElementById('confirmPassword').classList.add('check');
      // document.getElementById('wrong_pass_alert').innerHTML= '☒ Use same password';

      document.getElementById('submitBtn').disabled = true;

      document.getElementById('submitBtn').style.opacity=(0.4);
    } else {
      // document.getElementById('wrong_pass_alert').style.color = 'green';
      // document.getElementById('wrong_pass_alert').innerHTML ='🗹 Password Matched';
      document.getElementById('confirmPassword').classList.remove('check');
      document.getElementById('confirmPassword').classList.add('checked');
      document.getElementById('submitBtn').disabled = false;
      document.getElementById('submitBtn').style.opacity = (1);
  }
}

function wrong_pass_alert() {
      if (document.getElementById('password').value != "" &&
            document.getElementById('confirmPassword').value != "") {
            alert("Your response is submitted");}
       else {
            alert("Please fill atleast one the field");
            }
  }


  document.getElementById('confirmPassword').addEventListener('keyup',validate_password);

document.getElementById('submitBtn').addEventListener('click', wrong_pass_alert) ;



const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye / eye slash icon
    if(this.classList.contains('fa-eye')){
      this.classList.remove('fa-eye');
       this.classList.add('fa-eye-slash');
    }
    else {
   this.classList.remove('fa-eye-slash');
   this.classList.add('fa-eye');}
});

const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
const confirmPassword = document.querySelector('#confirmPassword');

toggleConfirmPassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);
    // toggle the eye / eye slash icon
    if(this.classList.contains('fa-eye')){
      this.classList.remove('fa-eye');
       this.classList.add('fa-eye-slash');
    }
    else {
   this.classList.remove('fa-eye-slash');
   this.classList.add('fa-eye');}
});

















// function updateRequirements() {
//   var name = document.getElementById('password').value;
//   console.log(name);
//   if (name != '') {
//     document.getElementById('confirmPassword').required = true;
//   } else {
//     document.getElementById('confirmPassword').required = false;
//   }
// }
//
// document.getElementById("submitBtn").addEventListener("keydown",function(event){
//   //alert(i);
//   console.log("entered");
//   if (event.keyCode === 13) {
//     updateRequirements();
//     document.getElementById("submitBtn").click();
// }
// });
//
// document.getElementById("submitBtn").addEventListener("Click",function(event){
//   //alert(i);
//   console.log("click");
//   if (event.keyCode === 13) {
//     updateRequirements();
//     //document.getElementById("submitBtn").click();
// }
// });
