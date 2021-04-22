$(document).ready(()=>{
    console.log('hello world')
    
    // get count data Covid
    dataCovidTotal()
    dataCovidPositif()
    dataCovidSembuh()
    dataCovidMeninggal()
    
    $('#btn-login').on('click',(e) =>{
        $('#register').hide()
        $('#login').show()
    })
    $('#btn-regis').on('click',(e) =>{
        $('#login').hide()
        $('#register').show()
    })

    // check login
    checkIsLoggedIn()

    listTodo()

    $('#navbarHome').on('click', (e)=>{
        e.preventDefault()
        $('#formTodo').hide()
        $('#listTodo').hide()
        $('#textJalan').hide()
    })

    $('#navbarTodo').on('click', (e)=>{
        e.preventDefault()
        $('#formTodo').show()
        $('#listTodo').show()
        $('#textJalan').show()
    })

    $('#formRegister').on('submit', (e)=>{
        e.preventDefault()
        regis()
    })

    $('#formLogin').on('submit', (e)=>{
        e.preventDefault()
        login()
    })

    $('#logout').on('click', (e)=>{
        e.preventDefault()
        logout()
    })

    $('#formTodo').on('submit', (e)=>{
        e.preventDefault()
        addTodo()
    })
    
})

const checkIsLoggedIn = () =>{
    if(localStorage.getItem('access_token')){
        $('#navbar').show()
        $('#content-data').show()
        $('#formLogin').hide()
        $('#register-login').hide()
    }else{
        $('#navbar').hide()
        $('#content-data').hide()
        $('#formLogin').show()
        $('#register-login').show()      
    }
}

const regis = () => {
    const email = $('#emailRegis')
    const password = $('#passwordRegis')

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/regis',
        data:{
            email: email.val(),
            password: password.val()
        }
    })
    .done((data)=>{
        $('#emailRegis').val('')
        $('#passwordRegis').val('')
    })
    .fail(err =>{
        console.log(err.responseJSON.errorMessage)
    })
    .always(()=>{
        console.log('selesai')
    })
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
        const {access_token} = data
        localStorage.setItem('access_token', access_token)
        sessionStorage.setItem('access_token',access_token)
        checkIsLoggedIn()
        $('#email').val('')
        $('#password').val('')
        listTodo()
    })
    .fail(err =>{
        console.log(err.responseJSON.errorMessage)
    })
    .always(()=>{
        console.log('selesai')
    })
}


const logout = () =>{
    localStorage.removeItem('access_token')
    checkIsLoggedIn()
}


const listTodo = () =>{
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((data) => {
        console.log(data.data,'ini nih datanya')
        $('#table-todo').empty()
        data.data.forEach(todo => {
            $('#table-todo').append(`
            <tr>
                <td>${todo.title}</td>
                <td>${todo.description}</td>
                <td>${todo.status}</td>
                <td>${todo.due_date}</td>
                <td>
                    <a href="#" onClick="deleteTodo(${todo.id})"><i class="fas fa-trash-alt" title="hapus Todo"></i></a>&nbsp;&nbsp;
                    <a href="#" onClick="deleteTodo(${todo.id})"><i class="fas fa-edit" title="edit Todo"></i></a>
                </td>
            </tr>
            `)
        });
    })
    .fail((err) => {
        console.log(err.responseJSON)
    })
    .always(()=>{
        console.log('selesai')
    })
}


const addTodo = () =>{
    const title = $('#title').val()
    const description = $('#description').val()
    const status = $('#status').val()
    const due_date = $('#due_date').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        data:{
            title,
            description,
            status,
            due_date
        },
        headers:{
            access_token:localStorage.getItem('access_token')
        }
    })
    .done((data)=>{
        listTodo()
        $('#title').val('')
        $('#description').val('')
        $('#status').val('')
        $('#due_date').val('')
        Toastify({
            text: "Data Sukses di tambah",
            duration: 5000
            
        }).showToast();
    })
    .fail((err)=>{
        console.log(err.responseJSON)
    })
    console.log(title,description,status,due_date)
}

const deleteTodo = (id) => {
    console.log('halllo deelete',' => ',id)
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers:{
            access_token:localStorage.getItem('access_token')
        }
    })
    .done((data)=>{
        console.log(data)
        listTodo()
    })
    .fail((err)=>{
        console.log(err.responseJSON)
    })
}












// 3rd Party Kawal Covid
const dataCovidTotal = () =>{
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/kawalCovidIndonesia'
    })
    .done((data)=>{
        // console.log(data.data[17].attributes)
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
// 3rd Party Kawal Covid END