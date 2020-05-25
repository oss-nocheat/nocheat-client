var socket = io(SERVER_URL)
export const SocketContext = React.createContext(socket)