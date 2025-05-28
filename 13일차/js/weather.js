const API_KEY = "b52f83d9dc7d96098ca8de149cb841d6";
let iconSection = document.querySelector(".icon img");
let tempSection = document.querySelector(".temp");
let descSection = document.querySelector(".description");
let placeSection = document.querySelector(".place");

//위치 정보 가져올 함수
function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

//날씨 정보를 받아올 함수
async function getWeather(lat, lon) {
    const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    const response = await fetch(weather);
    console.log(response);
    return response.json();
}

//DOM에 날씨 정보 표시
function renderWeather(data) {
    console.log(data);
    const { temp } = data.main;
    const { name: place } = data;
    const { description, icon } = data.weather[0];
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

    tempSection.innerHTML=`${temp}도`;
    placeSection.innerHTML=place;
    descSection.innerHTML= description;
    iconSection.setAttribute("src",iconUrl);
}

//초기함수
//위치를 받아오는 함수를 호출하여 위치값 받기

async function initWeaterApp() {
    const position = await getPosition();
    const { latitude, longitude } = position.coords;
    // console.log(latitude, longitude);
    const weatherData = await getWeather(latitude, longitude);
    renderWeather(weatherData);
}
//초기함수 실행
initWeaterApp();