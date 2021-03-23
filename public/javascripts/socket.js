var socket = io('/');

var peer = new Peer(undefined, {
    host: 'peerjs-server.herokuapp.com',
    secure: true,
    port: 443
});

peer.on('open', user_id => {
    document.getElementById('my_user_id').innerHTML = user_id;
    socket.on("user-added", (user_id) => {
        console.log(user_id);
    })
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        small_video = document.getElementById("small-video");
        small_video.muted = true;
        small_video.srcObject = stream;
        socket.emit('user-connect', user_id);
        document.getElementById('add_user').onclick = () => {
            call_user_id = document.getElementById('call_user').value;
            console.log(call_user_id);
            socket.emit('add-user', user_id, call_user_id);
        }
    });
});