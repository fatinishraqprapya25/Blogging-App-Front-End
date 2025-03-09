import React from "react";

export default function Container(props) {
    const { children, extraClasses } = props;
    return <>
        <div className={`w-full md:w-[80%] mx-auto ${extraClasses}`}>
            {children}
        </div>
    </>
}