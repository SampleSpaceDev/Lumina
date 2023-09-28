import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface APIContextValue {
    apiData: Record<string, any>;
    setApiData: Dispatch<SetStateAction<Record<string, any>>>;
}

export const APIContext = createContext<APIContextValue>({ apiData: {}, setApiData: () => {}});
APIContext.displayName = "APIContext";

interface APIContextProviderProps {
    children: ReactNode;
}

export function APIContextProvider(props: APIContextProviderProps) {
    const [apiData, setApiData] = useState<Record<string, any>>({});

    const value: APIContextValue = { apiData, setApiData };

    return <APIContext.Provider value={value}>{props.children}</APIContext.Provider>;
}