import React, { useEffect, useState } from 'react';

export interface IToast {
  text: string;
  time: number;
}
export function Toast({ text, time }: IToast) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, time);

    return () => clearTimeout(timer);
  }, [time]);

  return (
    <div
    >
      {isVisible && (
        <div style={{
        }}>
          {text}
        </div>
      )}
    </div>
  );
}
