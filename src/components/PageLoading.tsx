import { ReactNode } from "react";
import { PageLayout } from "./PageLayout";
import { APP } from "../constants";
import { HomePage } from "../pages/HomePage";
import { LoadingSpinner } from "./LoadingSpinner";
import { pushToRecentSearches } from "../utils";
import { useAPIContext } from "../hooks";

interface PageLoadingProps {
    title: (username: string) => string;
    loading: string;
    children: ReactNode;
}

export function PageLoading({ title, loading, children }: PageLoadingProps) {
    const context = useAPIContext();

    const loadingPageLayout = (
        <PageLayout
            searchbar
            center={
                <div className={"py-5"}>
                    <LoadingSpinner text={loading} />
                </div>
            }
        />
    )

    switch (context.success) {
        case true: {
            document.title = `${title(context.mojang.username)} - ${APP.documentTitle}`;
            pushToRecentSearches(context.mojang.username);
            return children || loadingPageLayout;
        }
        case false: {
            return <HomePage config={context} />;
        }
        default: {
            document.title = `Loading... - ${APP.documentTitle}`;
            return loadingPageLayout;
        }
    }
}