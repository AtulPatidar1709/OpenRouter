import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeaturedModels() {
  const models = [
    {
      name: "Claude Opus 4.6",
      provider: "Anthropic",
      tokens: "638.4B",
      trend: "-8.6%",
    },
    {
      name: "Trinity Large Preview",
      provider: "Arcade AI",
      tokens: "494.0B",
      trend: "-2.29%",
    },
    {
      name: "Gemini 3 Pro Preview",
      provider: "Google",
      tokens: "141.4B",
      trend: "-26.57%",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold">Featured Models</h2>
          <button className="text-sm text-muted-foreground hover:text-foreground transition">
            View all →
          </button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="text-lg">{model.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  by {model.provider}
                </p>
              </CardHeader>

              <CardContent className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Tokens</p>
                  <p className="font-semibold">{model.tokens}</p>
                </div>

                <Badge variant="secondary" className="text-red-500 bg-red-100">
                  {model.trend}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
