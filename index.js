$(document).ready(()=>{
    console.log('hello world')

    // get API News
    // dataNews()
    // get API KawalCovid
    dataCovidPositif()
    dataCovidSembuh()
    dataCovidMeninggal()
    dataCovidDirawat()
    // get data todo

    // btn regis
    $('#btn-regis').on('click',(e) =>{
        $('#formLogin').hide()
        $('#formRegister').show()
    })
    // btn  cancel regis
    $('#cancel-regis').on('click',(e)=>{
        $('#formLogin').show()
        $('#formRegister').hide()
    })

    // check login
    checkIsLoggedIn()

    $('#judul-app').on('click',(e)=>{
        e.preventDefault()
        // dataNews()
    })

    $('#formRegister').on('submit', (e)=>{
        e.preventDefault()
        regis()
    })

    $('#formLogin').on('submit', (e)=>{
        e.preventDefault()
        login()
    })

    // button logout
    $('#logout').on('click', (e)=>{
        e.preventDefault()
        logout()
        signOut()
    })

    // add Todo
    $('#formTodo').on('submit', (e)=>{
        e.preventDefault()
        addTodo()
    })

    // edit
    $('#editFormTodo').on('submit', (e)=>{
        e.preventDefault()
        editTodo()
    })

    $('#status-todoss').on('dblclick', (e)=>{
        e.preventDefault()
        alert('hello')
        console.log('hello')
    })

    $('#cancel-edit-todo').on('click', (e)=>{
        e.preventDefault()
        $('#formTodo').show()
        $('#editFormTodo').hide()
    })
    
})

const checkIsLoggedIn = () =>{
    if(localStorage.getItem('access_token')){
        $('#navbar').show()
        $('#content-body').show()
        $('#formTodo').show()
        $('#logout').show()
        $('#editFormTodo').hide()
        $('#register-login').hide()
        listTodo()
    }else{
        $('#navbar').hide()
        $('#content-body').hide()
        $('#register-login').show()
        $('#formRegister').hide()
        $('#logout').hide()   
        // $('#logout').show()  
    }
}

// oauth google
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/googleLogin',
        data:{
            token: id_token
        }
    })
    .done((data)=>{
        const {access_token} = data
        localStorage.setItem('access_token', access_token)
    })
    .fail((err)=>{
        console.log(err)
    })
    .always(()=>{
        checkIsLoggedIn()
    })
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
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
        $('#formLogin').show()
        $('#formRegister').hide()
        swal("Success!", "User berhasil register!", "success");
    })
    .fail(err =>{
        let errMsg = err.responseJSON.errorMessage
        errMsg.forEach(error =>{
            Toastify({
                text: error,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #f75b5b, #fc1d1d)",
                duration: 3000
                
            }).showToast();
        })
    })
    .always(()=>{
        console.log('selesai regis')
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
        let error = err.responseJSON.errorMessage
        Toastify({
            text: error,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #f75b5b, #fc1d1d)",
            duration: 3000
            
        }).showToast();
        console.log(err.responseJSON.errorMessage)
    })
    .always(()=>{
        console.log('selesai login')
    })
}


const logout = () =>{
    localStorage.removeItem('access_token')
    sessionStorage.removeItem('access_token')
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
            let due_date = new Date(todo.due_date).toISOString().split('T')[0]
            let iconStatus
            let color
            if(todo.status === 'belum'){
                iconStatus = 'fa-times'
                color = 'red'
            }else{
                iconStatus = 'fa-check'
                color = 'green'
            }
            $('#table-todo').append(`
            <tr>
                <td>${todo.title}</td>
                <td>${todo.description}</td>
                <td id="logo-click" title='edit status' style="color:${color}" align="center"><i class="fas ${iconStatus}" onClick="editStatusTodo(${todo.id})"></i></td>
                <td>${due_date}</td>
                <td align="center">
                    <a id="logo-click" onClick="formEditTodo(${todo.id})" style="margin-right:10px;"><i class="fas fa-edit" title="edit Todo"></i></a>
                    <a id="logo-click" onClick="deleteTodo(${todo.id})"><i class="fas fa-trash-alt" title="hapus Todo"></i></a>
                </td>
            </tr>
            `)
        });
    })
    .fail((err) => {
        console.log(err.responseJSON)
    })
    .always(()=>{
        console.log('selesai list todo')
    })
}


const addTodo = () =>{
    const title = $('#title').val()
    const description = $('#description').val()
    const due_date = $('#due_date').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        data:{
            title,
            description,
            status:'belum',
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
        $('#due_date').val('')
        swal("Success!", "Data Todo berhasil ditambah!", "success");
    })
    .fail((err)=>{
        let errMsg = err.responseJSON.errorMessage
        errMsg.forEach(error =>{
            Toastify({
                text: error,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #f75b5b, #fc1d1d)",
                duration: 3000
                
            }).showToast();
        })
        console.log('selesai add todo')
    })
    console.log(title,description,status,due_date)
}

const deleteTodo = (id) => {
    console.log('halllo deelete',' => ',id)
    swal({
        title: "Anda Yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            // proses Ajax
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
                swal("data berhasil dihapus!", {
                    icon: "success",
                });
            })
            .fail((err)=>{
                console.log(err.responseJSON)
            })
            // proses Ajax end
        }else{
            swal("data aman tidak jadi dihapus");
        }
    });
}


