import React from "react";

import { ComponentProps } from "react";
import ReactTooltip from 'react-tooltip';
import './PageLayout.css';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Banner } from "./Banner";

export function PageLayout(props: ComponentProps<any>) {
    return (
        <React.Fragment>
            <Navbar searchbar={props.searchbar} />
            {props.top &&
                <div className="h-flex justify-content-center pt-4 pb-2">
                    {props.top}
                </div>
            }
            <div className="pagelayout pb-4 px-1">
                {props.left &&
                    <div className="pagelayout-left px-1">
                        {props.left}
                    </div>
                }
                <div className="pagelayout-body px-1">
                    {props.center}
                </div>
                {props.right &&
                    <div className="pagelayout-right px-1">
                        {props.right}
                    </div>
                }
            </div>
            <Footer />
            <Banner />
            <ReactTooltip />
        </React.Fragment>
    )
}