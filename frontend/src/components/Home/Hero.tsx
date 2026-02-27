import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="text-center py-24 px-4">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        The Unified Interface For LLMs
      </h1>

      <p className="mt-6 text-muted-foreground text-lg">
        Better prices, better uptime, no subscriptions.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Button
          className="cursor-pointer bg-blue-600 hover:bg-blue-500 hover:duration-300 ease-in"
          size="lg"
        >
          <Link to="/api-keys">Get API Key</Link>
        </Button>
        <Button className="cursor-pointer" variant="outline" size="lg">
          <Link to="/models">Explore Models</Link>
        </Button>
      </div>
    </section>
  );
}
