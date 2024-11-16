import { useState } from "react";
import { executeCode } from "./utils/api";
import { Play } from "lucide-react";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      alert(`An error occurred: ${error.message || "Unable to run code"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  ">
      <div className="w-full  flex justify-end pr-4">
        <button
          className={`px-4 mt-4 py-2 mb-4 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={runCode}
          disabled={isLoading}
        >
          {isLoading ? "Loading" : <Play />}
        </button>
      </div>
      <div
        className={`h-[50vh] pl-2 pt-2 w-full border rounded overflow-y-scroll  text-white bg-[#222222] ${
          isError ? "text-red-400 border-red-500" : "border-gray-950"
        }`}
      >
        {output
          ? output.map((line, i) => <p key={i}>&gt; {line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
