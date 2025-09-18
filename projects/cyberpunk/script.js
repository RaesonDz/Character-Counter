// Matrix rain background
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let w, h, fontSize = 16, columns, drops;

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  columns = Math.floor(w / fontSize);
  drops = Array(columns).fill(1);
}
resize();
window.addEventListener('resize', resize);

const chars = "01<>|#/۞■◆◼︎アァカサ0123456789";

function draw(){
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0,0,w,h);

  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";
  for(let i=0;i<drops.length;i++){
    const text = chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(text,i*fontSize,drops[i]*fontSize);

    if(drops[i]*fontSize>h && Math.random()>0.975) drops[i]=0;
    drops[i]++;
  }
  requestAnimationFrame(draw);
}
draw();

// Password effects
const input = document.getElementById("password");
const display = document.getElementById("password-display");
const status = document.getElementById("status");
const unlockBtn = document.getElementById("unlockBtn");
const wipeBtn = document.getElementById("wipeBtn");

let value="";

function render(val){
  display.innerHTML="";
  for(let i=0;i<val.length;i++){
    const span=document.createElement("span");
    span.className="char";
    span.textContent=val[i];
    display.appendChild(span);

    setTimeout(()=>{
      span.classList.add("melt");
      setTimeout(()=>span.remove(),900);
    },500+i*100);
  }
}

input.addEventListener("input",e=>{
  value=e.target.value;
  render(value);
});

input.addEventListener("keydown",e=>{
  if(e.key==="Enter") attemptUnlock();
});

unlockBtn.onclick=attemptUnlock;
wipeBtn.onclick=()=>{
  value="";
  input.value="";
  display.innerHTML="";
  status.textContent="";
};

function attemptUnlock(){
  if(value==="cyber123"){
    status.style.color="#0f0";
    status.textContent="✔️ Access Granted";
  } else {
    status.style.color="#f55";
    status.textContent="✖️ Access Denied";
  }
}

// focus input on click
display.addEventListener("click",()=>input.focus());