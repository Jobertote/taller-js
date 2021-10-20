window.onload = init;
var headers = {};
var url = "http://localhost:3000"

function init(){
    if(localStorage.getItem("token")){
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEMpleado();
    }
    else{
        window.location.href = "index.html";
    }
    
}


function loadEMpleado(){
    axios.get(url + "/empleado", headers).then(function(res){
        console.log(res.data.message);
        displayEmpleados(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayEmpleados(empleados){
    var body = document.querySelector("body");
    for(var i = 0; i < empleados.length; i++){
        body.innerHTML += `<div class="container">
        <div class="row mt-2">
            <div class="col-3 offset-1">
            </div>
        </div>
        <div class="row align-items-center">
            <div class="col-3 offset-0">
                <div class="form-group">
                    <label for="input-nombre">Nombre</label>
                    <input type="text" class="form-control" id="input-mail" value="${empleados[i].nombre}">
                </div>
                <div class="form-group">
                    <label for="input-apellido">Apellidos</label>
                    <input type="text" class="form-control" id="input-password" value="${empleados[i].apellidos}">
                </div>
                <div class="form-group">
                    <label for="input-telefono">Telefono</label>
                    <input type="text" class="form-control" id="input-password" value="${empleados[i].telefono}">
                </div>
                <div class="form-group">
                    <label for="input-correo">Correo</label>
                    <input type="text" class="form-control" id="input-password" value="${empleados[i].correo}">
                </div>
                <div class="form-group">
                    <label for="input-direccion">Direccion</label>
                    <input type="text" class="form-control" id="input-password" value="${empleados[i].direccion}">
                </div>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-primary">Entrar</button>
                    <button class="btn btn-primary">Entrar</button>
                </div>
            </div>
        </div>
    </div>`
    }
}