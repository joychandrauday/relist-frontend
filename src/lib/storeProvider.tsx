'use client'
import LoadingPage from '@/app/loading';
import { AppStore, makeStore } from '@/redux/store';
import React, { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<AppStore>(undefined)
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }
    const persistedStore = persistStore(storeRef.current)
    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={<LoadingPage />} persistor={persistedStore}>
                {children}
            </PersistGate>
        </Provider >
    );
}

export default StoreProvider;
