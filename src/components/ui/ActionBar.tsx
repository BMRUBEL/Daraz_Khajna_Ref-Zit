type ActionBarType = {
  title?: string;
  children?: React.ReactNode | React.ReactElement;
};

const ActionBar = ({ title, children }: ActionBarType) => {
  return (
    <div>
      <h1>{title}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0px"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ActionBar;
