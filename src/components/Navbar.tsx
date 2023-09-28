import React, { ComponentProps } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { ReactIcon } from "./ReactIcon";
import { GoPin } from "react-icons/go";
import { MinecraftText } from "./MinecraftText";
import { APP } from "../constants";
import { Searchbar } from "./Searchbar";
import { MdSettings } from "react-icons/md";
import { Collapsible, Provided } from "./Collapsible";
import { Settings } from "./Settings";

export function Navbar(props: ComponentProps<any>) {
    function renderPinnedPlayerButton() {
        const player = Cookies.get("pinnedPlayer");
        if (player) {
            return (
                <Link className="font-md" to={`/search/${player}`}>
                    <ReactIcon icon={GoPin} clickable />
                </Link>
            )
        }

        return null;
    }

    return (
        <Collapsible>
            {(provided: Provided) => (
                <React.Fragment>
                    <div className="h-flex">
                        <div className="flex-1 h-flex align-items-center">
                            <Link className="text-shadow nowrap p-2" to="/home">
                                <MinecraftText font="md">
                                    {`\u00a7b${APP.appName}`}
                                </MinecraftText>
                            </Link>
                        </div>
                        <div className={`flex-1 py-1 flex-3 ${props.searchbar || 'hidden'}`}>
                            <Searchbar />
                        </div>
                        <div className="flex-1 h-flex justify-content-end align-items-center">
                            <p className="p-2">
                                {renderPinnedPlayerButton()}
                                <button className="ml-2" {...provided.collapseButtonProps}>
                                    <ReactIcon icon={MdSettings} clickable />
                                </button>
                            </p>
                        </div>
                    </div>
                    <div {...provided.collapsibleProps}>
                        <Settings toggle={provided.collapseButtonProps.onClick} />
                    </div>
                </React.Fragment>
            )}
        </Collapsible>
    )
}