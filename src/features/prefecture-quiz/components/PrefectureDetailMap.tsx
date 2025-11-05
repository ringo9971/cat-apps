import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Municipality } from 'types/prefecture-quiz/Municipality';

interface PrefectureDetailMapProps {
  prefectureName: string;
  municipalities: Municipality[];
  selectedMunicipality: Municipality | null;
  onMunicipalityClick?: (municipality: Municipality) => void;
}

export const PrefectureDetailMap: React.FC<PrefectureDetailMapProps> = ({
  prefectureName,
  municipalities,
  selectedMunicipality,
  onMunicipalityClick,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [prefectureGeoJson, setPrefectureGeoJson] = useState<FeatureCollection<
    Geometry,
    GeoJsonProperties
  > | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        const newWidth = containerRef.current?.offsetWidth || 0;
        const newHeight = newWidth * (600 / 800); // Adjust aspect ratio for prefecture map
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
    if (!prefectureName) return;

    const fetchPrefectureGeoJson = async () => {
      try {
        const response = await fetch('/japan.json');
        if (!response.ok) {
          throw new Error(
            `Failed to fetch GeoJSON for Japan: ${response.statusText}`
          );
        }
        const allGeoJson = await response.json();
        const prefectureFeature = allGeoJson.features.find(
          (f: any) => f.properties.name_ja === prefectureName
        );

        if (prefectureFeature) {
          setPrefectureGeoJson({
            type: 'FeatureCollection',
            features: [prefectureFeature],
          });
        } else {
          setPrefectureGeoJson(null);
        }
      } catch (error) {
        console.error('Error fetching or filtering prefecture GeoJSON:', error);
        setPrefectureGeoJson(null);
      }
    };

    fetchPrefectureGeoJson();
  }, [prefectureName]);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0 || !prefectureGeoJson)
      return;

    const svg = d3.select(svgRef.current as SVGSVGElement);
    svg.selectAll('*').remove();

    const g = svg.append('g');

    const projection: d3.GeoProjection = d3.geoMercator();
    const path = d3.geoPath().projection(projection);

    projection.fitExtent(
      [
        [20, 20],
        [dimensions.width - 20, dimensions.height - 20],
      ], // 20pxのパディング
      prefectureGeoJson
    );

    // Draw prefecture boundary
    g.append('path')
      .datum(prefectureGeoJson)
      .attr('d', path as any)
      .attr('fill', '#e0e0e0')
      .attr('stroke', '#333')
      .attr('stroke-width', 0.5);

    // Plot municipalities
    g.selectAll('.municipality-dot')
      .data(municipalities)
      .enter()
      .append('circle')
      .attr('class', 'municipality-dot')
      .attr('cx', (d) => {
        if (d.longitude !== undefined && d.latitude !== undefined) {
          const coords: [number, number] = [d.longitude, d.latitude];
          return projection(coords)?.[0] || 0;
        }
        return 0;
      })
      .attr('cy', (d) => {
        if (d.longitude !== undefined && d.latitude !== undefined) {
          const coords: [number, number] = [d.longitude, d.latitude];
          return projection(coords)?.[1] || 0;
        }
        return 0;
      })
      .attr('r', (d) =>
        selectedMunicipality && d.code === selectedMunicipality.code ? 4 : 2
      ) // Radius of the dot
      .attr('fill', (d) =>
        selectedMunicipality && d.code === selectedMunicipality.code
          ? 'red'
          : 'blue'
      )
      .attr('stroke', 'white')
      .attr('stroke-width', 0.5)
      .on('click', (_, d) => {
        if (onMunicipalityClick) {
          onMunicipalityClick(d);
        }
      })
      .append('title') // Tooltip for municipality name
      .text((d) => d.name);

    // Add zoom and pan functionality
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 8]) // Allow zooming out a bit and zooming in more
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });

    svg.call(zoom);
  }, [dimensions, prefectureGeoJson, municipalities, selectedMunicipality]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: 'auto' }}>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ border: '1px solid #ccc' }}
      ></svg>
    </div>
  );
};
