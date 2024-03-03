import './NumberFlip.less';

const Demo = (props: any) => {
  const { number } = props;
  return (
    <>
      <div className="demoBox">
        <span
          className="demoNum"
          style={{ transform: `translate(-50%, -${number * 10}%)` }}
        >
          0123456789
        </span>
      </div>
    </>
  );
};

export default Demo;
