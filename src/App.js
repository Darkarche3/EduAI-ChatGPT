import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';


function App() {
  const msgEnd = useRef(null);
  const[input, setInput] = useState("");
  const[knowledgelevel, setKnowledgeLevel] = useState("");
  const[levelandTopic, setLevelandTopic] = useState(true);
  const[practiceQuestionsTriggered, setTrigger] = useState(true);
  const[firsttime, setFirstTime] = useState(true);
  const [messages, setMessages] = useState([{
    text: "Hi I am EduAI, designed to help you study, what would you like to study today?",
    isBot: true,
  }]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  },[messages]);


  const handleSend = async() => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ]);
    if (levelandTopic) {
      setMessages([
        ...messages,
        { text, isBot: false},
        {
          text: "Are you studying IB or 'A' Level? Which Topic would you like to learn?",
          isBot: true,
        },
      ]);
      setLevelandTopic(false);
    } else if (!levelandTopic && firsttime) {
    setKnowledgeLevel(text);
    const text2 = text + "Can you provide me with the content required as well as step by step instructions on how to study this topic?"
    const res = await sendMsgToOpenAI(text2);
    setMessages([...messages,
      { text, isBot: false},
      { text: res, isBot: true},
      { text: "Would you like a list of practice questions?", isBot: true}])
      setFirstTime(false);
    } else {
      if (text.includes("ye") && practiceQuestionsTriggered) {
        const newString = "Let's start a Q&A Session. Ask me a practice question regarding " + knowledgelevel
        console.log(newString)
        const res = await sendMsgToOpenAI(newString);
        setMessages([...messages,
          { text, isBot: false},
          { text : res, isBot: true}]);
        }
      else {
        const res = await sendMsgToOpenAI(text + "Tell me if I am correct. What's your next question?");
        setMessages([...messages,
          { text, isBot: false},
          { text : res, isBot: true}]);
      }
      setTrigger(false);
    }
  }

  console.log(knowledgelevel);

  const handleEnter = async (e) => {
    if (e.key ==='Enter') await handleSend();
  }

  const handleQuery = async(e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMsgToOpenAI(text);
    setMessages([...messages,
      { text, isBot: false},
      { text : res, isBot: true}])
      console.log(messages)
  };

  return (
  <div className="App">
    <div className="sideBar">
      <div className="upperSide">
        <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">EduAI</span></div>
        <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
        <div className="upperSideBottom">
          <button className="query" onClick={handleQuery} value = "What is Programming?"><img src={msgIcon} alt="Query" />What is Programming?</button>
          <button className="query" onClick={handleQuery} value = "How to use an API?"><img src={msgIcon} alt="Query" />How to use an API?</button>
          <button className="query" onClick={handleQuery} value = "What is your level of knowledge on this subject?"><img src={msgIcon} alt="Query" />What is your level of knowledge on this subject?Beginner, Intermediate, Advanced? </button>
        </div>
    </div>
    <div className="lowerSide">
      <div className="listItems"><img src={home} alt="" className="listItemsImg"/>Home</div>
      <div className="listItems"><img src={saved} alt="" className="listItemsImg"/>Saved</div>
      <div className="listItems"><img src={rocket} alt="" className="listItemsImg"/>Upload a File</div>
    </div>
    </div>
  <div className="main">
    <div className="chats">
      {messages.map((message, i) => 
        <div key={i} className={message.isBot?"chat bot":"chat"}>
          <img className='chatImg' src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{message.text}</p>
        </div>
      )}
      <div ref={msgEnd}></div>
    </div>
    <div className="chatFooter">
      <div className="inp">
      <input type="text" placeholder='Send a Message' value={input} onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value)}}/>
      <button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>

      </div>
      <p>EduAI may produce incorrect information about people, places or facts.</p>
    </div>
  </div>
</div>

  );
}

export default App;
