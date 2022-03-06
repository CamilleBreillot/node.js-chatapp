const socket = io()

//ELements
const $messageForm = document.querySelector('#message-form')// element from the dom that I selected, $
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')

socket.on('message', (message) => {
  console.log(message)
})


$messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // disable button
  $messageFormButton.setAttribute('disabled', 'disabled')
  const message = e.target.elements.message.value // access to form with e.target
  socket.emit('sendMessage', message, (error) => {
    //enable button
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = '' // empty
    $messageFormInput.focus() // reput focus on input
    if (error) {
      return console.log(error)
    }
    console.log('Message delivered!')
  })
})

$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser')
  }
  $sendLocationButton.setAttribute('disabled', 'disabled')

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => {
      $sendLocationButton.removeAttribute('disabled')
      console.log('Location shared!')
    })
  })
})
