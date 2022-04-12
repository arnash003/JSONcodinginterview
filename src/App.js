import * as React from "react";
// import "./styles.css";
import axios from "axios";

const { useEffect, useState } = React;

interface UserName {
first: string;
last: string;
title: string;
}
interface UserPicture {

  thumbnail: string;
}
interface UserInfo {
name: UserName;
picture: UserPicture;
}

const fetchRandomData = () => {
  return axios
    .get("https://randomuser.me/api")
    .then(({ data }) => {
      //handle success
      console.log(data);
      return data;
    })
    .catch((err) => {
      //handle error
      console.error(err);
    });
};

const getFullUserName = (userInfo: UserInfo) => {
const {name: {first, last}} = userInfo;
return `${first} ${last}`;
}

export default function App() {
  const [counter, setCounter] = useState(0);
  const [randomUserDataJSON, setRandomUserDataJSON] = useState("");
  const [userInfos, setUserInfos] = useState([]);

 useEffect(() => {
fetchRandomData().then((randomData) => {
  setRandomUserDataJSON(JSON.stringify(randomData, null, 2) || 'No user data found');
setUserInfos(randomData.results);
});
 }, []);
  
  
  
  return (
    <div className="App">
      <h1>Hello Sandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{counter}</p>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increase Counter
      </button>
      {
        userInfos.map((userInfo: UserName , idx: number) => (
          <div key={idx}>
          <p>{getFullUserName(userInfo)}</p>
          <img src= {userInfo.picture.thumbnail} />
          </div>
        ))
      }
     <pre>
       {randomUserDataJSON}
       </pre>
    </div>
  );
}

// Button that increases the counter by 1
// fetch a random API
// https://randomuser.me/api
// Turn the API call into a string
// Display some UI components displaying every user name and image on this page
// Add a button to pagenate through a list of more users