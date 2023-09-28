import { CSSProperties, ReactElement, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { MdClose, MdContentCopy, MdInfoOutline, MdReport } from "react-icons/md";
import * as Utils from '../utils';
import { useLocation } from "react-router-dom";
import { ReactIcon } from "./ReactIcon";
import { useAppContext, useTooltip } from "../hooks";
import './Banner.css';

export function Banner(): ReactElement {
    const { banner } = useAppContext();
    const [bannerVisibility, setBannerVisibility] = useState('hidden');
    const bannerStyle = getStyle(banner?.style);

    const styleStates: { [key: string]: CSSProperties } = {
        hidden: { transform: 'translateY(100%)' },
        shown: { transform: 'translateY(0)' }
    }

    useTooltip([banner]);

    function getStyle(style: string) {
        const bannerStyles: { [key: string]: { icon: IconType, color: string } } = {
            info: { icon: MdInfoOutline, color: '#5555ff' },
            error: { icon: MdReport, color: '#ff5555' }
        }
        if (style === undefined) {
            return bannerStyles.info;
        }
        return bannerStyles[style];
    }

    const willExpire = banner.expire || false;
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (!Utils.isEmpty(banner)) {
            setBannerVisibility('shown');
        }
        if (willExpire) {
            timeoutId = setTimeout(close, 5000);
        }
        return () => {
            clearTimeout(timeoutId);
        }
    }, [banner, willExpire]);

    const location = useLocation();
    useEffect(close, [location.pathname]);

    function close() {
        setBannerVisibility('hidden');
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(banner.title.key as string);
    }

    return !Utils.isEmpty(banner) ? (
        <div className="banner-wrapper" style={styleStates[bannerVisibility]}>
            <div className="container v-flex align-items-center">
                <div className="banner mb-4 p-2" style={{backgroundColor: bannerStyle?.color ?? '#ff5555'}}>
                    <span>
                        <ReactIcon icon={bannerStyle?.icon ?? null} />
                    </span>
                    <span className="px-2">
                        {banner.title &&
                            <span className="font-bold">{banner.title}</span>
                        }
                        <span>{banner.description}</span>
                    </span>
                    {banner.copyable &&
                        <button onClick={copyToClipboard} className="pr-1" data-tip="Copy to clipboard">
                            <ReactIcon icon={MdContentCopy} clickable />
                        </button>
                    }
                    <button onClick={close}>
                        <ReactIcon icon={MdClose} clickable />
                    </button>
                </div>
            </div>
        </div>
    ) : <></>;
}