

export function sampleStandardDeviation(year2022 : number, year2023 : number, year2024 : number) {
    const values = [year2022, year2023, year2024];
    
    const mean = (year2022 + year2023 + year2024) / 3;
    const squaredDiffs = values.map(val => (val - mean) ** 2);
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / 2;
    return Math.sqrt(variance);
}


export function classifyDemand(cv : number) {
    if (cv < 0.2) {
      return "Stable";
    } else if (cv < 0.5) {
      return "Moderately Variable";
    } else {
      return "Highly Variable";
    }
  }

  export function calculateSafetyStock(stdev : number) {
    const z = 1.645;     // L3: service level (Z-score for ~95%)
    const leadTime = 14; // K3: lead time in days
    return z * stdev * Math.sqrt(leadTime / 365);
  }
  