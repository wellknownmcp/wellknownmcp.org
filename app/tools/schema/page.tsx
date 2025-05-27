// app/tools/schema/page.tsx
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Copy } from 'lucide-react'

export default function SchemaPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📐 Official LLMFeed Schema</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Public Schema Files</CardTitle>
          <CardDescription>
            These schemas define the structure of `.llmfeed.json` files
            according to the MCP standard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>
              <Link
                href="/.well-known/schema.llmfeed.json"
                className="text-blue-600 hover:underline"
              >
                🔗 schema.llmfeed.json
              </Link>{' '}
              — canonical version used for validation
            </li>
            <li>
              <Link
                href="/.well-known/schema.annotated.llmfeed.json"
                className="text-blue-600 hover:underline"
              >
                🔍 schema.annotated.llmfeed.json
              </Link>{' '}
              — with developer comments and guidance
            </li>
            <li>
              <Link
                href="/.well-known/schema.lite.llmfeed.json"
                className="text-blue-600 hover:underline"
              >
                ⚡ schema.lite.llmfeed.json
              </Link>{' '}
              — minimal schema for drafts and prompts
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>How to use the schema</CardTitle>
          <CardDescription>
            Reference the canonical schema in your `.llmfeed.json` like this:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
            {`{
  "$schema": "https://wellknownmcp.org/.well-known/schema.llmfeed.json",
  "feed_type": "export",
  "metadata": {
    "title": "My Feed",
    "origin": "https://example.com"
  },
  ...
}`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coming soon: Schema Validator</CardTitle>
          <CardDescription>
            You will be able to drop your `.llmfeed.json` file here and validate
            it against the schema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm">
            The validator will support live validation, linting, and structure
            suggestions.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
