import React from "react";

function learnMore() {
  window.open("https://github.com/lazlomeli");
}

const DashboardTopBar = () => {
  return (
    <div className="dashboardTop">
      <section className="dashboardTopLeftSection">
        <img className="dashboardTopLogo" src={"../static/talloc.png"} />
        <h1 className="dashboardTopTitle">Talloc</h1>
        <p className="dashboardTopDesc">Think. Plan. Achieve.</p>
      </section>
      <section className="dashboardTopRightSect">
        <img className="githubLogo" src={"../static/github.png"} />
        <p className="learnMore" onClick={() => learnMore()}>
          Learn more!
        </p>
      </section>
    </div>
  );
};

export default DashboardTopBar;
