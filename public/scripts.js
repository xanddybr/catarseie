const btnvideo = document.getElementById("btnvideo")
const catchLead = document.getElementById("catchLead")
const myHistory = document.getElementById("myHistory")
const mainTitle = document.getElementById("mainTitle")
const agreeNotify = document.getElementById("agreeNotify")
const video = document.getElementById("video")
const myform = document.getElementById("myform")


document.getElementById('phone').addEventListener('keypress', function(event) {
  const charCode = event.which || event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  }

  const phoneNumber = this.value;
  if (phoneNumber.length >= 11) {
    event.preventDefault();
    return false;
  }
});

function onloadInit() {
    catchLead.style.display = "none"
    video.style.display = "block"
    btnvideo.value = "Quero Minha Apostila Grátis"
    mainTitle.textContent = "PREENCHA OS CAMPOS PARA OBTER SUA APOSTILA GRATUITA!"
    fetchStates('https://servicodados.ibge.gov.br/api/v1/localidades/estados/rj/municipios')
    //fetchStates('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
}

btnvideo.addEventListener("click",()=> {
  const valueButton = btnvideo.value
  switch (valueButton) { 
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
      const yourCity = document.getElementById('yourCity').value
      const age = document.getElementById('age').value
      const howWeMet = document.getElementById('howWeMet').value
      const positionLife = document.getElementById('positionLife').value
      const message1 = document.getElementById('message1')
      const message2 = document.getElementById('message2')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const hasValidDomain = email.split('@')[1]?.includes('.')
      const hasNoIllegalChars = /^[a-zA-Z0-9.@_-]+$/.test(email)
      message1.style.color = "red"

      setTimeout(()=> {
         message1.textContent = "";
         message2.textContent = "";        
      }, 20000);
    
        if (!firstName || firstName.length < 3) {
         message1.textContent = "Seu NOME precisa ter pelo menos 3 caracteres"
         
          return;
        }

        if (!lastName || lastName.length < 5) {
          message1.textContent = "Seu SOBRE NOME precisa ter pelo menos 5 caracteres"
         
          return;
        }
        
        if (!email || !emailRegex.test(email) || !hasValidDomain || !hasNoIllegalChars) {
          message1.textContent = "Por favor informe um E-MAIL válido!"
          return;
        }
      
        if (phone.length < 11 ) {
          message1.textContent = "Por favor informe um CELULAR válido com 11 digitos! "
          return;
        }

        if (!yourCity) {
          message1.textContent = "Por favor, selecione sua CIDADE!"
          return;
        }
      
        if (!age) {
          message1.textContent = "Por favor, uma faixa de IDADE!"
          return;
        }

        if (!howWeMet) {
          message1.textContent = "Por favor, informe como CHEGOU ATÉ NOS?"
          return;
        }

        if (!positionLife) {
          message1.textContent = "Informe a área da sua vida precisa de mais ATENÇÃO?";
          return;
        }

      const data = { };
      data.firstName = firstName.toLowerCase()
      data.lastName = lastName.toLowerCase()
      data.phone = phone.toLowerCase()
      data.email = email.toLowerCase()
      data.yourCity = yourCity.toLowerCase()
      data.age = age
      data.howWeMet = howWeMet.toLowerCase()
      data.positionLife = positionLife.toLowerCase()
      data.agreeNotify = agreeNotify.value

      fetch('/submit', {
          method: 'POST', // Use POST method
          headers: {
            'Content-Type': 'application/json' // Specify JSON  format
          },
          body: JSON.stringify(data) // Convert the data object to a JSON string
        })
          .then(result => {

            if(result.status === 200){
              myform.reset()
              agreeNotify.checked = false
              btnvideo.disabled = true
              message1.style.color = "green"
              message2.style.color = "green"
              message1.style.fontSize = "18px"
              message2.style.fontSize = "18px"
              message1.textContent = "Parabens!! " + firstName + " inscrição realizada com sucesso!!"
              message2.textContent = "Sua apostila foi enviada para o e-mail, " +  email + " !!"
              setTimeout(()=> {
                location.reload()// Replace with your home page URL
              }, 20000);
              return
            }

            if(result.status === 201){
              message1.textContent = "Você já esta inscrito em nossa lista, aguarde logo receberá nossas novidades!"
              myform.reset()
              agreeNotify.checked = false
              btnvideo.disabled = true
              return
            }

            if(result.status === 401){
              message1.textContent = "Erro na leitura do banco de dados!"
              return
            }

            if(result.status === 400){
              message1.textContent = "Erro na inserção na base de dados!"
              return
            }
         })

          .catch(error => {
            message1.textContent = "Error, servidor não responde, tente mais tarde!", error
            return
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
        yourCity.innerHTML = `<option value="">Informe sua cidade?</option>`
        let dataset = data
        dataset.sort((a, b) => a.nome.localeCompare(b.nome))
        dataset.forEach(item => {
        let option = document.createElement("option");
        option.value = item.nome
        option.textContent = item.nome  // Assuming each item has an 'id'
        yourCity.appendChild(option)
    })
} 

onloadInit()