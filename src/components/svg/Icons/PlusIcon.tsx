import SvgWrapper from "../svg-wrapper";

const PlusIcon = ({
  size = 20,
  color = "currentColor",
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
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M1 7H7M7 7H13M7 7V13M7 7V1"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </SvgWrapper>
  );
};

export default PlusIcon;
