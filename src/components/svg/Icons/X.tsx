import { IconProps } from "../type";

const X: React.FC<IconProps> = ({ width = "18px", height = "18px" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      className="transition-colors duration-200 hover:fill-[#F67C00]"
    >
      <path
        d="M17.3213 0H20.7083L13.3546 8.47177L22 20H15.2159L9.90661 13.0051L3.80397 20H0.437349L8.29957 10.9436L0 0H6.94683L11.7374 6.38972L17.3213 0ZM16.1415 17.9692H18.0028L5.97041 1.92818H3.9362L16.1415 17.9692Z"
        fill="#979797"
        className="transition-colors duration-200 hover:fill-[#F67C00]"
      />
    </svg>
  );
};

export default X;
