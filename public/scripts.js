const btnvideo = document.getElementById("btnvideo")
const catchLead = document.getElementById("catchLead")
const myHistory = document.getElementById("myHistory")
const mainTitle = document.getElementById("mainTitle")
const agreeNotify = document.getElementById("agreeNotify")
const video = document.getElementById("video")
const myform = document.getElementById("myform")


function onloadInit() {
    catchLead.style.display = "none"
    video.style.display = "block"
    btnvideo.value = "Quero Minha Apostila Grátis"
    mainTitle.textContent = "PREENCHA OS CAMPOS PARA OBTER SUA APOSTILA GRATUITA!"
    fetchStates('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
}

btnvideo.addEventListener("click",()=> {
  switch (btnvideo.value) { 
    case "Quero Minha Apostila Grátis":
      video.pause()
      video.style.display = "none"
      btnvideo.value = "Baixar Apostila"
      btnvideo.disabled = true
      catchLead.style.display = "block"
      myHistory.style.display = "none"  
      mainTitle.textContent = "PREENCHA OS CAMPOS PARA OBTER SUA APOSTILA GRATUITA!"
      
      break
    case "Baixar Apostila":
      
      const firstName = document.getElementById('firstName').value.trim()
      const lastName = document.getElementById('lastName').value.trim()
      const phone = document.getElementById('phone').value.trim()
      const email = document.getElementById('email').value.trim()
      const yourState = document.getElementById('yourState').value
      const age = document.getElementById('age').value
      const howWeMet = document.getElementById('howWeMet').value
      const positionLife = document.getElementById('positionLife').value
      const message = document.getElementById('message')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const hasValidDomain = email.split('@')[1]?.includes('.')
      const hasNoIllegalChars = /^[a-zA-Z0-9.@_-]+$/.test(email)

      message.textContent = "";
      message.style.color = "red"

        if (!firstName || firstName.length < 3) {
         message.textContent = "Seu nome precisa ter pelo menos 3 caracteres"
         
          return;
        }

        if (!lastName || lastName.length < 5) {
          message.textContent = "Seu sobre nome precisa ter pelo menos 5 caracteres"
         
          return;
        }
        
        if (!email || !emailRegex.test(email) || !hasValidDomain || !hasNoIllegalChars) {
          message.textContent = "Por favor informe um E-mail válido!"
          return;
        }
      
        const phoneRegex = /^\(\d{2}\) 9\d{4}-\d{4}$/
        if (!phoneRegex.test(phone)) {
          message.textContent = "Por favor informe um Celular válido!"
          return;
        }

        if (!yourState) {
          message.textContent = "Por favor, selecione seu estado!"
          return;
        }
      
        if (!age) {
          message.textContent = "Por favor, uma faixa de idade!"
          return;
        }

        if (!howWeMet) {
          message.textContent = "Por favor, informe como chegou até nós?"
          return;
        }

        if (!positionLife) {
          message.textContent = "Informe a área que precisa da sua atenção?";
          return;
        }

      const data = {
        firstName: firstName,
        lastName: lastName,
        phone: phone, 
        email: email,
        age: age,
        howWeMet: howWeMet, 
        positionLife: positionLife,
        yourState: yourState,
        agreeNotify: agreeNotify.value
      };
        
      fetch('/submit2', {
          method: 'POST', // Use POST method
          headers: {
            'Content-Type': 'application/json' // Specify JSON  format
          },
          body: JSON.stringify(data) // Convert the data object to a JSON string
        })
          .then(result => {
            console.log('Data submitted successfully:', result);
            myform.reset()
            message.style.color = "green"
            message.style.fontSize = "18px"
            message.textContent = "Parabens!! " + firstName + " sua apostila esta esperando por você no email, " +  email + " !!"

          })
          .catch(error => {
            console.error('Error submitting data:', error);

          });
         
      break

       } 

    })

  agreeNotify.addEventListener("change",()=> {
    if(agreeNotify.checked){
        btnvideo.disabled = false
    }else{
        btnvideo.disabled = true
    }
})

async function fetchStates(url) {
    const response = await fetch(url)
    const data = await response.json()
    yourState.innerHTML = `<option value="">Informe seu estado?</option>`
    let dataset = data
    dataset.sort((a, b) => a.nome.localeCompare(b.nome))
    dataset.forEach(item => {
        let option = document.createElement("option");
        option.value = item.nome
        option.textContent = item.nome  // Assuming each item has an 'id'
        yourState.appendChild(option);
      
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

  onloadInit()


