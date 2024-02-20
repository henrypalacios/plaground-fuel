import { FuelProvider } from '@fuel-wallet/react';
import { IS_DEVELOPMENT } from '@/constant';
import { PropsWithChildren } from 'react';
import { NetworkConnectionProvider } from './NetworkConnectionContext';

export function NetworkConnectionConfig({children}: PropsWithChildren) {
    return (
        <FuelProvider 
            fuelConfig={{
                devMode: IS_DEVELOPMENT,
              }}
        >
            <NetworkConnectionProvider>
                {children}
            </NetworkConnectionProvider>
        </FuelProvider>
    )
}