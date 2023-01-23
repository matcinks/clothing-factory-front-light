import { useLoaderData } from "react-router-dom";
import Schedule from "../components/schedules/Schedule";

import {
  getSeamstresses,
  getAllSewingByDate,
  updateSewingStatus,
} from "../util/api";

const SewingLayout = () => {
  const data = useLoaderData();

  return (
    <Schedule
      fetchedSchedule={data.sewing}
      fetchedDate={data.date}
      seamstresses={data.seamstresses}
    />
  );
};

export default SewingLayout;

export const loader = async ({ params }) => {
  try {
    // return await getAllSewing();
    // data w formacie yyyy-mm-DD .toLocaleDateString("en-CA")
    // const date = new Date("2023-01-19").toLocaleDateString("en-CA");
    const seamstresses = await getSeamstresses();
    const sewing = await getAllSewingByDate(params.date);
    return { sewing: sewing, date: params.date, seamstresses: seamstresses };
  } catch (e) {
    console.log(e);
  }
};

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const id = formData.get("id");
    const status = formData.get("status");
    const response = await updateSewingStatus(id, status);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
