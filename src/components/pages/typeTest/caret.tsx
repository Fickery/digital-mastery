type Props = {
  offset: number;
};

const Caret = ({ offset }: Props) => {
  return (
    <div
      className="relative w-[3.8px] animate-blinkingBg bg-[rgb(117,41,41)] transition-all duration-300"
      style={{ left: offset }}
    ></div>
  );
};

export default Caret;
