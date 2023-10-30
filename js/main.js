import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

if ('serviceWorker' in navigator){
  window.addEventListener('load', async () => {
    try{
      let reg;
      reg = await navigator.servciceWorker.register('/sw.js', { type: "module" });

      console.log('Service worker registrada', reg);
    } catch (err) {
      console.log('Service worker registro falhou:', err);
    }
  });
}

var constraints = { video: { facingMode: "user "}, audio: false };

const cameraView = document.querySelector("#camera--view"),
cameraOutput = document.querySelector("#camera--output"),
cameraSensor = document.querySelector("#camera--sensor"),
cameraTrigger = document.querySelector("#camera--trigger")

function cameraStart(){
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    track = stream.getTracks()[0]; 
    cameraView.srcObject = stream;
  })
  .catch(function (error){
    console.error("Ocorreu um Erro", error);
  });
}

cameraTrigger.onclick = function () {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("taken");
};

window.addEventListener("load", cameraStart, false);