window.onload = init;

function init(){
    document.querySelector('.btn-primary').addEventListener('click', login);
}

function login() {
    var user = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    console.log(user,pass);

    axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: {
            user: user,
            password: pass
        }
    }).then(function(res) {
        console.log(res.data);
        if(res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "empleados.html";
        }
        else{
            alert("Usuario y/o contrasena incorrectos");
        }
    }).catch(function(err){
        console.log(err);
    })
}