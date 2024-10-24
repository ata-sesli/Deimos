import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {Home} from "./home";

// Define the loader function
/*
export const loader: LoaderFunction = async () => {
  // Load any necessary data here
  return json({ message: "Hello from the loader!" });
};
*/
// Define the meta function
export const meta: MetaFunction = () => {
  return [
    { title: "Deimos GDG" },
    { name: "description", content: "Welcome to Deimos Game!" },
  ];
};

// Define the main component
export default function Index() {
  return (
    <div className="overflow-hidden">
      <Home />
    </div>
  );
}