import React, { useEffect, useState } from "react";
//import memesData from "../memesData";
import "../styles.css";
function Meme() {
  let url;

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    memeImage: "https://i.imgflip.com/30b1gx.jpg",
  });
  const [allMemes, setAllMemes] = useState();
  useEffect(()=>{
    async function getMemes(){
      const res=await fetch('https://api.imgflip.com/get_memes')
      const data=await res.json()
      setAllMemes(data.data.memes)
    }
    getMemes()
  },[])
  function getMemeImage() {
    // const memesArray = memesData.data.memes;
    const randNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }
  function handleChange(event){
    const {name,value}=event.target
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]:value,
    }));
  }
  return (
    <main>
      <div className="form">
        <input
          className="form-inputs"
          type="text"
          placeholder="top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="form-inputs"
          type="text"
          placeholder="bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form-button" onClick={getMemeImage}>
          Get a new meme image🌞
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="memeImage" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default Meme;
