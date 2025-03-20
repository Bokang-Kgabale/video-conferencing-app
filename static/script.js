const socket = new WebSocket("ws://localhost:8000/ws");
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

let localStream;
let peerConnection;
let remoteStream;

const iceServers = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        }
    ]
};

// Get the local video stream
async function startVideoCall() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
        
        // Create a new RTCPeerConnection
        peerConnection = new RTCPeerConnection(iceServers);
        
        // Add local stream to the peer connection
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
        
        // Set up event listeners for ICE candidates and remote stream
        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                socket.send(JSON.stringify({ type: "candidate", candidate: event.candidate }));
            }
        };

        peerConnection.ontrack = event => {
            remoteStream = event.streams[0];
            remoteVideo.srcObject = remoteStream;
        };

        // Create an offer to start the connection
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.send(JSON.stringify({ type: "offer", offer: offer }));
    } catch (error) {
        console.error("Error accessing media devices.", error);
    }
}

// WebSocket signaling
socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "offer") {
        handleOffer(message.offer);
    } else if (message.type === "answer") {
        handleAnswer(message.answer);
    } else if (message.type === "candidate") {
        handleCandidate(message.candidate);
    }
};

// Handle incoming offer
async function handleOffer(offer) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.send(JSON.stringify({ type: "answer", answer: answer }));
}

// Handle incoming answer
async function handleAnswer(answer) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

// Handle incoming ICE candidate
function handleCandidate(candidate) {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
}

// Start call button
document.getElementById("startCall").onclick = startVideoCall;
