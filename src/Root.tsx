import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="container-fluid mt-3">
    <div className="row">
      {/* Sidebar */}
      <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
        <div className="position-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">Cart</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <Outlet />
      </main>
    </div>
  </div>
);
}