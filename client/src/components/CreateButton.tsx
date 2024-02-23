import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

// export const Join: React.FC = () => {
//     const { ws, me } = useContext(RoomContext);
//     const createRoom = () => {
//         ws.emit("create-room", { peerId: me._id });
//     };
//     return (
//         <button
//             onClick={createRoom}
//             className="bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600 text-white"
//         >
//             Start new meeting
//         </button>
//     );
// };
export const Join = (props: any) => {
    const navigate = useNavigate();
    var { roomId } = props;
    const { ws, me } = useContext(RoomContext);
    const joinRoom = () => {
        // ws.emit("create-room", { peerId: me._id, roomId: roomId });
        navigate(`/room/${roomId?roomId:uuidV4()}`);
        
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

