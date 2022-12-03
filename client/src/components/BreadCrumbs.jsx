import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./BreadCrumbs.css";

function BreadCrumbs() {
  const [trail, setTrail] = useState([]);
  const [selectedFile, setSelectedFile] = useState("home");
  const [fileContent, setFileContent] = useState([]);

  async function handleClick(file) {
    const { data } = await axios.get(`http://localhost:3000/path/${file}`);
    setSelectedFile(data[0]);
    setTrail(data[1]);
    const folderItems = Object.keys(data[0].children);
    setFileContent(folderItems);
  }
  useEffect(() => {
    async function initializeFile() {
      const { data } = await axios.get(
        `http://localhost:3000/path/${selectedFile}`
      );
      setSelectedFile(data[0]);
      setTrail(data[1]);
      const folderItems = Object.keys(data[0].children);
      setFileContent(folderItems);
    }
    initializeFile();
  }, []);
  return (
    <main>
      {trail.map((t) => (
        <span className="trail" onClick={() => handleClick(t)}>{`${t}/`}</span>
      ))}
      <h1>
        currently viewing {selectedFile.mypath} {selectedFile.type}
      </h1>

      <div className="folder-content">
        {selectedFile.type === "dir"
          ? fileContent.map((file) => (
              <p className="file-name" onClick={() => handleClick(file)}>
                {`- ${file}`}
              </p>
            ))
          : ""}
      </div>
    </main>
  );
}

export default BreadCrumbs;
