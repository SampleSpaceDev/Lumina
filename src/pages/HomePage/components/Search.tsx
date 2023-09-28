import { ComponentProps, useState } from "react";
import { PAGES } from "../../../constants";
import { MinecraftText, Button, ReactIcon, Searchbar } from "../../../components";
import React from "react";

export function Search(props: ComponentProps<any>) {
    const [searchType, setSearchType] = useState(PAGES[0]);

    return (
        <React.Fragment>
            <div className="pb-1 pl-2">
                <h1><MinecraftText size="md">{searchType.about}</MinecraftText></h1>
                <Searchbar defaultValue={props.defaultValue || ''} tag={searchType.tags[0]} />
            </div>
            <div className="py-1 h-flex overflow-x">
                {PAGES.map((type, index) =>
                    <div key={type.path} className={index ? (index + 1 === PAGES.length ? "pl-1 mr-auto" : "px-1") : "ml-auto pr-1"}>
                        <Button
                            active={searchType === type}
                            onClick={() => setSearchType(type)}
                        >
                            <div className="overflow-hidden p-1" style={{width: "7.5rem"}}>
                                <ReactIcon icon={type.icon} size="lg" />
                                <div className="pt-1">{type.name}</div>
                            </div>
                        </Button>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}