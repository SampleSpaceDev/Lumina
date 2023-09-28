import React from "react";

import { useState } from "react";
import Cookies from "js-cookie";
import { MinecraftText, Button, ReactIcon } from "../../../components";
import { Link } from "react-router-dom";
import { APP } from "../../../constants";
import { MdMoreHoriz } from "react-icons/md";

export function RecentSearches() {
    let cookie = Cookies.get("recentSearches");
    if (cookie === undefined) {
        cookie = '[]';
    }

    const array = JSON.parse(cookie);

    const [showAllRecents, setShowAllRecents] = useState(false);

    if (array === undefined || array.length === 0) {
        return (
            <div className="h-flex flex-wrap pt-2 pl-1">
                <h1 className="pt-2 pl-2">
                    <MinecraftText>First time? Try searching</MinecraftText>
                </h1>
                <div className="pl-2 py-1">
                    <Link to={`/search/${APP.suggestedPlayers[0]}`}>
                        <Button>
                            <span className="font-xs">{APP.suggestedPlayers[0]}</span>
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <h1 className="mt-4 pl-2">
                <MinecraftText>Recent Searches</MinecraftText>
            </h1>
            <div className="h-flex flex-wrap">
                {array.slice(0, showAllRecents ? array.length : 5).map((recent: string) => (
                    <div key={recent} className="pr-2 py-1">
                        <Link to={`/search/${recent}`}>
                            <Button>
                                <span className="font-xs">{recent}</span>
                            </Button>
                        </Link>
                    </div>
                ))}
                {array.length > 5 && !showAllRecents &&
                    <button onClick={() => setShowAllRecents(true)}>
                        <ReactIcon icon={MdMoreHoriz} clickable />
                    </button>
                }
            </div>
        </React.Fragment>
    )
}