const socket = io()

socket.on('message', (message) => {
  console.log(message)
})


const form = document.querySelector('#message-form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = e.target.elements.message.value // access to form with e.target
  socket.emit('sendMessage', message)
})
