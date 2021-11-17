import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";

const Auth = () => {
     
     //소셜로그인 버튼 
    const onSocialClick = async(event) => { //async 비동기함수
       const{
           target : {name},} =event;
           let provider;
           if(name ==="google"){
               provider = new firebaseInstance.auth.GoogleAuthProvider();
           }else if(name ==="github"){
               provider = new firebaseInstance.auth.GithubAuthProvider();
           }
       const data = await authService.signInWithPopup(provider);
      
    };

  return (
    <div className="authContainer">
        <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={ {marginBottom : 30}}/>
        <AuthForm />
        <div className="authBtns">
            <button onClick={onSocialClick} name="google" className="authBtn">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
            <button onClick={onSocialClick} name="github" className="authBtn">Continue with Githhhub<FontAwesomeIcon icon={faGithub}/></button>
        </div>
    </div>
  )  ;
};

export default Auth;