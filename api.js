
//URLS 
const API_URL_JOKES = 'https://icanhazdadjoke.com';
const API_URL_chuckNorris = 'https://api.chucknorris.io/jokes/random';
const URL_CIUDAD = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona&lang=es&units=metric&appid=1f3990c4c2434f2f9e27faf07a831d52'

//OPTIONS PARA EL FETCH 
const options = {
  headers: { 
      'Accept': 'application/json'
  }
};

//VARIABLES
let reportScores = [];
let reportAcudits = [];
let joke;

function toggleButtons() {
  document.getElementById("botons").style.visibility = "visible";
  document.getElementById("startButton").classList.add("hide"); 
  getRandomJoke();
}
// Funcion para obtener una broma de icanhazdadjoke
async function getJokeIcan (){
  const response = await fetch(API_URL_JOKES, options);
  const data = await response.json();
  let joke = data.joke;
  console.log("JOKE Ican: ", joke);
  addReport(joke);
  let muestraChiste = document.getElementById('muestraChiste');
  muestraChiste.innerHTML = `<p>${data.joke}</p>`;
}

// Funcion para obtener una broma de chuckNorris
async function getJokeChuckNorris (){
  const response = await fetch(API_URL_chuckNorris,options);
  const data = await response.json();
  let joke2 = data.value;
  console.log("JOKE ChuckNorris: ",joke2);
  addReport(joke2);
  let muestraChiste = document.getElementById('muestraChiste');
  muestraChiste.innerHTML = `<p>${data.value}</p>`;
  

//  await fetch(API_URL_chuckNorris,options)
//   .then(response => {return response.json()})
//   .then(data=>{
//   let joke = data.value
//   console.log("JOKE ChuckNorris: ",joke);
//   let muestraChiste = document.getElementById('muestraChiste')
//   muestraChiste.innerHTML = `<p>${data.value}</p>`
//   })

}

//Funcion para obtener el tiempo actual de una ciudad
function checkWeather (){
  let temperaturaValor = document.getElementById('valueTemperature');
  let temperaturaDescripcion = document.getElementById('descriptionTemperature');

  let ubicacion = document.getElementById('ubicacion');
  let iconoAnimado = document.getElementById('iconoAnimado');

  //llamada a la api URL_CIUDAD para que nos de el tiempo
  fetch(URL_CIUDAD)
        .then( response => {return response.json()})
        .then (data=>{

          //console.log(data)
          let temp =Math.round(data.main.temp);
          temperaturaValor.textContent = `${temp} ºC`;
          //console.log(data.weather[0].description);

          let descripcionTiempo = data.weather[0].description;
          temperaturaDescripcion.textContent = descripcionTiempo;
          
          let nombreCiudad = data.name;
          ubicacion.textContent = nombreCiudad;

          let mainTiempo = data.weather[0].main;

          switch (mainTiempo){
            case 'Clear':
              iconoAnimado.src = 'iconos/animated/day.svg'
              break;

            case 'Clouds':
              iconoAnimado.src = 'iconos/animated/cloudy-day-1.svg'
              break;
          }
        })
}

//Nos genera una broma de una api u otra de forma aleatoria
function getRandomJoke(){
  let numRandom =  Math.round(Math.random() * 100);
  
  if (numRandom <=50)
 joke= getJokeIcan();
  else
 joke = getJokeChuckNorris();


}



function addReport (joke,score){

  let reportScore = score || reportScores[reportScores.length - 1];
  
  let report = {
    joke: joke,
    score: reportScore,
    date: new Date().toISOString()
  };

  reportAcudits.push(report);
  console.table(reportAcudits);

}



function score1 (){

  let score = 1;
  console.log("SCORE",score);
  reportScores.push(score);
  console.log(reportScores);
  return score

}

function score2 (){
  let score = 2;
  console.log("SCORE",score);
  reportScores.push(score);
  console.log(reportScores);
  return score
}

function score3 (){
  let score = 3;
  console.log("SCORE",score);
  reportScores.push(score);
  console.log(reportScores);
  return score
}




checkWeather();

