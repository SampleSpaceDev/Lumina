import { Redirect, useParams } from "react-router-dom";
import { ComponentProps } from "react";
import { PAGES } from "../../constants";

export function SearchPage(props: ComponentProps<any>) {
    const { slug } = useParams<{ slug: string }>();

    const inputValues = slug
        .replace(/\s+/g, " ")
        .trim()
        .split(" ", 2);

    const player = inputValues[0];
    const tag = inputValues[1] && inputValues[1].toLowerCase();

    if (player !== "") {
        for (const {tags, path} of PAGES) {
            if (tags.includes(tag)) {
                return <Redirect to={`${path}/${player}`} />
            }
        }
    } else {
        return <Redirect to="/" />
    }
}