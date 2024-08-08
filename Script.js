const input = document.getElementById("cidade")

const lupa = document.getElementById("botao-lupa")

const img = document.getElementById("imagem-clima")

const temperatura = document.getElementById("temperatura")

const descricao = document.getElementById("descricao")

const local = document.getElementById("local")

const ApiKey = "70450de2ac958905e084a5685183cd6e"


lupa.addEventListener("click",()=>{
previsaoDoTempo(input.value)


})
input.addEventListener("keydown",(event)=>{
if(event.key=="Enter"){
    previsaoDoTempo(input.value)
}
})

function previsaoDoTempo(cidade){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${ApiKey}&lang=pt_br`).then(response=>{
        return response.json()
    }).then(data=>{
        console.log(data)
        if(data.cod=="404"){
            local.innerText = "Cidade não encontrada"
            temperatura.innerText=""
            descricao.innerText=""
            img.src="./assets/no-results.png"
            //input.value=""
        }
    
        else{
            switch(data.weather[0].main){
                case "Clouds": 
                img.src="./assets/clouds.png"
                break
                case "Rain":
                    img.src="./assets/rain.png"
                break
                case "Clear":
                    img.src="./assets/sun.png"
                break
                case "Snow":
                    img.src="./assets/snow.png"
                break
                default: img.src="./assets/clouds.png"
    
            }
            local.innerText="Local: " +data.name
            temperatura.innerText="Temperatura: "+data.main.temp+"°c"
            descricao.innerText="Descrição: "+data.weather[0].description
    
        }
    })
}