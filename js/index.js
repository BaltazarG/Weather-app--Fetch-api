//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const tempActual = document.getElementById("temp-act")
const sensacion = document.getElementById("sensacion")
const descripcion = document.getElementById("descripcion")
const humedad = document.getElementById("humedad")
const ciudadConsultada = document.getElementById("ciudadConsultada")
const ciudades = document.getElementById("seleccion");
const ciudadAgregada = document.getElementById("newCity")
const resultadoDisplay = document.getElementById("resultados")
const containerResaultado = document.getElementById("container")
let listaCiudades = []

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cityAdd() {
    boolCity = validarCiudad()
    if (ciudadAgregada.value.length == 0) {
        result2.style.display = "block";
        result2.innerHTML = "Debe escribir la ciudad que quiere agregar";
        setTimeout(function () {
            result2.style.display = "none";
        }, 3500)
        return;
    }
    else if (boolCity == false) {
        result2.style.display = "block";
        result2.innerHTML = "La ciudad coincide con una ciudad ya agregada";
        result2.style.color = "red"
        setTimeout(function () {
            return result2.style.display = "none";
        }, 3500)
    }
    else {
        result2.style.display = "block";
        result2.innerHTML = ciudadAgregada.value + " correctamente añadida";
        result2.style.color = "greenyellow"
        listaCiudades.push(ciudadAgregada.value)
        localStorage.setItem("ciudadess", JSON.stringify(listaCiudades))
        ciudadAgregada.value = ""
        setTimeout(function () {
            return result2.style.display = "none";
        }, 3500)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function validarCiudad() {
    let arrayCiudades = JSON.parse(localStorage.getItem("ciudadess"));
    if(arrayCiudades == null){
        return 
    }
    for (let i = 0; i <= arrayCiudades.length; i++) {
        if (ciudadAgregada.value === arrayCiudades[i]) {
            return false
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateSelect() {
    let arrayCiudades = JSON.parse(localStorage.getItem("ciudadess"));
    arrayCiudades.forEach(array => {
        let opcion = document.createElement('option');
        opcion.value = array;
        opcion.text = array;
        ciudades.add(opcion);
    })
}
updateSelect();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkWeather() {
    const $cargando = document.getElementById("cargando");
    const res = document.getElementById("res");
    resultadoDisplay.style.display="flex";
    $cargando.style.display = 'block'
    let city = document.getElementById("seleccion").value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=453fda7f094eec07c9612eedaac172e6&units=metric&lang=es";
    fetch(url)
        .then((cityStorage) => cityStorage.json())
        .then(data => {

            let tempValue = data['main']['temp'];
            let sensacionValue = data['main']['feels_like'];
            let humedadValue = data['main']['humidity'];
            let descripcionValue = data['weather'][0]['description'];

            res.style.display = "flex";
            ciudadConsultada.innerHTML = "Clima en " + seleccion.value
            tempActual.innerHTML = "Temperatura actual:  " + tempValue + " °C";
            sensacion.innerHTML = "Sensacion Termica:  " + sensacionValue + " °C";
            humedad.innerHTML = "Humedad:  " + humedadValue + " %";
            descripcion.innerHTML = descripcionValue;
        })

        .catch(error => console.log(error))
        .finally(()=>{
            $cargando.style.display = 'none';
            res.parentElement.style.display = 'block'
          })
}


