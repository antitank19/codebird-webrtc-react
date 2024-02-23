import { createContext, useEffect, useReducer, useState } from "react";
import Peer, { MediaConnection } from "peerjs";
import { v4 as uuidV4 } from "uuid";

import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { peersReducer } from "./peersReducer";
import { addPeerAction, removePeerAction } from "./peersActions";
const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent = ({ children }) => {
    const navigate = useNavigate();

    const [me, setMe] = useState<Peer>();
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [stream, setStream] = useState<MediaStream>();

    const enterRoom = ({ roomId }: { roomId: "string" }) => {
        navigate(`/room/${roomId}`);
    };

    const handleUserList = ({ participants }: { participants: string[] }) => {
        alert("handleUserList")
        participants.map((peerId) => {
            const call = stream && me?.call(peerId, stream);
            console.log("call", call);
            call?.on("stream", (userVideoStream: MediaStream) => {
                console.log({ addPeerAction });
                console.log("handleUserList call?.on(stream", userVideoStream);
                dispatch(addPeerAction(peerId, userVideoStream));
            });
        });
    };

    const removePeer = (peerId: string) => {
        dispatch(removePeerAction(peerId));
    };

    useEffect(() => {
        const meId = uuidV4();
        const peer = new Peer(meId);
        console.log("useEffect[] peer", peer);
        setMe(peer);
        try {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setStream(stream);
                })
                .catch((error) => {
                    console.log(' getUserMedia error', error);
                    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                        .then((stream) => {
                            setStream(stream);
                        })
                });
        } catch (err) {
            console.error({ err });
        }
        ws.on("room-created", enterRoom);
        ws.on("get-users", handleUserList);
        ws.on("user-disconnected", removePeer);
    }, []);

    useEffect(() => {
        if (!stream) return;
        if (!me) return;

        ws.on("user-joined", ({ peerId }: { roomId: string; peerId: string }) => {
            alert("ws receive user-joined call"+stream?"true":"false");
            const call = stream && me.call(peerId, stream);
            call.on("stream", (userVideoStream: MediaStream) => {
                alert("ws receive user-joined 2");
                dispatch(addPeerAction(peerId, userVideoStream));
            });
        }
        );

        me.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (userVideoStream) => {
                dispatch(addPeerAction(call.peer, userVideoStream));
            });
        });
    }, [stream, me]);

    return (
        <RoomContext.Provider value={{ ws, me, peers, stream }}>
            {children}
        </RoomContext.Provider>
    );
};
