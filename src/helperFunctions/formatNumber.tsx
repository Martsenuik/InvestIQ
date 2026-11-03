

export const formatNumber = (value: number | string): string => {
  if (!value && value !== 0) return '';
  const rawValue = String(value).replace(/\D/g, '');
  if (!rawValue) return '';
  return Number(rawValue).toLocaleString('uk-UA');
};

