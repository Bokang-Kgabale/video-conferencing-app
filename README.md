# WebRTC Video Call Application

## Description
This project is a WebRTC-based video call application featuring a FastAPI backend server for signaling and connection management, a Node.js Express server to provide TURN server credentials, and a frontend built with HTML, CSS, and JavaScript using Firebase Firestore for signaling.

The application is deployed as a web service and can be embedded in any application as an external extra functionality to provide real-time video call capabilities.

The application enables real-time video calls with features such as starting and joining calls, muting/unmuting audio, toggling video, and sharing room codes via copy or email.

## Features
- Real-time video calling using WebRTC
- Start a new call or join an existing call via room ID
- Mute/unmute microphone and toggle camera on/off
- Share room code by copying to clipboard or emailing
- TURN server integration for NAT traversal
- Firebase Firestore used for signaling and room management

## Technology Stack
- Backend: FastAPI, Uvicorn (Python)
- TURN Server: Node.js, Express
- Frontend: HTML, CSS, JavaScript, Firebase Firestore
- WebRTC for peer-to-peer media streaming

## Installation

### Backend (FastAPI server)
1. Ensure Python 3.8+ is installed.
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set environment variables for Firebase and TURN API key as needed.

### TURN Server (Node.js)
1. Ensure Node.js is installed.
2. Install dependencies:
   ```bash
   npm install express node-fetch
   ```
3. Set environment variables for Firebase config and `METERED_API_KEY` for TURN credentials.

### Frontend
- The frontend is located in the `static/` directory.
- You can serve the static files using any static file server or open `static/index.html` directly in a modern browser.

## Environment Variables
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_DATABASE_URL`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID`
- `METERED_API_KEY` (for TURN server credentials)
- `PORT` (optional, for TURN server port, default 3000)

## Running the Application
```bash
python video_server.py
```

### Start the FastAPI backend server
```bash
uvicorn server.main:app --host 0.0.0.0 --port 8000
```

### Start the TURN server
```bash
node turn_server.js
```

### Access the Frontend
- Open `static/index.html` in a browser or serve the `static/` folder via a static server.

## Usage
- Click "Open Camera" to allow access to your camera and microphone.
- Click "Start Call" to create a new room and start a call.
- Share the room ID with others to join the call.
- Click "Join Call" and enter a room ID to join an existing call.
- Use the buttons to mute/unmute audio, toggle video, or hang up.

## File Structure Overview
```
.
├── server/                  # FastAPI backend server code
│   ├── app.py              # FastAPI app creation
│   ├── main.py             # Server entry point
│   ├── connection_manager.py # WebSocket connection manager
│   └── __init__.py
├── turn_server.js          # Node.js Express server for TURN credentials
├── static/                 # Frontend static files
│   ├── index.html          # Main HTML page
│   ├── script.js           # Frontend JavaScript logic
│   └── styles.css          # CSS styles
├── requirements.txt        # Python dependencies
└── .gitignore
```

## Notes
- The TURN server credentials are fetched dynamically from an external TURN service using the provided API key.
- Firebase Firestore is used for signaling; ensure your Firebase project is properly configured.
- This project requires modern browsers with WebRTC support.


