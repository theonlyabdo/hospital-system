import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <div className={'flex flex-col items-center justify-center'}>
      <div className={'flex items-center justify-center'}>
          <h2>xxx</h2>
      </div>
  </div>;
}
