import { useRef, useEffect } from 'react';

interface Props {
    authorId : string;
    chatHistory: any[];
}

const ConversationBody = ({authorId, chatHistory} : Props): JSX.Element => {
    const scrollToBottom = useRef<HTMLDivElement>(null);

    useEffect(() => {
        /** scroll to bottom automatically chats overflow */
        if(scrollToBottom?.current){
            scrollToBottom.current.scrollTop = scrollToBottom.current.scrollHeight;
        }
    });

    return (
        <div className='conversation-body' key="conversation-body" ref={scrollToBottom}>
            {
                chatHistory.map((item: any, index: number) => {
                    const messageAligment = item.senderId === authorId;
                    return (
                        <div key={`${index} + aligment`} className='message-body-holder' style={{["--message-aligment" as string]: messageAligment ? "flex-end" : "flex-start"}}>
                        <div key={`${index} + color`} className='message'style={{["--background-color" as string]: messageAligment ? "#daf8cb" : "#ffffff"}}>{item.msg}</div>
                    </div>
                    );
                })
            }
        </div>
    );
}

export default ConversationBody;