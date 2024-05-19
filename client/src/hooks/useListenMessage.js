import React, { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useConversation from "../zustand-store/useConversation";
import notification from "../assets/notification/noti.mp3";
const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log(newMessage);
      newMessage.makeNotificationTune = true;
      setMessage([...messages, newMessage]);

      const sound = new Audio(notification);
      sound.play();
      sound.volume = 0.5;
    });
    return () => socket.off("newMessage");
  }, [socket, setMessage, messages]);
};

export default useListenMessage;
