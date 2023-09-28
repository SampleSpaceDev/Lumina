import { useEffect } from "react";
import ReactTooltip from "react-tooltip";

export function useTooltip(dependencies?: any[]) {
    useEffect(() => {
        ReactTooltip.rebuild();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
}