const Spinner = ({ size = 32 }) => {
  return (
    <div
      className="inline-block border-4 rounded-full animate-spin border-tan/30 border-t-tan"
      style={{ width: size, height: size }}
    />
  );
};

export default Spinner;


