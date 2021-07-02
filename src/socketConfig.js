import io from "socket.io-client";
import { BASE_URL } from "./api/urls";
const socket = io(BASE_URL);
export default socket;