const btnvideo = document.getElementById("btnvideo")
const catchLead = document.getElementById("catchLead")
const myHistory = document.getElementById("myHistory")
const mainTitle = document.getElementById("mainTitle")
const checkAgree = document.getElementById("checkAgree")
const cityInput = document.getElementById("cityInput")
const video = document.getElementById("video")

function onloadInit() {
    video.style.display = "block"
    catchLead.style.display = "none"
}



btnvideo.addEventListener("click",()=> {

    if(btnvideo.textContent == "Quero Minha Apostila Grátis") btnvideo.disabled = true
    if(btnvideo.textContent == "Baixar Apostila"){ }

  video.pause()
  video.style.display = "none"
  btnvideo.textContent = "Baixar Apostila"
  catchLead.style.display = "block"
  myHistory.style.display = "none"
  mainTitle.textContent = "PREENCHA OS CAMPOS PARA OBTER SUA APOSTILA GRATUITA!"
  
})

checkAgree.addEventListener("change",()=> {
    if(checkAgree.checked){
        btnvideo.disabled = false
    }else{
        btnvideo.disabled = true
    }
})

fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados') // Replace with your API URL
        .then(response => response.json())
        .then(data => {
            cityInput.innerHTML = ""; // Clear previous options if needed
            // Loop through the array and create option elements
            data.forEach(item => {
                let option = document.createElement("option");
                option.value = item.nome
                option.textContent = item.nome  // Assuming each item has an 'id'
                cityInput.appendChild(option);
            });
        })
.catch(error => alert("O campo cidade não pode ser carregado!: ", error));

onloadInit()