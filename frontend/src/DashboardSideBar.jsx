import { useNavigate } from "react-router-dom";

const DashboardSideBar = () => {
  const navigateTo = useNavigate();

  function logout() {
    localStorage.removeItem("talloc_username");
    localStorage.removeItem("talloc_user_token");
    localStorage.removeItem("repositories");
    navigateTo("/");
  }

  return (
    <div className="dashboardSide">
      <h1 className="dashboardSideTitle">
        Welcome, {localStorage.getItem("talloc_username")}
      </h1>
      <p className="dashboardSideDesc">Click to navigate:</p>
      <section className="dashboardSideBox">
        <p
          className="dashboardSideBoxOption"
          onClick={() => navigateTo("/dashboard")}
        >
          Dashboard
        </p>
      </section>
      <section className="dashboardSideBox">
        <p
          className="dashboardSideBoxOption"
          onClick={() => navigateTo("/insights")}
        >
          Insights
        </p>
      </section>
      <section className="logout" onClick={() => logout()}>
        <img className="logoutLogo" src={"../static/logout.png"} />
        <p className="logoutDesc">Log out</p>
      </section>
    </div>
  );
};

export default DashboardSideBar;
