import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeatureCards() {
  const features = [
    {
      title: "One API for Any Model",
      description:
        "Access all major models through a single unified interface.",
    },
    {
      title: "Higher Availability",
      description: "Automatic failover between providers.",
    },
    {
      title: "Price and Performance",
      description: "Optimized cost and speed.",
    },
    {
      title: "Custom Data Policies",
      description: "Fine-grained data control.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
