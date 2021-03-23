var socket = io('/');

var peer = new Peer(undefined, {
    host: 'peerjs-server.herokuapp.com',
    secure: true,
    port: 443
});

peer.on('open', user_id => {
    document.getElementById('my_user_id').innerHTML = user_id;

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        small_video = document.getElementById("small-video");
        small_video.muted = true;
        small_video.srcObject = stream;
        socket.emit('user-connect', user_id);
        peer.on('call', call => {
            call.answer(stream);
            call.on('stream', userVideoStream => {
                small_video = document.getElementById("full-video");
                small_video.muted = true;
                small_video.srcObject = userVideoStream;
            });

        });
        document.getElementById('add_user').onclick = () => {
            call_user_id = document.getElementById('call_user').value;
            socket.emit('add-user', user_id, call_user_id);
        }
        socket.on("user-added", (user_id) => {
            const call = peer.call(user_id, stream);
            call.on('stream', userVideoStream => {
                small_video = document.getElementById("full-video");
                small_video.muted = true;
                small_video.srcObject = userVideoStream;
            });
        })

    });
});