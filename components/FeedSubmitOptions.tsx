"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface FeedSubmitOptionsProps {
  feed: any;
}

export default function FeedSubmitOptions({ feed }: FeedSubmitOptionsProps) {
  const [track, setTrack] = useState(false);
  const [index, setIndex] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
  
	  toast("Invalid email: Please enter a valid email address...");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/submit-feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feed,
          email,
          track,
          index
        })
      });

      if (response.ok) {
         toast("Feed submitted: Your feed was sent for signature + certification + publication.");
		 
      } else {
		   toast("Submission failed: The server returned an error. Please try again.");
        
      }
    } catch (error) {
       toast("Error: An unexpected error occurred. Please try again.");
	  
    }

    setSubmitting(false);
  };

  return (
    <div className="space-y-4 p-4 border border-dashed rounded-md dark:border-gray-700 mt-8">
      <h4 className="text-md font-medium dark:text-white">
        📥 Submit this feed for public certification & publication
      </h4>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="track" checked={track} onCheckedChange={v => setTrack(!!v)} />
          <label htmlFor="track" className="text-sm dark:text-white">
            Allow tracking (help improve MCP dataset quality)
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="index" checked={index} onCheckedChange={v => setIndex(!!v)} />
          <label htmlFor="index" className="text-sm dark:text-white">
            Allow future indexing (LLM search & discovery)
          </label>
        </div>

        <div>
          <label className="block font-semibold mb-1 dark:text-white">
            Contact email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="border p-2 w-full bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
        This feed will be analyzed, signed by <strong>wellknownmcp.org</strong>,
        certified gold by <strong>LLMCA</strong>, and publicly exposed in the community repository.
      </p>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="text-white bg-emerald-600 hover:bg-emerald-700 text-md px-5 py-2 rounded-lg shadow transition"
        >
          {submitting ? "Submitting..." : "Submit for LLMCA Certification"}
        </Button>
      </div>
    </div>
  );
}
