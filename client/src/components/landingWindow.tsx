import whatsappIcon from "../static/images/whatsappIcon.svg";
import qrCode from "../static/images/qrcode.jpg";
import { GoogleLogin } from "@react-oauth/google";
import * as constants from "../constants/contant";
import useUser from '../hooks/useUser';
import { Socket } from "socket.io-client";


interface Props {
    socket : Socket;
}
const LandingWindow = ({socket}: Props) => {
    const { onLoginSuccess, onLoginError} = useUser(socket);

    return (
        <div className="landing-window-container">
            <div className="landing-header-wrapper">
                <div className="landing-header">
                    <div className="whatsapp-icon">
                        <img src={whatsappIcon} alt="not fount"></img>
                    </div>
                    <div className="whatsapp-title">
                        {constants.WHATSAPP_TITLE}
                    </div>
                </div>
            </div>

            <div className="landing-body-wrapper">
                <div className="instruction-window">
                    <div className="login-intruction-title">
                        To use WhatsApp on your computer:
                    </div>
                    <div className="login-intruction">
                        <ol>
                            <li>Create Google Account if you don't have one.</li>
                            <li>Click here to <a href={"https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp"}>Create Google Account</a></li>
                            <li>You need to Signin using your Google Account.</li>
                        </ol>
                    </div>
                
                </div>
                <div className="qr-code-login">
                    {/* <img src={qrCode} alt="not found"></img> */}
                    <GoogleLogin
                        onSuccess={onLoginSuccess}
                        onError={onLoginError}
                    />
                </div>
            </div>
        </div>
    );

}

export default LandingWindow;   