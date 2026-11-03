import { useState, useEffect } from 'react';

export const useCurrencyInput = (initialValue: number | string, setAmount: (val: number) => void) => {
  const [displayValue, setDisplayValue] = useState(
    initialValue ? Number(initialValue).toLocaleString('uk-UA') : ''
  );


  useEffect(() => {
    if (initialValue === '' || initialValue === 0) {
      setDisplayValue('');
    } else {
      setDisplayValue(Number(initialValue).toLocaleString('uk-UA'));
    }
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const rawValue = e.target.value.replace(/\D/g, '');

    if (!rawValue) {
      setDisplayValue('');
      setAmount(0);
      return;
    }


    const formattedNumber = Number(rawValue).toLocaleString('uk-UA');

    setDisplayValue(formattedNumber);
    setAmount(Number(rawValue)); 
  };

  return { displayValue, handleChange };
};