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
      <section className="logout" title="Log out" onClick={() => logout()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-logout"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#fffffc"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="logoutLogo"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
          <path d="M7 12h14l-3 -3m0 6l3 -3" />
        </svg>
      </section>
    </div>
  );
};

export default DashboardSideBar;
