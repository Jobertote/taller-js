window.onload = init;

function init(){
    document.querySelector('.btn-secondary').addEventListener('click', function(){
        window.location.href = "empleados.html"
    });

    document.querySelector('.btn-primary').addEventListener('click', register);

}

function register() {
    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var mail = document.getElementById('input-mail').value;
    var phone = document.getElementById('input-phone').value;
    var address = document.getElementById('input-address').value;


    axios({
        method: 'post',
        url: 'http://localhost:3000/empleados/',
        data: {
            nombre: name,
            apellidos: lastname,
            correo: mail,
            telefono: phone,
            contrasena: address
        }
    }).then(function(res) {
        console.log(res);
    }).catch(function(err){
        console.log(err);
    })
}