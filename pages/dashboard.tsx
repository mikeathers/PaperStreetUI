import React from "react";
import withPrivateRoute from "HOCs/withPrivateRoute";

const Dashboard = () => {
  return <div>This is a Dashboard page which is private.</div>;
};

Dashboard.getInitialProps = async (props: any) => {
  console.info("##### Congratulations! You are authorized! ######", props);
  return {};
};

export default withPrivateRoute(Dashboard);
