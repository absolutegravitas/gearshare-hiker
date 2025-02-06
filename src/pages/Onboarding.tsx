import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OnboardingTooltip } from "@/components/onboarding/OnboardingTooltip";
import { PackingListDemo } from "@/components/onboarding/PackingListDemo";
import { ArrowRight } from "lucide-react";

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isDemoComplete, setIsDemoComplete] = useState(false);

  const steps = [
    {
      target: "create-list",
      content: "Start by creating a new packing list for your next adventure",
      title: "Create a List",
    },
    {
      target: "add-items",
      content: "Add essential items to your packing list",
      title: "Add Items",
    },
    {
      target: "organize-items",
      content: "Organize items by category to keep your list tidy",
      title: "Organize Items",
    },
    {
      target: "visualize",
      content: "See a visual representation of your packed items",
      title: "Visualize Your Pack",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsDemoComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest to-forest-light p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-white">Welcome to Trail Gear</h1>
          <p className="text-xl text-white/80">
            Let's walk through creating your first packing list
          </p>
        </div>

        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <PackingListDemo
            currentStep={currentStep}
            onStepComplete={handleNext}
            isDemoComplete={isDemoComplete}
          />

          {steps.map((step, index) => (
            <OnboardingTooltip
              key={step.target}
              open={currentStep === index && !isDemoComplete}
              target={step.target}
              title={step.title}
              content={step.content}
            />
          ))}
        </Card>

        {isDemoComplete && (
          <div className="flex justify-center animate-fade-in">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard/lists")}
              className="bg-sky hover:bg-sky-light text-white"
            >
              Start Creating Your Lists
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}