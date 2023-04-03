import React, { useContext } from 'react';
import More from 'D:/JS/Chat/my-chat/src/img/more.svg';
import Video from 'D:/JS/Chat/my-chat/src/img/video.svg';
import AddFriend from 'D:/JS/Chat/my-chat/src/img/add-friend.svg';
import Messages from './Messages';
import ChatInput from './ChatInput';
import { ChatContext } from 'D:/JS/Chat/my-chat/src/context/ChatContext';

const Chat = () => {
    const {data} = useContext<any>(ChatContext)
    return (
        <div className='chat-wrapper'>
            <div className="chat-info">
                <span>{data.user?.displayName}</span>
                <div className="chat-icons">
                    <img src={Video} alt="" />
                    <img src={AddFriend} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages/>
            <ChatInput/>
        </div>
    );
};

export default Chat;