import React from "react";

interface SvgIconProps {
  fill?: string;
}

const HomeLetterIcon: React.FC<SvgIconProps> = ({ fill }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 19H7.5C4.8 19 3 17.7647 3 14.8824V9.11765C3 6.23529 4.8 5 7.5 5H16.5C19.2 5 21 6.23529 21 9.11765V14.8824C21 17.7647 19.2 19 16.5 19Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 9L14.244 11.4077C13.008 12.1974 10.98 12.1974 9.74399 11.4077L6 9"
        stroke={fill}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeLetterIcon;
