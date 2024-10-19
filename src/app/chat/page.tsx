"use client"
import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import Image from 'next/image';

type Message = {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  userImage: string; // URL to the user's image
  isOnline: boolean; // Online status of the user
  attachment?: string | null; // Allow null as a possible value
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState<string | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage && !attachment) return; // Prevent sending empty messages
    const timestamp = new Date().toISOString();
    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'mahadi',
      timestamp: timestamp,
      userImage: '', // Default or dynamic image path
      isOnline: true, // Assume the sender is online
      attachment: attachment,
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
    setAttachment(null);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAttachment(fileUrl);
    }
  };

  const renderUserImageOrInitials = (msg: Message) => {
    if (msg.userImage) {
      return (
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={msg.userImage}
            alt="User"
            layout="fill"
            objectFit="cover"
            onError={(e) => {
              e.currentTarget.src = ""; // Fallback to empty if error
            }}
          />
        </div>
      );
    }
    return <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm">{msg.sender.substring(0, 2).toUpperCase()}</div>;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-3">
            {renderUserImageOrInitials(msg)}
            <div className="flex flex-col">
              <div className="text-sm text-gray-600 mb-1">
                {msg.sender} <span className="text-xs text-gray-500">{msg.timestamp}</span>
                <span className={`ml-2 h-2 w-2 rounded-full ${msg.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} title={msg.isOnline ? 'Online' : 'Offline'}></span>
              </div>
              <div className="p-3 bg-gray-200 rounded-lg text-gray-800">{msg.text}</div>
              {msg.attachment && (
                <div className="relative max-w-full h-auto mt-2 rounded-md">
                  <Image
                    src={msg.attachment}
                    alt="Attachment"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-gray-100">
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none"
          >
            📎
          </button>
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
