
import React, { useState } from "react";

const ResumeMatcher = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
   const [form, setForm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    try {

const form = new FormData();
      if (resumeFile) form.append("resume", resumeFile);
      // form.append("jdText", jdText);
    //   console.log(jdText)
    //   console.log(resumeFile)
      // console.log(form.get("jdText"))


      const res = await fetch("http://localhost:6400/app/analyze", {
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
    <div className="max-w-3xl mx-auto my-10 font-sans">
      <h1 className="text-2xl font-bold mb-2">JobFit AI — Resume ↔ JD Matcher</h1>
      <p className="text-gray-600 mb-6">
        Upload your resume and paste the job description to get match %, missing skills, and suggestions.
      </p>

      <form
        onSubmit={handleSubmit}
        className="border border-gray-200 p-5 rounded-lg mb-6"
      >
        <div className="mb-4">
          <label className="block font-medium mb-1">Resume (PDF/DOCX)</label>
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            className="block w-full text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Job Description</label>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            rows={10}
            placeholder="Paste JD here…"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white ${loading ? "bg-gray-700 cursor-not-allowed" : "bg-gray-900 hover:bg-black"}`}
        >
          {loading ? "Analyzing…" : "Analyze"}
        </button>
      </form>

      {error && <div className="text-red-600 mb-4">Error: {error}</div>}

      {result && (
        <div className="border border-gray-200 p-5 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Results</h2>
          <p>
            <span className="font-semibold">Match Percentage:</span> {result.matchPercentage}%
          </p>
          

          <div className="my-2">
            <span className="font-semibold">JD Skills:</span> {result.jdSkills?.length ? result.jdSkills.join(", ") : "—"}
          </div>
          <div className="my-2">
            <span className="font-semibold">Present Skills:</span> {result.presentSkills?.length ? result.presentSkills.join(", ") : "—"}
          </div>
          <div className="my-2">
            <span className="font-semibold">Missing Skills:</span> {result.missingSkills?.length ? result.missingSkills.join(", ") : "—"}
          </div>

          {result.suggestions?.length > 0 && (
            <div className="mt-3">
              <span className="font-semibold">Suggestions:</span>
              <ul className="list-disc list-inside mt-1">
                {result.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      { JSON.stringify(result)}
      {console.log(result)}
    </div>
  );
};

export default ResumeMatcher;

