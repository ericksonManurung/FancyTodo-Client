# FancyTodo-Client
Fancy Todo - Client

## FRONT END LIBRARY
* Bootstrap
* sweetalert
* toastify
* fontawesome

## Proses AJAX
Register
* method:
```
POST
```
* url:
```
http://localhost:3000/users/regis
```
* Data
```
    {
        email: <email>,
        password: <password>
    }
```

Login
* method:
```
POST
```
* url:
```
http://localhost:3000/users/login
```
* Data
```
    {
        email: <email>,
        password: <password>
    }
```


Login Google
* method:
```
POST
```
* url:
```
http://localhost:3000/users/googleLogin
```
* Data
```
    {
        token: <id_token>
    }
```




List Todo
* method:
```
GET
```
* url:
```
http://localhost:3000/users/todos
```
* Headers
```
    access_token: <access_token>
```


List Todo
* method:
```
POST
```
* url:
```
http://localhost:3000/users/todos
```
* Data
```
    {
        title,
        description,
        status: 'belum',
        due_date
    }
```
* Headers
```
    access_token: <access_token>
```




