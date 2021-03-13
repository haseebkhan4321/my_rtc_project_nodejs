var socket = io('/');
var peer = new Peer(undefined, {
    host: 'peerjs-server.herokuapp.com',
    secure: true,
    port: 443
});

peer.on('call', call => {
    call.answer(null);
    call.on('stream', userVideoStream => {
        add_video(user_id = null, stream = userVideoStream);
    });
})

peer.on('open', (user_id) => {




    socket.on('room-opened', room => {
        console.log('room open: ', room)
    });

    socket.on('user-connected', user_connected => {
        console.log(user_connected);
        add_video(user_connected.user.user_id);
    });

    document.getElementById('open-room').addEventListener('click', () => {
        socket.emit('open-room', 'ROOM_ID', user_id);
    });

    document.getElementById('join-room').addEventListener('click', () => {
        console.log(user_id);
        socket.emit('join-room', 'ROOM_ID', user_id);
    });

});

function add_video(user_id = null, stream = null) {
    var video = document.createElement('video');
    video.setAttribute('style', 'width: 500px;height: 250px; margin:10px');
    video.muted = true;
    if (user_id != null && stream == null) {
        console.log('test1');
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            video.srcObject = stream;
            const call = peer.call(user_id, stream);
            call.on('stream', userVideoStream => {
                console.log('add_video', userVideoStream)
            });
        });
    } else {
        console.log('test2');
        video.srcObject = stream
    }
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    document.getElementById('add-video').append(video);
}