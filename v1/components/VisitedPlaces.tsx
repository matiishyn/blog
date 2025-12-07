"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import Typography from "./Typography";

// Using EUROCONTROL world map data that correctly shows Crimea as part of Ukraine
// Source: https://github.com/euctrl-pru/eurocontrol_world_map
const geoUrl = "https://raw.githubusercontent.com/euctrl-pru/eurocontrol_world_map/refs/heads/main/alternatives.geo.json";

// Country visit data
const visitData: { [key: string]: number } = {
  Ukraine: 100,
  Poland: 80,
  "United States": 1,
  Italy: 3,
  Turkey: 2,
  Spain: 4,
  "Dominican Republic": 1,
  Greece: 3,
  Cyprus: 1,
  Portugal: 1,
  Germany: 3,
  Austria: 2,
  Croatia: 1,
  France: 1,
  "United Kingdom": 1,
  Sweden: 3,
  Israel: 1,
  Russia: 1,
  Belarus: 1,
  Egypt: 1,
  Hungary: 1,
  "Czech Republic": 2,
  Malta: 1,
  "United Arab Emirates": 1,
  Slovakia: 1,
  Slovenia: 1,
};

// Map country names to ISO A3 codes (used by the GeoJSON) and alternate names
// Note: Some map data sources incorrectly show Crimea separately.
// We treat any Crimea entries as part of Ukraine (correct sovereignty).
const countryNameToCode: { [key: string]: string[] } = {
  Ukraine: ["UKR", "Crimea", "Ukraine", "804"],
  Poland: ["POL", "Poland", "616"],
  "United States": ["USA", "United States", "United States of America", "840"],
  Italy: ["ITA", "Italy", "380"],
  Turkey: ["TUR", "Turkey", "792"],
  Spain: ["ESP", "Spain", "724"],
  "Dominican Republic": ["DOM", "Dominican Republic", "Dominican Rep.", "214"],
  Greece: ["GRC", "Greece", "300"],
  Cyprus: ["CYP", "Cyprus", "196"],
  Portugal: ["PRT", "Portugal", "620"],
  Germany: ["DEU", "Germany", "276"],
  Austria: ["AUT", "Austria", "040"],
  Croatia: ["HRV", "Croatia", "191"],
  France: ["FRA", "France", "250"],
  "United Kingdom": ["GBR", "United Kingdom", "UK", "Great Britain", "826"],
  Sweden: ["SWE", "Sweden", "752"],
  Israel: ["ISR", "Israel", "376"],
  Russia: ["RUS", "Russia", "Russian Federation", "643"],
  Belarus: ["BLR", "Belarus", "Belarussia", "112"],
  Egypt: ["EGY", "Egypt", "818"],
  Hungary: ["HUN", "Hungary", "348"],
  "Czech Republic": ["CZE", "Czech Republic", "Czechia", "203"],
  Malta: ["MLT", "Malta", "470"],
  "United Arab Emirates": ["ARE", "United Arab Emirates", "UAE", "784"],
  Slovakia: ["SVK", "Slovakia", "703"],
  Slovenia: ["SVN", "Slovenia", "705"],
};

export default function VisitedPlaces() {
  // Function to get visit count for a country
  const getVisitCount = (geoName: string, geoId: string): number | null => {
    for (const [countryName, codes] of Object.entries(countryNameToCode)) {
      const nameMatches = geoName === countryName ||
        geoName.toLowerCase() === countryName.toLowerCase();
      const codeMatches = codes.includes(geoId) ||
        codes.includes(geoName) ||
        codes.some(code => geoId?.toString() === code);

      if (nameMatches || codeMatches) {
        return visitData[countryName];
      }
    }
    return null;
  };

  // Function to get color based on visit count
  const getCountryColor = (geoName: string, geoId: string, geoProperties: any) => {
    // Find if this country has been visited
    for (const [countryName, codes] of Object.entries(countryNameToCode)) {
      // Check if the country matches by name or code
      const nameMatches = geoName === countryName ||
        geoName.toLowerCase() === countryName.toLowerCase();
      const codeMatches = codes.includes(geoId) ||
        codes.includes(geoName) ||
        codes.some(code => geoId?.toString() === code);

      if (nameMatches || codeMatches) {
        const visits = visitData[countryName];

        // Calculate color intensity based on visits
        // More visits = darker shade of accent color
        if (visits >= 5) {
          return "#d97566"; // Darker shade for 50+ visits
        } else if (visits >= 3) {
          return "#e68474"; // Medium-dark shade for 10-49 visits
        } else if (visits >= 1) {
          return "#f08e80"; // Base accent color for 1-9 visits
        }
      }
    }

    // Unvisited country - use foreground color (muted)
    return "#505050";
  };

  return (
    <section id="visited-places" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Typography variant="h2" className="mb-8">
        Visited Places
      </Typography>

      <div className="bg-background rounded-lg p-4 border border-foreground/10">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 250,
            center: [-20, 30], // Centered to show whole world
          }}
          className="w-full h-auto"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo) => {
                // This GeoJSON uses 'id' for ISO codes (like "UKR", "POL", etc.)
                const geoId = geo.id || geo.properties?.adm0_a3;

                // Get the country name by matching the geoId with our mapping
                let displayName = "";
                let visitCount = null;

                for (const [countryName, codes] of Object.entries(countryNameToCode)) {
                  if (codes.includes(geoId)) {
                    displayName = countryName;
                    visitCount = visitData[countryName];
                    break;
                  }
                }

                // Fallback to geoId if no match found
                if (!displayName) {
                  displayName = geoId || "Unknown";
                }

                // Create tooltip content - just show country name
                const tooltipContent = displayName;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getCountryColor(displayName, geoId?.toString(), geo.properties)}
                    stroke="#fff6ef"
                    strokeWidth={0.5}
                    data-tooltip-id="country-tooltip"
                    data-tooltip-content={tooltipContent}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        outline: "none",
                        fill: "#f08e80",
                        opacity: 0.8,
                        cursor: "pointer",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        <Tooltip
          id="country-tooltip"
          style={{
            backgroundColor: "var(--heading)",
            color: "var(--background)",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "14px",
            zIndex: 1000,
          }}
        />
      </div>
    </section>
  );
}

