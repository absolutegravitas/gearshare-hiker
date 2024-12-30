import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PricingPage = () => {
  const { toast } = useToast();

  const handlePurchase = (plan: string) => {
    toast({
      title: "Coming Soon",
      description: `${plan} purchase will be available shortly!`,
    });
  };

  const plans = [
    {
      name: "Monthly",
      price: "$5",
      period: "/month",
      features: [
        "Basic gear tracking",
        "3 packing lists",
        "Weight calculator",
        "Basic analytics",
        "Email support",
      ],
      excludedFeatures: [
        "Unlimited packing lists",
        "Advanced analytics",
        "Gear sharing",
        "Priority support",
        "Custom categories",
      ],
      cta: "Start Monthly Plan",
    },
    {
      name: "Lifetime Access",
      price: "$199",
      period: "one-time",
      features: [
        "Basic gear tracking",
        "Unlimited packing lists",
        "Weight calculator",
        "Advanced analytics",
        "Gear sharing",
        "Priority support",
        "Custom categories",
        "Future updates",
        "Early access to new features",
        "No recurring fees",
      ],
      excludedFeatures: [],
      cta: "Get Lifetime Access",
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest to-forest-light">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your Trail Companion
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Start organizing your hiking gear today with our launch pricing. 
            Join thousands of hikers who trust TrailKit for their adventures.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 
                ${plan.popular ? "transform md:scale-105 md:-translate-y-2" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky px-4 py-1 rounded-full text-white text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  {plan.price}
                  <span className="text-lg font-normal text-white/60">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center text-white/90">
                    <Check className="h-5 w-5 text-sky-light mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                {plan.excludedFeatures.map((feature) => (
                  <div key={feature} className="flex items-center text-white/50">
                    <X className="h-5 w-5 text-white/30 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handlePurchase(plan.name)}
                className={`w-full text-lg py-6 ${
                  plan.popular
                    ? "bg-sky hover:bg-sky-light"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-white/80 mb-4">
            Questions? We're here to help!
          </p>
          <Link
            to="/about"
            className="text-sky-light hover:text-sky hover:underline"
          >
            Learn more about TrailKit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;