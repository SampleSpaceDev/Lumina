import { ComponentProps, HTMLProps, ReactNode, useEffect, useRef, useState } from "react";

export type Provided = {
    collapsibleProps: ComponentProps<any>,
    collapseButtonProps: ComponentProps<any>,
    isCollapsed: boolean
}

interface CollapsibleProps {
    children: (provided: {
        collapsibleProps: HTMLProps<HTMLDivElement>;
        collapseButtonProps: HTMLProps<HTMLButtonElement>;
        isCollapsed: boolean;
    }) => ReactNode;
}


export function Collapsible(props: CollapsibleProps) {
    const [isCollapsed, setCollapsed] = useState(true);
    const [collapsibleHeight, setCollapsibleHeight] = useState<string | number>(0);
    const [duration, setDuration] = useState(0);
    const collapsibleRef = useRef<HTMLDivElement | null>(null);

    const provided = {
        collapsibleProps: {
            ref: collapsibleRef,
            style: {
                maxHeight: collapsibleHeight,
                overflow: 'hidden',
                transition: `max-height ${duration}ms`,
                display: 'none'
            }
        },
        collapseButtonProps: {
            onClick: toggleCollapsed
        },
        isCollapsed: isCollapsed
    }

    function toggleCollapsed() {
        if (collapsibleRef.current) {
            collapsibleRef.current.style.display = 'block';
            setCollapsibleHeight(collapsibleRef.current.scrollHeight + 'px');
            setDuration(collapsibleRef.current.scrollHeight / 2 + 300);
        }
    }

    useEffect(() => {
        if (collapsibleHeight !== 0 && collapsibleHeight !== 'none') {
            if (isCollapsed) {
                setTimeout(() => {
                    setCollapsibleHeight('none');
                }, duration);
            }
            else {
                setTimeout(() => {
                    if (collapsibleRef.current) {
                        collapsibleRef.current.style.display = 'none';
                    }
                }, duration);
                setCollapsibleHeight(0);
            }
            setCollapsed(!isCollapsed);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collapsibleHeight]);

    return <div>{props.children(provided)}</div>;
}