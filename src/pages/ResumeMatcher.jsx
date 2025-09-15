
import React, { useState } from "react";

const ResumeMatcher = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const form = new FormData();
      if (resumeFile) form.append("resume", resumeFile);
      form.append("jdText", jdText);

      const res = await fetch("https://jobfit-aibackend.onrender.com/app/analyze", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 font-sans p-4">
      <h1 className="text-3xl font-bold mb-3 text-gray-900 text-center">
        JobFit AI — Resume ↔ JD Matcher
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Upload your resume and paste the job description to get match %, missing skills, and suggestions.
      </p>

      <form
        onSubmit={handleSubmit}
        className="border border-gray-200 p-6 rounded-xl shadow-md bg-white mb-6"
      >
        <div className="mb-5">
          <label className="block font-medium mb-2">Resume (PDF/DOCX)</label>
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-5">
          <label className="block font-medium mb-2">Job Description</label>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            rows={10}
            placeholder="Paste JD here…"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
            loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Analyzing…" : "Analyze"}
        </button>
      </form>

      {error && (
        <div className="text-red-600 mb-4 bg-red-100 p-3 rounded-lg border border-red-200">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="border border-gray-200 p-6 rounded-xl shadow-md bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Results</h2>

          {/* {result.matchPercentage && (
            <p className="mb-3">
              <span className="font-semibold">Match Percentage:</span>{" "}
              <span className="text-blue-600">{result.matchPercentage}%</span>
            </p>
          )}

          {result.jdSkills?.length > 0 && (
            <div className="mb-2">
              <span className="font-semibold">JD Skills:</span>{" "}
              {result.jdSkills.join(", ")}
            </div>
          )}

          {result.presentSkills?.length > 0 && (
            <div className="mb-2">
              <span className="font-semibold">Present Skills:</span>{" "}
              {result.presentSkills.join(", ")}
            </div>
          )}

          {result.missingSkills?.length > 0 && (
            <div className="mb-2">
              <span className="font-semibold text-red-600">Missing Skills:</span>{" "}
              {result.missingSkills.join(", ")}
            </div>
          )}

          {result.suggestions?.length > 0 && (
            <div className="mt-4">
              <span className="font-semibold">Suggestions:</span>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {result.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )} */}
             { JSON.stringify(result)}
        </div>
      )}
    </div>
  );
};

export default ResumeMatcher;

