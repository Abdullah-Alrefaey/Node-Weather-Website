const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    // prevent page from refresh
    e.preventDefault();

    // get the input value
    const location = searchElement.value
    const url = `http://localhost:3000/weather?address=${location}`;
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // fetch API
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                messageOne.textContent = data.error
            }
            else
            {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            
        })
    })
});