import homePageImge from '../../../src/static/images/chatCopyImage.jpg';

const WhatsAppWeb = () => {
    return (
        <div className='home-chat'>
          <div className='chat-image'>
            <img src={homePageImge} alt="Imgae Not Found"></img>
          </div>
          <div className='context'>
            <span>WhatsApp Web</span><br />
            <p>Send and receive messages without keeping your phone online.<br />
            Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</p>
          </div>
        </div>
      );
}

export default WhatsAppWeb;