const open=document.getElementsByClassName('open');
const modal_container=document.getElementById('modal_container');
const close=document.getElementById('close');
const turnIn=document.getElementById('turnIn');
const check = document.getElementById('check');
const big_container=document.getElementById('big_container');

for (let i = 0; i < open.length; i++) {
  open[i].addEventListener('click',function(){
    console.log('clicked')
    modal_container.classList.add('show');
  
  });
}

close.addEventListener('click',function(){
  modal_container.classList.remove('show');
})

turnIn.addEventListener('click',function(){
  turnIn.classList.add('active');
  turnIn.innerText='Turned In';
  check.classList.add('active');
  big_container.classList.add('active');
})

function DoAnimation() {
  const targetElement = document.getElementById("animation");
  targetElement.className = "animate";
}