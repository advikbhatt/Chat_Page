const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messafeInput = document.getElementById('messageInp');
const messageConainer = document.querySelector('.container');

const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');

    messageElement.classList.add(position);
    messageConainer.append(messageElement);

}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You : ${message}`)
    socket.emit('send',message)
    messageInput.value=''
})



const name = prompt("Enter Your Name");
socket.emit('new-user-joined', name);

socket.on('user-joined', data => {
    append(`${name} joined the chat`)
})

socket.on('receive', data => {
    append(`${data.name} :${data.message}`,'left')
})