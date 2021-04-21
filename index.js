$(document).ready(()=>{
    console.log('hello world')
    dataCovidTotal()
    dataCovidPositif()
    dataCovidSembuh()
    checkIsLoggedIn()
    dataCovidMeninggal()

    $('#formLogin').on('submit', (e)=>{
        e.preventDefault()
        login()         
    })
})

const checkIsLoggedIn = () =>{
    if(localStorage.getItem('access_token')){
        $('#formLogin').hide()
    }else{
        $('#formLogin').show()
    }
}

const login = () =>{
    const email = $('#email')
    const password = $('#password')

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data:{
            email: email.val(),
            password: password.val()
        }
    })
    .done((data)=>{
        console.log(data)
        const {access_token} = data
        localStorage.setItem('access_token', access_token)
        sessionStorage.setItem('access_token',access_token)
        console.log(localStorage,'in lokal storage -------->')
    })
    .fail(err =>{
        console.log(err.responseJSON.errorMessage)
    })
    .always(()=>{
        console.log('selesai')
    })
}


const dataCovidTotal = () =>{
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/kawalCovidIndonesia'
    })
    .done((data)=>{
        console.log(data.data[17].attributes)
        $('#sumTotal').append(`
        <h5 class="card-title">${data.data[17].attributes.Country_Region}</h5>
        <h2>${data.data[17].attributes.Last_Update}</h2>`)
    })
    .fail(err =>{
        console.log(err.responseJSON.errorMessage)
    })
    .always(()=>{
        console.log('selesai')
    })
}

const dataCovidPositif = () =>{
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/kawalCovidPositif'
    })
    .done((data)=>{
        $('#sumPositif').append(`
        <h5 class="card-title">${data.data.name}</h5>
        <h2>${data.data.value}</h2>`)
    })
    .fail(err =>{
        console.log(err.responseJSON.errorMessage)
    })
    .always(()=>{
        console.log('selesai')
    })
}

const dataCovidSembuh = () =>{
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/kawalCovidSembuh'
    })
    .done((data)=>{
        $('#sumSembuh').append(`
        <h5 class="card-title">${data.data.name}</h5>
        <h2>${data.data.value}</h2>`)
    })
    .fail(err =>{
        console.log(err.responseJSON.errorMessage)
    })
    .always(()=>{
        console.log('selesai')
    })
}

const dataCovidMeninggal = () =>{
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/kawalCovidMeninggal'
    })
    .done((data)=>{
        $('#sumMeninggal').append(`
        <h5 class="card-title">${data.data.name}</h5>
        <h2>${data.data.value}</h2>`)
    })
    .fail(err =>{
        console.log(err.responseJSON.errorMessage)
    })
    .always(()=>{
        console.log('selesai')
    })
}