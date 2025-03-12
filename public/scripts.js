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
      const yourState = document.getElementById('yourState').value
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
      }, 10000);
    
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
          message1.textContent = "Por favor informe um CELULAR válido com 11 digitos!"
          return;
        }

        console.log(phone)

        if (!yourState) {
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

            if(result.status === 200){
              myform.reset()
              agreeNotify.checked = false
              btnvideo.disabled = true
              message1.style.color = "green"
              message1.style.fontSize = "18px"
              message2.style.color = "green"
              message2.style.fontSize = "18px"
              message1.textContent = "Parabens!! " + firstName + " sua apostila esta esperando por você em, " +  email + "!"
              message2.textContent = "Redirecionando em 10 segundos..."
              setTimeout(()=> {
                location.reload()// Replace with your home page URL
              }, 10000);
              return
            }


            if(result.status === 201){
              message1.textContent = "E-mail já cadastrado para receber notificações, por favor utilize outro e-mail válido!"
              myform.reset()
              agreeNotify.checked = false
              btnvideo.disabled = true
              return
            }


            if(result.status === 400){
              message1.textContent = "Erro na tentativa de inserção dos dados!"
              return
            }
         })

          .catch(error => {
            console.error('Error submitting data:', error);
            message1.textContent = "This is issue with the server. Please try again later."
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
        yourState.innerHTML = `<option value="">Informe sua cidade?</option>`
        let dataset = data
        dataset.sort((a, b) => a.nome.localeCompare(b.nome))
        dataset.forEach(item => {
        let option = document.createElement("option");
        option.value = item.nome
        option.textContent = item.nome  // Assuming each item has an 'id'
        yourState.appendChild(option)
    })
} 

onloadInit()


