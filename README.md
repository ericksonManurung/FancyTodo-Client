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


Add Todo
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



Edit Todo
* method:
```
PUT
```
* url:
```
http://localhost:3000/users/todos/:id
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


Delete Todo
* method:
```
DELETE
```
* url:
```
http://localhost:3000/users/todos/:id
```
* Data
```
none
```
* Headers
```
    access_token: <access_token>
```


3RD API Kawalcovid
* method:
```
GET
```
* url:
```
http://localhost:3000/kawalCovidIndonesia
```
* Data
```
none
```



3RD API News
* method:
```
GET
```
* url:
```
http://localhost:3000/news
```
* Data
```
none
```




