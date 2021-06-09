import './ChatHeader.css';
import { BsFillPlusCircleFill } from "react-icons/bs";


const ChatHeader = () => {
  const title = 'Chats'
  return (
    <h1 className='ChatHeader'>
      { title }
      &nbsp;
      &nbsp;
      <button className="newConversation">
        <BsFillPlusCircleFill />
        <span> New conversation</span>
      </button>
    </h1>
  );
}

export default ChatHeader;