import SvgWrapper from "../svg-wrapper";

const SendIcon = ({
  size = 16,
  color = "#F67C00",
  hoverColor,
  ...props
}: {
  size?: number;
  color?: string;
  hoverColor?: string;
  [key: string]: any;
}) => {
  return (
    <SvgWrapper size={size} color={color} hoverColor={hoverColor} {...props}>
      <svg
        className="transform transition-transform duration-200 group-hover:scale-110"
        width="16"
        height="13"
        viewBox="0 0 16 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.2118 0.0668041L0.604624 5.56249C-0.218554 5.87219 -0.197933 6.32228 0.646597 6.56661L4.176 7.58766L5.61102 11.7508C5.79889 12.2959 6.28968 12.4108 6.7095 12.0053L8.56081 10.2172L12.2153 12.8283C12.6901 13.1675 13.1782 12.989 13.3064 12.4259L15.9731 0.709912C16.1009 0.148455 15.7605 -0.139647 15.2118 0.0668041ZM12.9889 2.71576L6.75825 8.12833C6.64621 8.22566 6.54483 8.41852 6.52926 8.56131L6.25419 11.0828C6.22331 11.3659 6.12318 11.3776 6.03083 11.1062L4.82521 7.56289C4.77805 7.42427 4.84265 7.25436 4.96859 7.18072L12.8702 2.55978C13.3738 2.26532 13.4274 2.33486 12.9889 2.71576Z"
          fill="#F67C00"
        />
      </svg>
    </SvgWrapper>
  );
};

export default SendIcon;
