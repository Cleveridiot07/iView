import { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { io } from "socket.io-client";
import LanguageSelector from "./utils/LanguageSelect";
import { CODE_SNIPPETS } from "./utils/constants";
import Output from "./Output";
import { executeCode } from "./utils/api"; // Import the executeCode function

const socket = io('http://localhost:8080'); // Ensure this matches your server URL

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    socket.on('codeUpdate', (newCode) => {
      setValue(newCode);
    });

    socket.on('runCode', (code) => {
      runCode(code);
    });

    return () => {
      socket.off('codeUpdate');
      socket.off('runCode');
    };
  }, []);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    socket.emit('codeUpdate', newValue);
  };

  const runCode = async (code) => {
    if (!code) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, code);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      alert(`An error occurred: ${error.message || "Unable to run code"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunCode = () => {
    const sourceCode = editorRef.current.getValue();
    socket.emit('runCode', sourceCode); // Emit the runCode event
    runCode(sourceCode); // Run code locally as well
  };

  return (
    <div id="customScrollbar" className="p-4 bg-[#2a2a2a] overflow-y-scroll h-full">
      <div className="flex flex-col space-x-4">
        <div className="w-full">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="50vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={handleEditorChange}
          />
        </div>
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeEditor;