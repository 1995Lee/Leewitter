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
    <div>
        <AuthForm />
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github" >Continue with Githhhub</button>
        </div>
    </div>
  )  ;
};

export default Auth;