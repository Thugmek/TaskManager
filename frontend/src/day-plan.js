import DayPlanSection from "./components/day-plan-section";

export default function DayPlan() {
  return (
    <>
      <h1>Plan of the day</h1>
      <DayPlanSection
        data={{ from: "00:00", to: "06:30", text: "Noční klid" }}
      />
      <DayPlanSection data={{ from: "06:30", to: "07:00", text: "Budíček" }} />
      <DayPlanSection
        data={{ from: "07:00", to: "07:15", text: "Rozcvička" }}
      />
      <DayPlanSection
        data={{ from: "07:15", to: "08:00", text: "Snídaně + Ranní léky" }}
      />
      <DayPlanSection
        data={{ from: "08:00", to: "09:00", text: "Ranní komunita" }}
      />
      <DayPlanSection data={{ from: "09:00", to: "10:00", text: "Vizita" }} />
      <DayPlanSection
        data={{ from: "10:00", to: "11:30", text: "Dopolední program" }}
      />
      <DayPlanSection
        data={{ from: "11:30", to: "12:15", text: "Oběd + Polední léky" }}
      />
      <DayPlanSection
        data={{ from: "12:15", to: "12:20", text: "Osobní volno" }}
      />
      <DayPlanSection
        data={{ from: "12:20", to: "13:00", text: "Autogenní tŕenink" }}
      />
      <DayPlanSection
        data={{ from: "13:00", to: "14:30", text: "Odpolední program" }}
      />
      <DayPlanSection
        data={{ from: "14:30", to: "17:00", text: "Osobní volno" }}
      />
      <DayPlanSection
        data={{ from: "17:00", to: "18:00", text: "Večeře + večerní léky" }}
      />
      <DayPlanSection
        data={{ from: "18:00", to: "19:00", text: "Osobní volno" }}
      />
      <DayPlanSection
        data={{ from: "19:00", to: "19:30", text: "Večerní komunita" }}
      />
      <DayPlanSection
        data={{ from: "19:30", to: "21:00", text: "Osobní volno" }}
      />
      <DayPlanSection
        data={{ from: "21:00", to: "21:30", text: "Noční léky" }}
      />
      <DayPlanSection
        data={{ from: "21:30", to: "22:00", text: "Osobní volno" }}
      />
      <DayPlanSection
        data={{ from: "22:00", to: "22:30", text: "Večerní klid" }}
      />
      <DayPlanSection
        data={{ from: "22:30", to: "23:59", text: "Noční klid" }}
      />
    </>
  );
}
