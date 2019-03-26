

const weatherForm = document.querySelector('form')
const place = document.querySelector('input')
const p1 = document.getElementById('msg1')
const p2 = document.querySelector('#msg2')



weatherForm.addEventListener('submit', (e) => {
    p1.textContent = 'Loading...'
    p2.textContent = ''
    e.preventDefault()
    const location = place.value
    fetch('/weather?address=' + location).then((res) => { 
    res.json().then((data) => {
        if(data){
            p1.textContent = data.forcast.daily + '  and temperature is: ' + data.forcast.temperature
        }else {
            p2.textContent = 'Error, can not find place.'
        }
    })
})

})





