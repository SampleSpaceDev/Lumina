import React, { ComponentProps, ReactElement, useState } from "react";

export const AppContext = React.createContext<AppContextType>({
    banner: {
        description: "", expire: false, style: "", title: <span></span>
    },
    setBanner: () => {}
});
AppContext.displayName = 'AppContext';

export type Banner = {
    style: string,
    title: ReactElement<any, any>,
    description: string,
    expire: boolean,
    copyable?: boolean
}

export type AppContextType = {
    banner: Banner;
    setBanner: (banner: Banner) => void;
}

export function AppContextProvider(props: ComponentProps<any>) {
    const [banner, setBanner] = useState<Banner>({description: "", expire: false, style: "", title: <span></span> });
    const value: AppContextType = { banner, setBanner };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}