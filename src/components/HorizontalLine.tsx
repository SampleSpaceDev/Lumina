import { ComponentProps } from "react";

export function HorizontalLine(props: ComponentProps<any>) {
    const { className } = props;
    return <div className={`w-100 ${className}`} style={{ borderBottom : '1px solid var(--theme-border)'}}></div>
}