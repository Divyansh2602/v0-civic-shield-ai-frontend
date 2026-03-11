'use client';

import { useEffect, useRef } from 'react';

interface RiskGaugeProps {
  value: number;
  size?: number;
}

export function RiskGauge({ value = 34, size = 240 }: RiskGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getRiskColor = (val: number) => {
    if (val < 30) return '#00f5a0'; // Green
    if (val < 60) return '#fbbf24'; // Amber
    return '#ff3366'; // Red
  };

  const getRiskLevel = (val: number) => {
    if (val < 30) return 'Low';
    if (val < 60) return 'Medium';
    return 'High';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw gauge arc (background)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Draw value arc
    const angle = Math.PI + (Math.PI * value) / 100;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, angle);
    ctx.strokeStyle = getRiskColor(value);
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Add glow effect
    ctx.shadowColor = getRiskColor(value);
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 4, Math.PI, angle);
    ctx.strokeStyle = getRiskColor(value);
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw center circle
    ctx.fillStyle = 'rgba(10, 14, 39, 0.9)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 30, 0, Math.PI * 2);
    ctx.fill();

    // Draw value text
    ctx.fillStyle = getRiskColor(value);
    ctx.font = `bold ${size / 4}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(value.toString(), centerX, centerY - 10);

    // Draw level text
    ctx.fillStyle = 'rgba(240, 244, 248, 0.8)';
    ctx.font = `14px sans-serif`;
    ctx.fillText(getRiskLevel(value), centerX, centerY + 20);
  }, [value, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="mx-auto"
    />
  );
}
