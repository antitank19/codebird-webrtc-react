import { useContext } from "react";
import { RoomContext } from "../../context/roomContext";
// export const Join: React.FC = () => {
//     var { roomId } = this.props;
export const Join = (props) => {
    var { roomId } = props;
    const { ws } = useContext(RoomContext);
    const joinRoom = () => {
        ws.emit("create-room", { roomId: roomId });
    };
    console.log("Join room btn roomId", roomId);
    return (
        <button
            onClick={joinRoom}
            className="bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600"
        >
            {roomId ? `Join room ${roomId}` : "Join random room"}
            {/* Join room */}
        </button>
    );
};
