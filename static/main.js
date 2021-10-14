const socket = io()
const form = document.getElementById('form')
const input = document.getElementById('input')
const $messages = document.getElementById('messages')
const rooms = document.getElementById('list')

let messages = []

form.addEventListener('submit', (e) => {
    e.preventDefault()
    socket.emit('msg', input.value, location.hash.replace('#', ''))

    let item = document.createElement('li')
    item.innerText = input.value
    $messages.append(item)
    messages.push({ room: location.hash.replace('#', ''), msg: input.value })

    input.value = ''
})

socket.on('msg', (msg, room) => {
    messages.push({ room: room, msg: msg })
    showMessages()
})

window.addEventListener('hashchange', () => {
    showMessages()
})

function join() {
    let room = prompt('room')

    let item = document.createElement('a')
    item.setAttribute('href', `#${room}`)
    item.innerText = room

    let li = document.createElement('li')
    li.id = 'item'
    li.appendChild(item)
    rooms.append(li)

    socket.emit('join', room)
}

function showMessages() {
    $messages.innerHTML = ''
    let room_messages = messages.filter(e => e.room === location.hash.replace('#', ''))

    room_messages.forEach((e) => {
        let item = document.createElement('li')
        item.innerText = e.msg
        $messages.append(item)
    })
}
