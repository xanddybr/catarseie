
const email = 'teste'
const hasValidDomain = email.split('@')[1]?.includes('.')

if(!hasValidDomain){
    console.log('Email invalido')
}else{
    console.log('Email valido')
}
