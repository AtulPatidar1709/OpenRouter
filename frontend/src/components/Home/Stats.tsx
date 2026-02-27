export default function Stats() {
  const stats = [
    { value: "30T", label: "Monthly Tokens" },
    { value: "5M+", label: "Global Users" },
    { value: "60+", label: "Active Providers" },
    { value: "300+", label: "Models" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="cursor-pointer transform transition duration-300 hover:scale-110"
          >
            <h2
              className={`text-3xl font-bold ${
                stat.label === "Models" ? "text-blue-600" : ""
              }`}
            >
              {stat.value}
            </h2>

            <p
              className={`mt-2 ${
                stat.label === "Models"
                  ? "text-blue-500"
                  : "text-muted-foreground"
              }`}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
