import { type IconProps } from "../type";

const Telegram: React.FC<IconProps> = ({ width = "18px", height = "18px" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="19"
      viewBox="0 0 22 19"
      fill="none"
      className="transition-colors duration-200 hover:fill-[#F67C00]"
    >
      <path
        d="M20.5192 0.124858L1.02601 7.86332C-0.304476 8.41568 -0.292609 9.18179 0.782068 9.49665L5.78624 11.1293L17.3578 3.60391C17.907 3.2653 18.4068 3.45395 17.9921 3.84277L8.61798 12.5367L8.27646 17.8506C8.77688 17.8506 9.00829 17.6124 9.28916 17.3227L11.7187 14.8981L16.7717 18.7422C17.6993 19.2702 18.3712 18.994 18.6026 17.8506L21.9229 1.75751C22.1958 0.635146 21.7066 0 21.046 0C20.8779 0 20.6999 0.0407145 20.5192 0.124858Z"
        fill="#979797"
        className="transition-colors duration-200 hover:fill-[#F67C00]"
      />
    </svg>
  );
};

export default Telegram;
