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
    fetchStates('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
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

async function fetchStates(url) {
    const response = await fetch(url)
    const data = await response.json()
    cityInput.innerHTML = `<option value="nenhum valor selecionado">Informe seu Estado</option>`
    let dataset = data
    dataset.sort((a, b) => a.nome.localeCompare(b.nome))

    dataset.forEach(item => {
        let option = document.createElement("option");
        option.value = item.nome
        option.textContent = item.nome  // Assuming each item has an 'id'
        cityInput.appendChild(option);
      
    }) .catch(error => alert("Erro ao carregar o campo estados: ", error));
} 

function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}

function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}

function telefone(v){
    v=v.replace(/\D/g,"")                 //Remove tudo o que não é dígito
    v=v.replace(/^(\d\d)(\d)/g,"($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d{5})(\d)/,"$1-$2")    //Coloca hífen entre o quarto e o quinto dígitos
    return v
}

function validateEmail(email) {
  
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const hasValidStructure = re.test(email);
    const hasValidDomain = email.split('@')[1]?.includes('.');
    const hasNoIllegalChars = /^[a-zA-Z0-9.@_-]+$/.test(email);
  
    if (!hasValidStructure) {
      return 'Invalid email format';
    }
    if (!hasValidDomain) {
      return 'Invalid domain';
    }
    if (!hasNoIllegalChars) {
      return 'Email contains illegal characters';
    }
  
    return true;
  }
  

onloadInit()

