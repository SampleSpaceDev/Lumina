import React, { ComponentProps, useEffect, useRef, KeyboardEvent as ReactKeyboardEvent } from "react";
import { MdSearch } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { ReactIcon } from "./ReactIcon";
import { useAppContext } from "../hooks";
import './Searchbar.css'

export function Searchbar(props: ComponentProps<any>) {

    const refInput = useRef<HTMLInputElement>(null);
    const history = useHistory();
    const { setBanner } = useAppContext();

    useEffect(() => {
        function keyDownListener(event: KeyboardEvent) {
            if (document.activeElement?.nodeName === "INPUT") {
                return;
            }

            if (event.ctrlKey) {
                return;
            }

            const x = event.key.length === 1 && event.key.charCodeAt(0);

            if (x === 47) {
                // setTimeout(() => { refInput.current.focus() }, 10);
            }
            else if ((x >= 48 && x <= 57) || (x >= 65 && x <= 90) || (x >= 97 && x <= 122)) {
                setBanner({
                    description: "",
                    style: 'info',
                    title: <span> Press <kbd>/</kbd> to jump to the search bar</span>,
                    expire: true
                });
            }
        }

        document.addEventListener("keydown", keyDownListener);
        return () => document.removeEventListener("keydown", keyDownListener);
    }, [setBanner]);

    function handleKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            search();
        }
    }

    function search() {
        if (refInput.current === null) {
            return;
        }

        const slug= refInput.current.value.trim();
        if (slug !== '') {
            refInput.current.value = '';

            let query;
            if (props.tag) {
                query = encodeURIComponent(`${slug} ${props.tag}`);
            } else {
                query = encodeURIComponent(slug);
            }

            history.push(`/search/${query}`);
        }
    }

    return (
        <div className="py-1 px-2 input">
            <input
                ref={refInput}
                type="text"
                onKeyDown={handleKeyDown}
                defaultValue={props.defaultValue}
                autoFocus
                spellCheck={false}
            />
            <button onClick={search}>
                <ReactIcon icon={MdSearch} clickable />
            </button>
        </div>
    )
}