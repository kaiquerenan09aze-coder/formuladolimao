import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface BMIChartProps {
  bmi: number;
}

const BMIChart = ({ bmi }: BMIChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 280, height: 140 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = Math.min(containerRef.current.offsetWidth, 300);
        setDimensions({ width: w, height: w * 0.53 });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;
    const radius = Math.min(width, height * 2) / 2;

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height})`);

    const arc = d3.arc<{ start: number; end: number; color: string }>()
      .innerRadius(radius - 25)
      .outerRadius(radius)
      .startAngle((d) => d.start)
      .endAngle((d) => d.end);

    const segments = [
      { start: -Math.PI / 2, end: -Math.PI / 4, color: "#3b82f6" },
      { start: -Math.PI / 4, end: 0, color: "#22c55e" },
      { start: 0, end: Math.PI / 4, color: "#eab308" },
      { start: Math.PI / 4, end: Math.PI / 2, color: "#ef4444" }
    ];

    g.selectAll("path")
      .data(segments)
      .enter()
      .append("path")
      .attr("d", arc as any)
      .attr("fill", d => d.color);

    const needleScale = d3.scaleLinear()
      .domain([15, 40])
      .range([-Math.PI / 2, Math.PI / 2])
      .clamp(true);

    const angle = needleScale(bmi);

    g.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", Math.cos(angle - Math.PI / 2) * (radius - 10))
      .attr("y2", Math.sin(angle - Math.PI / 2) * (radius - 10))
      .attr("stroke", "hsl(150, 40%, 25%)")
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round");

    g.append("circle")
      .attr("r", 6)
      .attr("fill", "hsl(150, 40%, 25%)");

  }, [bmi, dimensions]);

  const getBMICategory = (value: number) => {
    if (value < 18.5) return { label: 'Abaixo do peso', color: 'text-blue-500' };
    if (value < 25) return { label: 'Normal', color: 'text-primary' };
    if (value < 30) return { label: 'Sobrepeso', color: 'text-gold-dark' };
    return { label: 'Obesidade', color: 'text-destructive' };
  };

  const category = getBMICategory(bmi);

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full">
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height + 10}></svg>
      <div className="text-3xl sm:text-4xl font-bold text-primary mt-2">{bmi.toFixed(1)}</div>
      <div className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${category.color}`}>
        {category.label}
      </div>
    </div>
  );
};

export default BMIChart;
