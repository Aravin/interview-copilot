export const Navbar = () => (
  <div className="navbar bg-primary">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">Interview copilot 🧑‍💻</a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <a>New Feedback</a>
        </li>
        <li>
          <a>Generate Summary</a>
        </li>
      </ul>
    </div>
  </div>
);
