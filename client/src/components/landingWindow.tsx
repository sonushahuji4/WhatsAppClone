import React, { useContext } from "react";
import whatsappIcon from "../static/images/whatsappIcon.svg";
import qrCode from "../static/images/qrcode.jpg";
import { GlobalStateContext, GlobalDispatchContext } from '../context/GlobalContextProvider';
import * as actions from '../context/actions';
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import * as constants from "../constants/contant";

const LandingWindow = () => {
    const stateContext: any = useContext(GlobalStateContext);
    const dispatch: any = useContext(GlobalDispatchContext);

    const onLoginSuccess = (res: any) => {
        const decodeCredential: any = jwt_decode(res.credential)
        dispatch({
            type : actions.AUTHOR_DETAILS,
            payload : {
                authorId : decodeCredential.sub,
                name : decodeCredential.name,
                email : decodeCredential.email,
                picture: decodeCredential.picture
            }
        })
    }

    const onLoginError = () => {
        console.log("error");
    }

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
                            <li>You need to Signin using your Google Account.</li>
                            <li>You can anytime logout from the Web.</li>
                            <li>
                                Click on Signin button to continue using the Whatsapp Clone.
                            </li>
                        </ol>
                    </div>
                
                </div>
                <div className="qr-code-login">
                    <img src={qrCode} alt="not found"></img>
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