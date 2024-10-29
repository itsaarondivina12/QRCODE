declare module 'react-qr-code' {
    import React from 'react';
  
    interface QRCodeProps {
      value: string;
      size?: number;
      style?: React.CSSProperties;
      bgColor?: string;
      fgColor?: string;
      level?: 'L' | 'M' | 'Q' | 'H';
    }
  
    export const QRCode: React.FC<QRCodeProps>;
  }
  