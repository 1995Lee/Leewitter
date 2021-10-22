import {authService, firebaseInstance} from "fbase"; //파이어베이스 인증
import {useState} from "react"; //함수

const AuthForm =() =>{
    const [email, setEmail] = useState(""); //이메일 
    const [password, setPassword] = useState(""); //패스워드
    const [newAccount, setNewAccount] = useState(true); //회원가입
    const [error, setError] = useState(""); //에러 메시지

     //버튼 이벤트
     const onChange = (event) => {
        const{
            target : {name, value},
        } = event;
        if (name=== "email"){
            setEmail(value);
        }else if(name ==="password"){
            setPassword(value);
        }
        
    };

    const onSubmit = async(event) =>{
        event.preventDefault();

        //회원가입 이벤트
        try{
            let data;
        if(newAccount){
            data = await authService.createUserWithEmailAndPassword(email, password);
        }else{
            data = await authService.signInWithEmailAndPassword(email, password);
        }
           
        }catch(error){

            setError(error.message);
        }
    }; 

     const toggleAccount = () => setNewAccount((prev) => !prev); //회원가입 로그인 버튼 변경

     return(
         <>
          <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
            {error}
        </form>
        <span onClick={toggleAccount}>
            {newAccount ? "Sign In" : "Create Account"}
        </span>
         </>
     );
};

export default AuthForm;