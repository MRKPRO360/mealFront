'use client';

import { AppStore, makeStore } from '@/redux/store';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';

function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
