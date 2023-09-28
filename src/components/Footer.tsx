import { ExternalLink } from "./ExternalLink";
import './Footer.css';

export function Footer() {
    return (
        <footer className="p-1 footer font-xs border">
            <span className="flex-1 h-flex align-items-center">
                Powered by the&nbsp; <ExternalLink href="https://api.hypixel.net/">Hypixel API</ExternalLink>.
            </span>
            <span className="flex-1 h-flex align-items-center justify-content-end">
                Made by&nbsp; <ExternalLink href="https://github.com/SampleSpaceDev">SampleSpace</ExternalLink>, inspired by&nbsp; <ExternalLink href="https://25karma.xyz/">25Karma</ExternalLink>.
            </span>
        </footer>
    )
}