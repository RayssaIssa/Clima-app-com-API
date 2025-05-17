
const container = document.querySelector(".container")
const pesquisar = document.querySelector(".pesquisar")
const clima = document.querySelector(".clima")
const climaDetalhes = document.querySelector(".clima-detalhes")
const naoEncontrado = document.querySelector(".nao-encontrado")

pesquisar.addEventListener('click', () =>{

    const APIkey = 'SuaChave';
    const idioma = 'pt_br'
    const cidade = document.querySelector('.pesquisar input').value

    if(cidade === ''){
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${APIkey}&units=metric&lang=${idioma}`)
    .then(response => response.json())
    .then(json => {

        if(json.cod === '404'){
            container.style.height = '400px'
            clima.style.display = 'none'
            climaDetalhes.style.display = 'none'
            naoEncontrado.style.display = 'block'
            naoEncontrado.classList.add('fadeIn')
            return
        }

        naoEncontrado.style.display = 'none'
        naoEncontrado.classList.remove('fadeIn')

        const imagem = document.querySelector('.clima img')
        const temperatura = document.querySelector('.clima .temperatura')
        const descricao = document.querySelector('.clima .descricao')
        const humidade = document.querySelector('.clima-detalhes .humidade span')
        const vento = document.querySelector('.clima-detalhes .vento span')

        switch(json.weather[0].main){
            case 'Clear':
                imagem.src = 'img/clear.png'
                break
            case 'Rain':
                imagem.src = 'img/rain.png'
                break
            case 'Clouds':
                imagem.src = 'img/cloud.png'
                break
            case 'Haze':
                imagem.src = 'img/mist.png'
                break
            case 'Snow':
                imagem.src = 'img/snow.png'
                break
            default:
                imagem.src = ''
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
        descricao.innerHTML = `${json.weather[0].description}`
        humidade.innerHTML = `${parseInt(json.main.humidity)}%`
        vento.innerHTML = `${parseInt(json.wind.speed)}km/h`

        console.log(temperatura)
        console.log(descricao)
        console.log(humidade)
        console.log(vento)

        clima.style.display = ''
        climaDetalhes.style.display = ''
        clima.classList.add('fadeIn')
        climaDetalhes.classList.add('fadeIn')
        container.style.height = '590px'
    })
})