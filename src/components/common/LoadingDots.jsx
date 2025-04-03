import React from "react";

const LoadingDots = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="50" height="50">
            <circle fill="#000000" stroke="#000000" strokeWidth="2" r="15" cx="40" cy="100">
                <animate attributeName="opacity" calcMode="spline" dur="2s" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-0.4s" />
            </circle>
            <circle fill="#000000" stroke="#000000" strokeWidth="2" r="15" cx="100" cy="100">
                <animate attributeName="opacity" calcMode="spline" dur="2s" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-0.2s" />
            </circle>
            <circle fill="#000000" stroke="#000000" strokeWidth="2" r="15" cx="160" cy="100">
                <animate attributeName="opacity" calcMode="spline" dur="2s" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0s" />
            </circle>
        </svg>
    );
};

export default LoadingDots;
