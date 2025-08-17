import React, { useState } from "react";
import { URL } from "./Constant";
import axios from "axios";
import Answers from "./Components/Answers";

const ChatAI = () => {
  const [Questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const payload = {
    contents: [
      {
        parts: [
          {
            text: Questions,
          },
        ],
      },
    ],
  };

  const askQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.post(URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      let geminiAnswer =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      geminiAnswer = geminiAnswer.split("* ");
      geminiAnswer = geminiAnswer.map((item) => item.trim());

      setResults(geminiAnswer);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-5 text-center h-screen">
      <div className="col-span-1 bg-zinc-800 text-white pt-1">History</div>
      <div className="col-span-4 p-10">
        <div className="container h-110 overflow-auto p-5">
          <div className="text-white">
            {loading ? (
              <div className="text-left p-3 m-2">Wait for few secs...</div>
            ) : (
              <ul>
                {results &&
                  results.map((ele, index) => (
                    <li key={index} className="text-left p-3 m-2">
                      <Answers
                        ans={ele}
                        index={index}
                        totalResult={results.length}
                      />
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        <div className="bg-zinc-800 w-1/2 m-auto p-1 pr-5 text-white rounded-4xl flex border border-zinc-700">
          <input
            type="text"
            value={Questions}
            onChange={(event) => setQuestions(event.target.value)}
            className="w-full h-full m-3 outline-none"
            placeholder="ASK Me Anything..."
          />
          <button className="cursor-pointer" onClick={askQuestions}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;
