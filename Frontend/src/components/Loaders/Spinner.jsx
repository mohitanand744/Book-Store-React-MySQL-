const Spinner = ({ size = 32 }) => {
  return (
    <div
      className="inline-block border-4 rounded-full animate-spin border-white/30 border-t-white"
      style={{ width: size, height: size }}
    />
  );
};

export default Spinner;
