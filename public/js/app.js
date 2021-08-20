console.log('Hello world, welcome to the JavaScript!')

window.onload = function () {
    const date = new Date()
    document.getElementById('date').innerHTML = date.getFullYear()
}

const formData = document.querySelector('form');
const search   = document.querySelector('input');
const _msg_1   = document.querySelector('#messgae-1')
const _msg_2   = document.querySelector('#message-2')
const _msg_3   = document.querySelector('#message-3')


formData.addEventListener('submit', (e) => {
    e.preventDefault();

    const val = search.value;
    _msg_1.textContent = 'Loading...'
    _msg_2.textContent = ''
    _msg_3.textContent = ''

    val.length === 0? _msg_1.textContent = 'Search filed must be filled!' : ''

    fetch('/weather?address='+val).then((response) => {
        response.json().then((data) => {
            
            if (data.error) {
                _msg_1.textContent = data.error
            } else {
                /* _msg_1.textContent = data.region
                _msg_2.textContent = data.weather_descriptions */
                _msg_1.textContent = ''
                _msg_2.textContent = 'Location : ' + data.place + ', ' + data.region + ', ' + data.country
                _msg_3.textContent = 'Weather description: Today weather is ' + data.weather_descriptions + ' and temperature is ' + data.temperature
            }
        })
    })
    
    /* fetch('http://localhost:3000/weather?address='+val).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                _msg_1.textContent = data.error
            } else {
                _msg_1.textContent = data.location
                _msg_2.textContent = data.Region
            }
        })
    }) */
})