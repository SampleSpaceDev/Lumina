import { ComponentProps } from "react";

export function ExternalLink(props: ComponentProps<any>) {
    let { href } = props;
    if (!href.startsWith('http')) {
        href = 'https://' + href;
    }

    return <a className="link" target="_blank" rel="noopener noreferrer" href={href}>
        {props.children}
    </a>
}