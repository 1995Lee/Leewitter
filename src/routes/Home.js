import userEvent from "@testing-library/user-event";
import { dbService } from "fbase";
import { userEffect, useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { useEffect } from "react/cjs/react.development";
import { storage } from "firebase";

const Home = ({userObj}) => {

    const [ nweets, setNweets] = useState([]);
    

    useEffect(()=>{
       dbService.collection("nweets").onSnapshot((snapshot)=>{
           const newArray = snapshot.docs.map((document) => ({
               id : document.id,
               ...document.data(),
           }));
           setNweets(newArray);
       });
    },[]);

    
    return (
        <>
        <NweetFactory userObj={userObj} />
        <div>
            {nweets.map((nweet)=>(
               <Nweet key ={nweet.id} nweetObj={nweet}
               isOwner ={nweet.creatorId === userObj.uid}/>   
                ))}
        </div>
        </>
    );
};

export default Home;
