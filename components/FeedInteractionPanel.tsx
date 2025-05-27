"use client";

import { useState, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import FeedSubmitOptions from "@/components/FeedSubmitOptions";
import { useToast } from "@/components/ui/use-toast";

interface FeedInteractionPanelProps {
  mode?: "verify" | "hub" | "forge";
  allowUrlInput?: boolean;
  allowTextInput?: boolean;
  debugRawJson?: boolean;
  onFeedLoaded: (feed: any) => void;
  value?: string;
}

export default function FeedInteractionPanel({
  mode = "hub",
  allowUrlInput = true,
  allowTextInput = false,
  debugRawJson = false,
  onFeedLoaded,
  value
}: FeedInteractionPanelProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [raw, setRaw] = useState(value ?? "");
  const [parsedFeed, setParsedFeed] = useState<any | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const isVerify = mode === "verify";
  const isHub = mode === "hub";
  const isForge = mode === "forge";

  useEffect(() => {
    if (value !== undefined) {
      setRaw(value);
    }
  }, [value]);

  const handleSubmit = async () => {
    let feed = null;
    setError(null);

    try {
      if (file) {
        const text = await file.text();
        feed = JSON.parse(text);
        setRaw(text);
      } else if (url) {
        const res = await fetch(url);
        const text = await res.text();
        feed = JSON.parse(text);
        setRaw(text);
      } else if (raw) {
        feed = JSON.parse(raw);
      } else {
        setError("Please provide a valid file, URL or raw JSON input.");
        return;
      }

      setParsedFeed(feed);
      setRaw(JSON.stringify(feed, null, 2));
      toast("Feed loaded: Launching feed..."); 
      onFeedLoaded(feed);
    } catch (err) {
      setError("Invalid JSON or failed to load feed.");
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-md dark:border-gray-700">
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-800 relative">
        <input
          type="file"
          accept="application/json"
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) {
              selected.text().then(text => setRaw(text));
              setFile(selected);
              setUrl("");
            }
          }}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center space-y-2">
          {file ? (
            <>
              <UploadCloud className="w-8 h-8 text-green-500" />
              <p className="text-sm font-medium text-green-700">
                ✅ File loaded: <strong>{file.name}</strong>
              </p>
              <p className="text-xs text-gray-500">You can click again to replace it</p>
            </>
          ) : (
            <>
              <UploadCloud className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                Click or drag a <code>.llmfeed.json</code> file here
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Only valid JSON feeds will be accepted
              </p>
            </>
          )}
        </div>
      </div>

      {allowUrlInput && (
        <div>
          <label className="block font-semibold mb-1 dark:text-white">Or enter a public URL</label>
          <input
            type="url"
            placeholder="https://..."
            className="border p-2 w-full bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setFile(null);
              setRaw("");
            }}
            onBlur={async () => {
              if (url) {
                try {
                  const res = await fetch(url);
                  const text = await res.text();
                  setRaw(text);
                  setError(null);
                } catch {
                  setError("Impossible to load this URL.");
                }
              }
            }}
          />
        </div>
      )}

      {allowTextInput && (
        <div>
          <label className="block font-semibold mb-1 dark:text-white">Or paste raw JSON</label>
          <textarea
            placeholder="Paste a valid .llmfeed.json content here"
            className="text-xs font-mono p-3 bg-gray-50 dark:bg-gray-900 border rounded-md shadow-sm w-full resize-y focus:outline-none focus:ring focus:border-blue-500 dark:border-gray-700 dark:text-white"
            rows={6}
            value={raw}
            onChange={(e) => {
              setRaw(e.target.value);
              setFile(null);
              setUrl("");
            }}
          ></textarea>
        </div>
      )}

      {(isVerify || isHub || isForge) && (
        <div className="flex justify-center">
          {isVerify && (
            <button
              onClick={handleSubmit}
              className="text-white bg-emerald-600 hover:bg-emerald-700 text-md px-5 py-2 rounded-lg shadow transition"
            >
              🔍 Verify Signature
            </button>
          )}
          {isHub && (
            <button
              onClick={handleSubmit}
              className="text-white bg-blue-600 hover:bg-blue-700 text-md px-5 py-2 rounded-lg shadow transition"
            >
              🌐 Load this feed
            </button>
          )}
          {isForge && (
            <button
              onClick={handleSubmit}
              className="text-white bg-purple-600 hover:bg-purple-700 text-md px-5 py-2 rounded-lg shadow transition"
            >
              🛠️ Use in Forge
            </button>
          )}
        </div>
      )}

      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

      {debugRawJson && raw && (
        <pre className="bg-gray-100 dark:bg-gray-800 p-2 text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">{raw}</pre>
      )}

      {mode === "hub" && parsedFeed && (
        <>
          <hr className="my-6 border-gray-300 dark:border-gray-700" />
          <h3 className="text-xl font-semibold mb-4 text-center dark:text-white">
            ✅ Feed loaded. You can now submit it for LLMCA certification
          </h3>
          <FeedSubmitOptions feed={parsedFeed} />
        </>
      )}
    </div>
  );
}
