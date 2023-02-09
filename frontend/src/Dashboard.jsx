import { Task } from "./Task";

export const Dashboard = () => {
  return (
    <>
      <section className="taskSection">
        <Task user={localStorage.getItem("talloc_username")} />
      </section>
    </>
  );
};
