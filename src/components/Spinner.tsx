'use client';

const Spinner = ({wrapperHeight = '100'}) => {
  return (
    <div className="flex w-full items-center justify-center" style={{ height: `${wrapperHeight}px`}}>
      <div className="spinner"/>
    </div>
  );
};

export default Spinner;