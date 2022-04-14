import DayPlanSection from "./components/day-plan-section";

export default function DayPlan() {
  return (
    <>
      <h1>Task List</h1>
      <DayPlanSection data={{ from: "10:00", to: "10:00", text: "Text" }} />
      <DayPlanSection data={{ from: "10:00", to: "10:00", text: "Text" }} />
      <DayPlanSection
        data={{ from: "10:00", to: "10:00", text: "Text", active: true }}
      />
      <DayPlanSection data={{ from: "10:00", to: "10:00", text: "Text" }} />
      <DayPlanSection data={{ from: "10:00", to: "10:00", text: "Text" }} />
    </>
  );
}
