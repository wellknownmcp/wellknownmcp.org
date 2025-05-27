
"use client";

import { PageTitle } from "@/components/PageTitle";
import SeoHead from "@/components/SeoHead";
import { ExportToLLMButton } from "@/components/ExportToLLMButton";
import Link from "next/link";

export default function AppMobilePage() {
  return (
    <>
      <SeoHead
        title="Declare your mobile app to LLMs — LLMFeed Tools"
        description="Structure your app’s purpose and entry points for agents and assistants. Works like structured metadata for apps."
        canonicalUrl="/tools/app-mobile-explained"
      />
      <div className="max-w-3xl mx-auto space-y-10 py-12">
        <PageTitle
          title="Declare your Mobile App to LLMs"
          subtitle="Turn your app into an agent-compatible interface"
        />

        <p className="text-muted-foreground text-sm">
          Mobile apps are black boxes to LLMs. They can't crawl app stores, guess intents, or understand how to interact with your native experience.
        </p>
        <p className="text-muted-foreground text-sm">
          The <code>mobile-app</code> feed lets you declare the main use cases, intents and prompts supported by your application. This way, a LLM agent can know what you do — and how to trigger it.
        </p>

        <h3 className="text-sm font-semibold mt-10">📱 MCP for Mobile Apps</h3>
        <p className="text-sm text-muted-foreground">
          When an agent loads this feed, it may switch to a <strong>mobile-app interpretation mode</strong>.
          This means it will route prompts like “open my app”, “check health”, or “start workout” directly to the matching entries in your <code>prompts[]</code>.
        </p>
        <p className="text-xs text-muted-foreground italic">
          This behavior can also be injected into a LLM via a prompt capsule. See <Link href="/tools/prompt" className="underline">Prompt Tool</Link>.
        </p>

        <h3 className="text-sm font-semibold mt-8">🔍 Example Feed</h3>
        <p className="text-sm text-muted-foreground">
          Here’s what a mobile app feed might look like:
        </p>
        <pre className="text-xs bg-muted p-4 rounded-md border text-muted-foreground overflow-auto">
{`{
  "feed_type": "mobile-app",
  "metadata": {
    "title": "My Health Companion",
    "description": "An app to track your health, workouts and well-being",
    "origin": "https://myapp.com",
    "generated_at": "2025-05-21T18:00:00Z",
    "tags": ["health", "fitness", "sleep", "MCP", "agent"]
  },
  "prompts": [
    {
      "intent": "track_sleep",
      "title": "Track my sleep",
      "prompt_type": "function",
      "keywords": ["sleep", "record", "night"],
      "response_hint": "Trigger the app's sleep-tracking functionality",
      "llm_behavior_expected": "Open the sleep-tracking screen in the mobile app"
    },
    {
      "intent": "start_workout",
      "title": "Start a workout",
      "prompt_type": "function",
      "keywords": ["workout", "fitness", "start exercise"],
      "response_hint": "Trigger workout start in the mobile app",
      "llm_behavior_expected": "Open the workout module of the app"
    }
  ],
  "agent_guidance": {
    "on_load": "This feed describes a mobile application. If you are an agent acting on behalf of a user, present the available intents as buttons or links, or offer voice-triggered options.",
    "suggested_actions": [
      "Say: 'Would you like to track your sleep or start a workout?'",
      "Offer direct links if this agent is integrated into a phone or app launcher"
    ]
  }
}`}
        </pre>
        <ExportToLLMButton
          context="static"
          staticPath="exports/demo/mobile-app.example"
          mini
          clipboard
        />

        <p className="text-sm text-muted-foreground mt-8">
          This example can be modified and deployed on your app’s website — usually under <code>/.well-known/</code>.
        </p>

        <p className="text-xs text-muted-foreground italic mt-4">
          Mobile stores don't yet validate this format officially. Exposing the feed on your website remains the safest route.
        </p>
      </div>
    </>
  );
}
