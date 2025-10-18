import React from "react";

export const CopyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
      />
    </svg>
  );
};

export const NoRecentOrders = () => {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 30C40 27.7909 41.7909 26 44 26H76C78.2091 26 80 27.7909 80 30V40H40V30Z"
        fill="#f1f3f5"
      />
      <path
        d="M30 40H90V100C90 105.523 85.5228 110 80 110H40C34.4772 110 30 105.523 30 100V40Z"
        fill="white"
        stroke="#dee2e6"
        stroke-width="2"
      />

      <path
        d="M35 30C35 27.2386 37.2386 25 40 25H45C47.7614 25 50 27.2386 50 30V35H35V30Z"
        fill="#dee2e6"
      />
      <path
        d="M70 30C70 27.2386 72.2386 25 75 25H80C82.7614 25 85 27.2386 85 30V35H70V30Z"
        fill="#dee2e6"
      />

      <circle
        cx="60"
        cy="65"
        r="20"
        fill="none"
        stroke="#dee2e6"
        stroke-width="2"
        stroke-dasharray="3 3"
      />
      <path
        d="M60 55V75M50 65H70"
        stroke="#dee2e6"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};
