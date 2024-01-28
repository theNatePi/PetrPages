import React, { useState } from "react";
<<<<<<< Updated upstream

function MusicUploader() {
  const [baseMusic, setBaseMusic] = useState("");
  const [url, setUrl] = useState();
=======
import { postAPI, getAPI} from "../utils/util";
function MusicUploader() {
>>>>>>> Stashed changes

  const uploadMusic = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
<<<<<<< Updated upstream
    setBaseMusic(base64);
    console.log(base64);
=======
    console.log(base64)
    await postAPI("/add_music/", {"music": base64, "postID": 1});
>>>>>>> Stashed changes
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
<<<<<<< Updated upstream
      fileReader.readAsDataURL(file);
=======
      fileReader.readAsText(file);
>>>>>>> Stashed changes

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

<<<<<<< Updated upstream
  const handlePlay = () => {
    console.log("hi");
    console.log(url.text());
    const tmp = new Audio(url); //passing your state (hook)
    tmp.volume = 1;
    tmp.play() //simple play of an audio element. 
  }

  function base64ToBlob(base64String) {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);
    return new Blob([byteArray], { 'type': 'audio/mp3' });
};


  return (
    <div className="App">
      <input
        type="file"
        onChange={ async(e) => {
          uploadMusic(e);
          await setUrl(base64ToBlob(baseMusic));
          handlePlay();
        }}
      />
      <br></br>
      <img src={baseMusic} height="200px" />
=======
  const [file, setFile] = useState(null);
  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file_upload', file);

    try {
      const endpoint = "http://localhost:8000/add_music/"
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData
      });
      console.log("send");
    } catch(error) {
      console.log(error);
    }

  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileInputChange}
        />
        <button type="submit">Upload</button>
      </form>
      <br></br>
>>>>>>> Stashed changes
    </div>
    
  );
}

export default MusicUploader;