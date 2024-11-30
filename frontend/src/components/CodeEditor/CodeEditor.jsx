import { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./utils/LanguageSelect";
import { CODE_SNIPPETS } from "./utils/constants";
import Output from "./Output";
import { connectToInterview } from "../../socket/socket"; // Import the updated socket connection function

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]);
  const [language, setLanguage] = useState("javascript");

  // Get the interviewID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const interviewID = urlParams.get('interviewID');

  // Store the socket connection in a ref
  const socketRef = useRef();

  useEffect(() => {
    // Connect to the specific interview room
    const { socket } = connectToInterview(interviewID);
    socketRef.current = socket;

    // Listen for draw events
    socketRef.current.on("draw", (data) => {
      if (data.language === language) {
        setValue(data.value); // Update the editor's value
      }
    });

    // Clean up the socket connection on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [language, interviewID]); // Re-run the effect if the language or interviewID changes

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const handleChange = (value) => {
    setValue(value);
    // Emit the current value and language with the interview context
    socketRef.current.emit("draw", { value, language });
  };

  return (
    <div
      id="customScrollbar"
      className="p-4 bg-[#2a2a2a] overflow-y-scroll h-full"
    >
      <div className="flex flex-col">
        <div className="w-full">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="65vh"
            theme="vs-dark"
            language={language}
            value={value}
            onMount={onMount}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <Output editorRef={editorRef} language={language} />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
