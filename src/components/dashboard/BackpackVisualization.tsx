import React from 'react';
import { ListItem } from './ListDetail';
import { useToast } from '@/components/ui/use-toast';

interface BackpackVisualizationProps {
  items: ListItem[];
}

export function BackpackVisualization({ items }: BackpackVisualizationProps) {
  const { toast } = useToast();

  const getItemColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'shelter':
        return '#8B5CF6'; // Vivid Purple for tent
      case 'sleep system':
        return '#D946EF'; // Magenta Pink for sleeping items
      case 'carrying':
        return '#F97316'; // Bright Orange for backpack
      case 'cooking':
        return '#0EA5E9'; // Ocean Blue for cook kit
      default:
        return '#8E9196'; // Neutral Gray for other items
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-[600px]">
      <svg
        viewBox="0 0 300 400"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
      >
        {/* Main backpack body - more detailed shape */}
        <path
          d="M60 100 
             C60 80 240 80 240 100
             L260 320 
             C260 350 40 350 40 320 
             Z"
          fill="#403E43"
          stroke="#222222"
          strokeWidth="2"
        />
        
        {/* Top lid with curve */}
        <path
          d="M50 100 
             C50 60 250 60 250 100"
          fill="#403E43"
          stroke="#222222"
          strokeWidth="2"
        />

        {/* Side pockets */}
        <path d="M40 200 L30 250 L40 300 L60 300 L60 200 Z" 
              fill="#363438" stroke="#222222" strokeWidth="1" />
        <path d="M260 200 L270 250 L260 300 L240 300 L240 200 Z" 
              fill="#363438" stroke="#222222" strokeWidth="1" />
        
        {/* Render gear items */}
        {items.map((item, index) => {
          const yOffset = 120 + (index * 45);
          const xCenter = 150;
          
          // Different SVG shapes based on item category
          let itemPath = '';
          let itemWidth = 160;
          let itemHeight = 35;
          
          switch (item.category.toLowerCase()) {
            case 'shelter':
              // A-frame tent shape
              itemPath = `M${xCenter - itemWidth/2} ${yOffset + itemHeight}
                         L${xCenter} ${yOffset}
                         L${xCenter + itemWidth/2} ${yOffset + itemHeight}
                         L${xCenter + itemWidth/3} ${yOffset + itemHeight}
                         L${xCenter + itemWidth/3} ${yOffset + itemHeight * 1.2}
                         L${xCenter - itemWidth/3} ${yOffset + itemHeight * 1.2}
                         L${xCenter - itemWidth/3} ${yOffset + itemHeight}
                         Z`;
              break;
              
            case 'sleep system':
              // Rolled sleeping bag with curves
              const radius = itemHeight / 2;
              itemPath = `M${xCenter - itemWidth/2} ${yOffset + radius}
                         A${radius} ${radius} 0 0 1 ${xCenter - itemWidth/2} ${yOffset - radius}
                         L${xCenter + itemWidth/2} ${yOffset - radius}
                         A${radius} ${radius} 0 0 1 ${xCenter + itemWidth/2} ${yOffset + radius}
                         L${xCenter - itemWidth/2} ${yOffset + radius}
                         Z`;
              break;
              
            case 'cooking':
              // Pot shape with handle
              itemPath = `M${xCenter - itemWidth/3} ${yOffset}
                         L${xCenter + itemWidth/3} ${yOffset}
                         L${xCenter + itemWidth/4} ${yOffset + itemHeight}
                         L${xCenter - itemWidth/4} ${yOffset + itemHeight}
                         Z
                         M${xCenter + itemWidth/3} ${yOffset + itemHeight/3}
                         L${xCenter + itemWidth/2} ${yOffset + itemHeight/3}`;
              break;
              
            default:
              // Generic rounded rectangle for other items
              itemPath = `M${xCenter - itemWidth/2} ${yOffset}
                         L${xCenter + itemWidth/2} ${yOffset}
                         L${xCenter + itemWidth/2} ${yOffset + itemHeight}
                         L${xCenter - itemWidth/2} ${yOffset + itemHeight}
                         Z`;
          }

          return (
            <g
              key={`${item.id}-${index}`}
              className="transition-opacity hover:opacity-80 cursor-pointer"
              onClick={() => {
                toast({
                  title: item.name,
                  description: `Weight: ${item.weight} | Category: ${item.category}`,
                });
              }}
            >
              <path
                d={itemPath}
                fill={getItemColor(item.category)}
                stroke="#222222"
                strokeWidth="1"
              />
              <text
                x={xCenter}
                y={yOffset + itemHeight/2}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                dominantBaseline="middle"
                className="pointer-events-none select-none"
              >
                {item.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}