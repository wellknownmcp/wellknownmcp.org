import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FAQList() {
  return (
    <section className="mt-16 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        <a href="/faq" className="hover:underline text-purple-600">
          FAQ — Your questions answered
        </a>
      </h2>
      <Accordion type="single" collapsible className="space-y-2">
        <AccordionItem value="q1">
          <AccordionTrigger>
            What is the purpose of LLMFeed and MCP?
          </AccordionTrigger>
          <AccordionContent>
            They help structure content and intent for AI agents using
            verifiable, machine-readable feeds. It bridges the gap between web
            content and AI understanding.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q2">
          <AccordionTrigger>
            Is this a protocol, a product, or a standard?
          </AccordionTrigger>
          <AccordionContent>
            MCP is a protocol standard. LLMFeed is its canonical data format.
            The sites you see here are open infrastructure tools for adoption
            and demonstration.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q3">
          <AccordionTrigger>
            Do I need to run a server to use it?
          </AccordionTrigger>
          <AccordionContent>
            Not necessarily. Static `.llmfeed.json` exports can be created and
            hosted anywhere — your site, GitHub repo, or even uploaded to the
            Forge for inspection.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q4">
          <AccordionTrigger>
            How do LLMs discover and use these feeds?
          </AccordionTrigger>
          <AccordionContent>
            When agents encounter a site, they check
            `.well-known/*.llmfeed.json` files or use MCP-specific endpoints.
            Feeds help them decide what’s trusted, useful, or interactive.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q5">
          <AccordionTrigger>What are the benefits for me?</AccordionTrigger>
          <AccordionContent>
            You make your site agent-friendly, verifiable, and interoperable —
            improving trust, discoverability, and alignment with next-gen
            interfaces.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="text-center mt-6">
        <a href="/faq" className="text-sm text-purple-600 hover:underline">
          View all questions →
        </a>
      </div>
    </section>
  )
}
