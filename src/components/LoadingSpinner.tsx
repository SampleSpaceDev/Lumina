import { ComponentProps } from "react";
import ReactLoading from "react-loading";

export function LoadingSpinner(props: ComponentProps<any>) {
    return (
        <div className={`v-flex align-items-center ${props.className}`}>
            <div className="mb-2">
                <ReactLoading type="spin" height="5rem" width="5rem" />
            </div>
            <p className="font-md">{props.text}...</p>
        </div>
    )
}