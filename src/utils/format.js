export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatHeight = (height) => {
  if (height === 'unknown') return 'Unknown';
  const meters = parseInt(height) / 100;
  return `${meters.toFixed(2)} m`;
};

export const formatMass = (mass) => {
  if (mass === 'unknown') return 'Unknown';
  return `${mass} kg`;
};

export const formatPopulation = (population) => {
  if (population === 'unknown') return 'Unknown';
  return parseInt(population).toLocaleString();
};
