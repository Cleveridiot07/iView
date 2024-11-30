import React from "react";
import { FileText } from "lucide-react";

const GeminiLoader = ({ message = "Generating report template with AI" }) => {
  return (
    <div className="fixed inset-0 bg-[#0B2447] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-white/20 rounded-full animate-spin">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3">
                <FileText className="w-8 h-8 text-[#0B2447]" />
              </div>
            </div>
          </div>
          <div className="w-24 h-24 border-4 border-white/60 rounded-full animate-ping absolute top-0"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">{message}</h2>
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div className="h-full bg-white animate-progress"></div>
      </div>
    </div>
  );
};

export default GeminiLoader;
