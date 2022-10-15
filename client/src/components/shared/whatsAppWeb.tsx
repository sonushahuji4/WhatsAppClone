import homePageImge from '../../../src/static/images/homepage.jpeg';

const WhatsAppWeb = () => {
    return (
        <div className='home-chat'>
          <div className='chat-image'>
            <img src={homePageImge} alt="Imgae Not Found"></img>
          </div>
          <div className='context'>
            <span>Keep your phone connected</span><br />
            <p>WhatsApp connects to your phone to sync messages.</p>
          </div>
        </div>
      );
}

export default WhatsAppWeb;