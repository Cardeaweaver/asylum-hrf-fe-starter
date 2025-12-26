"use client";

import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('./PlotFactory'), { ssr: false });
export default Plot;
