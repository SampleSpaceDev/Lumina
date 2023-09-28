import { ComponentProps, useRef } from "react";
import { useAppContext, useTooltip } from "../hooks";
import Cookies from "js-cookie";
import { MinecraftText } from "./MinecraftText";
import { HorizontalLine } from "./HorizontalLine";
import { APP } from "../constants";
import { Button } from "./Button";
import { ExternalLink } from "./ExternalLink";
import { Br } from "./Br";
import { Checkbox } from "./Checkbox";
import './Settings.css';

export function Settings(props: ComponentProps<any>) {
    const pinnedPlayerInput = useRef<HTMLInputElement>(null);
    const decimalInput = useRef<HTMLInputElement>(null);
    const hideCompleteAchievementsInput = useRef<HTMLInputElement>(null);
    const { setBanner } = useAppContext();

    useTooltip();

    function setCookies() {
        const decimalString = parseDecimalInput(decimalInput.current?.value);
        if (decimalString === false) {
            setBanner({
                style: 'error',
                title: <span>Invalid value</span>,
                description: '"Decimal Places" must be an integer between 0 and 8.',
                expire: true
            });
            return;
        }

        Cookies.set("pinnedPlayer", pinnedPlayerInput.current?.value ?? "", { expires: 365 });
        Cookies.set("decimalPlaces", decimalString, { expires: 365 });
        Cookies.set("hideCompleteAchievements", hideCompleteAchievementsInput.current?.checked ? "true" : "false", { expires: 365 });
        props.toggle();
    }

    function clearCookies() {
        Cookies.remove("pinnedPlayer");
        Cookies.remove("decimalPlaces");
        Cookies.remove("hideCompleteAchievements");

        setBanner({
            style: 'info',
            title: <span>Cookies cleared</span>,
            description: 'Reload the page or click Save to undo.',
            expire: true
        });
    }

    function parseDecimalInput(str?: string): string | false {
        if (str === undefined) {
            return false;
        }

        try {
            parseInt(str);
        } catch (e) {
            return false;
        }

        const num = parseInt(str);
        if (isNaN(num) || num < 0 || num > 8) {
            return false;
        }

        return num.toString();
    }

    return (
        <div className="settings py-2">
            <div className="container v-flex">
                <MinecraftText className="mb-2">Settings</MinecraftText>
                <HorizontalLine className="mb-3" />
                <section>
                    <div className="flex-2">
                        <div className="font-bold">Pinned Player</div>
                        <div className="c-gray">The player that should load by default when you visit this site.</div>
                    </div>
                    <div className="flex-1">
                        <input
                            ref={pinnedPlayerInput}
                            style={{width: '13rem'}}
                            type="text"
                            placeholder={`eg. ${APP.suggestedPlayers[1]}`}
                            defaultValue={Cookies.get("pinnedPlayer")} />
                    </div>
                </section>
                <Br/>
                <section>
                    <div className="flex-2">
                        <div className="font-bold">Decimal Places</div>
                        <div className="c-gray">The number of decimal places to show for stats.</div>
                    </div>
                    <div className="flex-1">
                        <input
                            ref={decimalInput}
                            style={{width: '13rem'}}
                            type="text"
                            placeholder="eg. 2"
                            defaultValue={Cookies.get("decimalPlaces")} />
                    </div>
                </section>
                <Br/>
                <section>
                    <div className="flex-2">
                        <div className="font-bold">Hide Complete Achievements</div>
                        <div className="c-gray">Hide achievements that have been completed.</div>
                    </div>
                    <div className="flex-1">
                        <Checkbox
                            ref={hideCompleteAchievementsInput}
                            defaultChecked={Cookies.get("hideCompleteAchievements") === "true" || false} />
                    </div>
                </section>
                <Br/>
                <div className="h-flex justify-content-center align-items-center">
                    <Button onClick={setCookies}><span className="font-bold">Save Settings</span></Button>
                </div>
                <HorizontalLine className="my-3" />
                <section>
                    <div className="flex-3 c-gray">
                        Your settings and preferences are stored as <ExternalLink href="https://www.whatarecookies.com/">
                        cookies</ExternalLink> on your computer. They are accessible to you and to you only.
                        You can clear the cookies used by this site at any time by clicking the Clear Cookies button.
                    </div>
                    <div className="flex-1 text-right">
                        <Button type="error" onClick={clearCookies}>
                            <span className="font-bold">Clear Cookies</span>
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    )
}