import * as d3 from 'd3';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React, { useRef, useEffect, useState } from 'react';

interface JapanMapD3Props {
  onSelect: (prefecture: string) => void;
  highlightColors: { [key: string]: string };
  hintRegionPrefectures: string[];
}

export const JapanMapD3: React.FC<JapanMapD3Props> = ({
  onSelect,
  highlightColors,
  hintRegionPrefectures,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        const newWidth = containerRef.current?.offsetWidth || 0;
        const newHeight = newWidth * (600 / 600);
        setDimensions({ width: newWidth, height: newHeight });
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);

      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const svg = d3.select(svgRef.current as SVGSVGElement);

    svg.selectAll('*').remove();

    const g = svg.append('g');

    const projection = d3
      .geoMercator()
      .center([137.0, 38.0])
      .scale(dimensions.width * 2.5)
      .translate([dimensions.width / 2, dimensions.height / 2]);

    const path = d3.geoPath().projection(projection) as any;

    d3.json('/japan.json').then((data: any) => {
      const geojson = data as FeatureCollection<Geometry, GeoJsonProperties>;
      const prefectures = geojson.features;

      g.attr('class', 'prefectures')
        .selectAll('path')
        .data(prefectures)
        .enter()
        .append('path')
        .attr('d', path as any)
        .attr('fill', (d: { properties: GeoJsonProperties }) => {
          const prefectureName = d.properties?.name_ja as string;
          if (prefectureName && highlightColors[prefectureName]) {
            return highlightColors[prefectureName];
          }
          if (
            prefectureName &&
            hintRegionPrefectures.includes(prefectureName)
          ) {
            return 'rgba(255, 0, 0, 0.3)';
          }
          return '#ccc';
        })
        .attr('stroke', '#fff')
        .on('click', (_e, d: { properties: GeoJsonProperties }) => {
          const prefectureName = d.properties?.name_ja as string;
          if (prefectureName) {
            onSelect(prefectureName);
          }
        });
    });

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });

    svg.call(zoom);
  }, [dimensions, highlightColors, onSelect]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: 'auto' }}>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
      ></svg>
    </div>
  );
};
