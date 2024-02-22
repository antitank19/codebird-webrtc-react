import { useContext } from "react";
import { RoomContext } from "../context/roomContext";

// export const Join: React.FC = (props) => {
export const Join = (props) => {
    var { roomId } = props;
    const { ws, me } = useContext(RoomContext);
    const createRoom = () => {
        ws.emit("create-room", { peerId: me._id });
    };
    return (
        <button
            onClick={createRoom}
            className="bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600 text-white"
        >
            {roomId ? `Join room ${roomId}` : "Join random room"}
            {/* Start new meeting */}
        </button>
    );
};
