let socket = io.connect('http://192.168.0.120:6677', { 'forceNew': true });

socket.on('messages', function (data) {

    console.log(data);
    render(data);
})

function render(data) {

    let html = data.map(function (message, index) {

        return (`

                <div class="message"> 
                
                <strong>${message.nickname} </strong>
                      <p>${message.text}</p>

                </div>
        `);

    }).join('');

    document.getElementById("messages"), innerHTML = html;
}

function addMessage(e) {

    let message = {

        nickname: document.getElementById("nickname").value,
        text: document.getElementById("text").value

    };
    document.getElementById("nickname").style.display = "none";
    socket.emit('add-message', message);
    return false;

}