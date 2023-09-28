import React from "react";

import { ComponentProps, useEffect, useMemo } from "react";
import { APP } from "../../constants";
import { MinecraftText, PageLayout } from "../../components";
import { RecentSearches, Search } from "./components";
import { useAppContext } from "../../hooks";

export function HomePage(props: ComponentProps<any>) {
    const config = useMemo(() => props.config || {}, [props.config]);
    document.title = `Hypixel Achievements - ${APP.documentTitle}`;

    const { setBanner } = useAppContext();
    useEffect(() => {
        switch (config.reason) {
            // TODO: Add reasons
        }
    }, [config, setBanner]);

    return (
        <PageLayout
            top={
                <h1 className="text-shadow">
                    <MinecraftText size="xxl">
                        {`\u00a7b${APP.appName}`}
                    </MinecraftText>
                </h1>
            }
            center={
                <React.Fragment>
                    <Search defaultValue={config.slug} />
                    <RecentSearches />
                </React.Fragment>
            }
        />
    )
}