const formEditTodo = (id) =>{    
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers:{
            access_token: localStorage.getItem('access_token')
        }
    })
    .done((data)=>{
        let due_date = new Date(data.data.due_date).toISOString().split('T')[0]
        localStorage.setItem('TodoId', id)
        $('#formTodo').hide()
        $('#editFormTodo').show()
        $('#edit-title').val(data.data.title)
        $('#edit-description').val(data.data.description)
        $('#edit-status').val(data.data.status)
        $('#edit-due_date').val(due_date)
    })
    .fail((err)=>{
        console.log(err.responseJSON)
    })
}


const editTodo = () => {
    const id = localStorage.getItem('TodoId')
    let title = $('#edit-title').val()
    let description = $('#edit-description').val()
    let status = $('#edit-status').val()
    let due_date = $('#edit-due_date').val()
    swal({
        title: "Anda Yakin?",
        text: "Data akan diperbarui bila anda setuju.",
        buttons: true,
        dangerMode: true,
    })
    .then((willEdit) => {
        if (willEdit) {
            // proses Ajax
            $.ajax({
                method: 'PUT',
                url: `http://localhost:3000/todos/${id}`,
                headers:{
                    access_token: localStorage.getItem('access_token')
                },
                data:{
                    title,
                    description,
                    status,
                    due_date
                }
            })
            .done((data)=>{
                listTodo()
                $('#edit-title').val('')
                $('#edit-description').val('')
                $('#edit-due_date').val('')
                
                // swal message
                swal("data berhasil diedit", {
                    icon: "success",
                });
                localStorage.removeItem('TodoId')
                checkIsLoggedIn()
            })
            .fail((err)=>{
                console.log(err.responseJSON)
            })
            // proses Ajax end

        } else {
            swal("data tidak jadi di edit");
        }
    });
}

const editStatusTodo = (id) =>{
    swal({
        title: "Anda Yakin?",
        text: "Status tidak dapat diubah kembali apabila complete",
        buttons: true,
        dangerMode: true,
      })
      .then((editStatus) => {
        if (editStatus) {
            $.ajax({
                method: 'PATCH',
                url: `http://localhost:3000/todos/${id}`,
                headers:{
                    access_token: localStorage.getItem('access_token')
                },
                data:{
                    status:'sudah'
                }
            })
            .done((data)=>{
                swal("status complete", {
                    icon: "success",
                });

                listTodo()
            })
            .fail((err)=>{
                console.log(err)
            })
        } else {
          swal("status tidak jadi diubah");
        }
    });
}


// 3rd Party News
// const dataNews = () =>{
//     let spasi = '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'
//     $.ajax({
//         method: 'GET',
//         url: 'http://localhost:3000/news'
//     })
//     .done((data)=>{
//         data.data.forEach((news)=>{
//             $('#news-run').append(`<a href="${news.url}" target="_blank" id="text-news-jalan">${news.title} ${spasi}</a>`)
//         })
//     })
//     .fail((err)=>{
//         console.log(err)
//     })
//     .always(()=>{
//         console.log('data covid news')
//     })
// }



// 3rd Party Kawal Covid
// POSTIF
const dataCovidPositif = () =>{
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/kawalCovidIndonesia'
    })
    .done((data)=>{
        $('#sumPositif').append(`
        <h4 class="card-title">Kasus Positif</h4>
        <h2>${data.data[0].positif}</h2>`)
    })
    .fail(err =>{
        console.log(err.responseJSON.errorMessage)
    })
    .always(()=>{
        console.log('data covid positif')
    })
}

// SEMBUH
const dataCovidSembuh = () =>{
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/kawalCovidIndonesia'
    })
    .done((data)=>{
        $('#sumSembuh').append(`
        <h4 class="card-title">Kasus Sembuh</h4>
        <h2>${data.data[0].sembuh}</h2>`)
    })
    .fail(err =>{
        console.log(err.responseJSON.errorMessage)
    })
    .always(()=>{
        console.log('data covid sembuh')
    })
}

// DIRAWAT
const dataCovidDirawat = () =>{
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/kawalCovidIndonesia'
    })
    .done((data)=>{
        // console.log(data.data[0])
        $('#sumTotal').append(`
        <h4 class="card-title">Kasus Dirawat</h4>
        <h2>${data.data[0].dirawat}</h2>`)
    })
    .fail(err =>{
        console.log(err.responseJSON.errorMessage)
    })
    .always(()=>{
        console.log('data covid dirawat')
    })
}

// MENINGGAL
const dataCovidMeninggal = () =>{
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/kawalCovidIndonesia'
    })
    .done((data)=>{
        $('#sumMeninggal').append(`
        <h4 class="card-title">Kasus Meninggal</h4>
        <h2>${data.data[0].meninggal}</h2>`)
    })
    .fail(err =>{
        console.log(err.responseJSON.errorMessage)
    })
    .always(()=>{
        console.log('data covid meninggal')
    })
}
// 3rd Party Kawal Covid END