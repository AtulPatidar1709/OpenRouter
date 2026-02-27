"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const pricingData = [
  {
    feature: "Platform Fees",
    free: "N/A",
    payg: "6.5%",
    enterprise: (
      <a href="#" className="underline">
        Bulk discounts available
      </a>
    ),
  },
  {
    feature: "Models",
    free: "26+ free models",
    payg: "350+ models",
    enterprise: "310+ models",
  },
  {
    feature: "Providers",
    free: "4 free providers",
    payg: "100+ providers",
    enterprise: "150+ providers",
  },
  {
    feature: "Chat and API Access",
    free: <Check className="w-5 h-5 text-green-600 mx-auto" />,
    payg: <Check className="w-5 h-5 text-green-600 mx-auto" />,
    enterprise: <Check className="w-5 h-5 text-green-600 mx-auto" />,
  },
  {
    feature: "Activity Logs & Export",
    free: <Check className="w-5 h-5 text-green-600 mx-auto" />,
    payg: <Check className="w-5 h-5 text-green-600 mx-auto" />,
    enterprise: <Check className="w-5 h-5 text-green-600 mx-auto" />,
  },
  {
    feature: "Auto-routing, preferred vendor selections",
    free: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    payg: <Check className="w-5 h-5 text-green-600 mx-auto" />,
    enterprise: <Check className="w-5 h-5 text-green-600 mx-auto" />,
  },
  {
    feature: "Budgets & Spend Controls",
    free: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    payg: <Check className="w-5 h-5 text-green-600 mx-auto" />,
    enterprise: <Check className="w-5 h-5 text-green-600 mx-auto" />,
  },
  {
    feature: "Prompt Caching",
    free: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    payg: <Check className="w-5 h-5 text-green-600 mx-auto" />,
    enterprise: <Check className="w-5 h-5 text-green-600 mx-auto" />,
  },
  {
    feature: "Management API key",
    free: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    payg: <Check className="w-5 h-5 text-green-600 mx-auto" />,
    enterprise: <Check className="w-5 h-5 text-green-600 mx-auto" />,
  },
  {
    feature: "Admin Controls",
    free: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    payg: <Check className="w-5 h-5 text-green-600 mx-auto" />,
    enterprise: <Check className="w-5 h-5 text-green-600 mx-auto" />,
  },
  {
    feature: "Data Policy - Based Routing",
    free: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    payg: <Check className="w-5 h-5 text-green-600 mx-auto" />,
    enterprise: <Check className="w-5 h-5 text-green-600 mx-auto" />,
  },
  {
    feature: "Managed Policy Enforcement",
    free: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    payg: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    enterprise: <Check className="w-5 h-5 text-green-600 mx-auto" />,
  },
  {
    feature: "Provider Data Explorer",
    free: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    payg: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    enterprise: <Check className="w-5 h-5 text-green-600 mx-auto" />,
  },
  {
    feature: "SSO / SAML",
    free: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    payg: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    enterprise: <Check className="w-5 h-5 text-green-600 mx-auto" />,
  },
  {
    feature: "Contractual SLAs",
    free: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    payg: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    enterprise: <Check className="w-5 h-5 text-green-600 mx-auto" />,
  },
  {
    feature: "Payment options",
    free: <X className="w-5 h-5 text-gray-400 mx-auto" />,
    payg: "Credit card, crypto & more",
    enterprise: "Invoicing options",
  },
  {
    feature: "BYOK Limits",
    free: (
      <a
        href="#"
        className="underline block mx-auto max-w-[120px] text-center text-sm text-muted-foreground"
      >
        Learn more →
      </a>
    ),
    payg: "1M free requests/month, 5% fee after",
    enterprise: "5M free requests/month, custom pricing",
  },
  {
    feature: "Rate limits",
    free: "50 requests/y",
    payg: "High global limits",
    enterprise: "Optional dedicated limits",
  },
  {
    feature: "Token Pricing",
    free: "Free models only",
    payg: "No minimum spend, prices based on models",
    enterprise: "Volume commitments, prices based on models",
  },
  {
    feature: "Support",
    free: "Community Support",
    payg: "Email Support",
    enterprise: "Support SLA with shared Slack Channel",
  },
];

export default function PricingSection() {
  return (
    <section className="py-1">
      <div className="max-w-7xl mx-auto">
        <section className="px-4 flex flex-col gap-4 max-w-7xl mx-auto overflow-x-auto">
          <h2 className="text-4xl font-bold text-center">Pricing</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Plans for indie hackers, AI native startups, and enterprises
          </p>
          <div className="flex justify-center gap-4">
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

          <table className="min-w-full border-collapse border border-gray-200 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-3 text-left">
                  {" "}
                </th>
                <th className="border border-gray-200 px-4 py-3">Free</th>
                <th className="border border-gray-200 px-4 py-3 bg-blue-50 font-semibold">
                  Pay-as-you-go
                </th>
                <th className="border border-gray-200 px-4 py-3">Enterprise</th>
              </tr>
            </thead>

            <tbody>
              {pricingData.map(({ feature, free, payg, enterprise }, i) => (
                <tr
                  key={i}
                  className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="border border-gray-200 px-4 py-3 text-left font-medium text-sm">
                    {feature}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">{free}</td>
                  <td className="border border-gray-200 px-4 py-3">{payg}</td>
                  <td className="border border-gray-200 px-4 py-3">
                    {enterprise}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <Button variant="outline" size="lg" className="w-full max-w-xs">
              <Link to={"signup"}>Get Started For Free</Link>
            </Button>
            <Button
              size="lg"
              className="w-full max-w-xs bg-blue-600 hover:bg-blue-500"
            >
              <Link to={"login"}>Buy Credits</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full max-w-xs">
              <Link to={"contact"}>Contact Sales</Link>
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h3>

          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>How are tokens billed?</AccordionTrigger>
              <AccordionContent>
                Tokens are billed based on provider pricing with no hidden
                markup.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Do you enforce rate limits?</AccordionTrigger>
              <AccordionContent>
                Yes, rate limits depend on your selected plan.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Do you support SSO?</AccordionTrigger>
              <AccordionContent>
                SSO/SAML is available on Enterprise plans.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="mt-12 flex justify-center items-center">
          <Card className="text-center max-w-max py-12 bg-muted/40">
            <CardHeader>
              <CardTitle className="text-2xl">Ready To Get Started?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Join thousands of developers building with OpenRouter
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg">
                  <Link to={"/signup"}>Sign Up For Free</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link to={"/contact"}>Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
