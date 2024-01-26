import Link from "next/link";

export const Navbar = () => (
  <div className="navbar bg-primary">
    <div className="flex-1">
      <Link href={"/"} className="btn btn-ghost text-xl">
        Interview copilot 🧑‍💻
      </Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>{/* <Link href="/?reset=1">New Feedback</Link> */}</li>
      </ul>
    </div>
  </div>
);
