import { useFloating, useInteractions, useRole, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface OnboardingTooltipProps {
  target: string;
  title: string;
  content: string;
  open: boolean;
}

export function OnboardingTooltip({ target, title, content, open }: OnboardingTooltipProps) {
  const isMobile = useIsMobile();
  
  const { refs, floatingStyles, context } = useFloating({
    open,
    placement: isMobile ? "bottom" : "right",
    middleware: [
      offset(12),
      flip({
        fallbackPlacements: ['top', 'bottom', 'left', 'right'],
      }),
      shift({
        padding: 16,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([role]);

  if (!open) return null;

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()} />
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className="z-50 max-w-[90vw] lg:max-w-md"
      >
        <Card className="p-4 bg-white shadow-lg border-sky animate-fade-in">
          <h3 className="font-semibold text-lg mb-2 text-forest">{title}</h3>
          <p className="text-sm text-gray-600">{content}</p>
        </Card>
      </div>
    </>
  );
}