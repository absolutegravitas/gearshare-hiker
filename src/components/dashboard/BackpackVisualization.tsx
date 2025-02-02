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
      {/* Backpack outline */}
      <svg
        viewBox="0 0 300 400"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
      >
        {/* Main backpack body */}
        <path
          d="M50 100 L250 100 L270 350 L30 350 Z"
          fill="#403E43"
          stroke="#222222"
          strokeWidth="2"
        />
        {/* Top lid */}
        <path
          d="M40 100 C40 60 260 60 260 100"
          fill="#403E43"
          stroke="#222222"
          strokeWidth="2"
        />
        
        {/* Render gear items */}
        {items.map((item, index) => {
          const yOffset = 120 + (index * 50); // Stack items vertically
          const itemWidth = 200;
          const itemHeight = 40;
          
          // Different SVG shapes based on item category
          let itemPath = '';
          switch (item.category.toLowerCase()) {
            case 'shelter':
              // Triangular shape for tent
              itemPath = `M${150 - itemWidth/2} ${yOffset + itemHeight} 
                         L${150} ${yOffset} 
                         L${150 + itemWidth/2} ${yOffset + itemHeight}`;
              break;
            case 'sleep system':
              // Rolled shape for sleeping bag/mat
              itemPath = `M${150 - itemWidth/2} ${yOffset} 
                         Q${150} ${yOffset - 20} ${150 + itemWidth/2} ${yOffset}`;
              break;
            case 'cooking':
              // Pot-like shape for cook kit
              itemPath = `M${150 - itemWidth/3} ${yOffset} 
                         L${150 + itemWidth/3} ${yOffset} 
                         L${150 + itemWidth/4} ${yOffset + itemHeight} 
                         L${150 - itemWidth/4} ${yOffset + itemHeight}`;
              break;
            default:
              // Rectangle for other items
              itemPath = `M${150 - itemWidth/2} ${yOffset} 
                         L${150 + itemWidth/2} ${yOffset} 
                         L${150 + itemWidth/2} ${yOffset + itemHeight} 
                         L${150 - itemWidth/2} ${yOffset + itemHeight}`;
          }

          return (
            <g
              key={item.id}
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
                x="150"
                y={yOffset + itemHeight/2}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                className="pointer-events-none"
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