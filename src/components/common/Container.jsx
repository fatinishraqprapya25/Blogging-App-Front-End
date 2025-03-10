import React from "react";

export default function Container(props) {
    const { children, extraClasses } = props;
    return <>
        <div className={`w-[98%] md:w-[60%] mx-auto ${extraClasses}`}>
            {children}
        </div>
    </>
}