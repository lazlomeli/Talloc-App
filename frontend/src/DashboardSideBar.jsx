import LogoutIcon from "./icon_components/LogoutIcon";
import { useNavigate } from "react-router-dom";

const DashboardSideBar = () => {
  const navigateTo = useNavigate();
  return (
    <div className="dashboardSide">
      <h1 className="dashboardSideTitle">
        Welcome, {localStorage.getItem("talloc_username")}
      </h1>
      <p className="dashboardSideDesc">Click to navigate:</p>
      <section
        className="dashboardSideBox"
        onClick={() => navigateTo("/dashboard")}
      >
        <p className="dashboardSideBoxOption">Dashboard</p>
      </section>
      <section
        className="dashboardSideBox"
        onClick={() => navigateTo("/insights")}
      >
        <p className="dashboardSideBoxOption">Insights</p>
      </section>
      <section
        className="dashboardSideBox"
        onClick={() => navigateTo("/tracker")}
      >
        <p className="dashboardSideBoxOption">Tracker</p>
      </section>
      <LogoutIcon />
    </div>
  );
};

export default DashboardSideBar;
