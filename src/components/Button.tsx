import { ComponentProps } from "react";
import './Button.css';

export function Button(props: ComponentProps<any>) {
    const classes = [
        "btn py-1 px-2",
        `btn-${props.active ? "active" : "inactive"}`,
        `btn-${props.type || 'default'}`
    ]

    return (
        <button
            className={classes.join(" ")}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}