"use client";

import React, { Suspense } from 'react';
import { GraphsPage } from '../../src/components/pages/DataVisualizations/GraphsPage.jsx';
import { Loading } from '../../src/components/common/Loading.jsx';

export default function GraphsRoute() {
  return (
    <Suspense fallback={<Loading />}>
      <GraphsPage />
    </Suspense>
  );
}
