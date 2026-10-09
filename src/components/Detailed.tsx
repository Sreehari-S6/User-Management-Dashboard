import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Detailed.css"

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError("");
      setUser(null);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUser(data);
      } catch {
        setError("Unable to load user details.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  
if (loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="loading-spinner"></div>

      <p className="mt-4 text-gray-600 font-medium">
        Loading users...
      </p>
    </div>
  );
}



if (loading) {
  return (
    <div className="details-state">
      <div className="loading-spinner"></div>
      <p>Loading user details...</p>
    </div>
  );
}

if (error) {
  return (
    <div className="details-state error-message">
      <p>{error}</p>
      <Link to="/" className="back-link">
        ← Back to Users
      </Link>
    </div>
  );
}

if (!user) return null;

return (
  <div className="details-container">
    {/* CHANGE 1: Simple navigation */}
    <Link to="/" className="back-link">
      ← Back to Users
    </Link>

    {/* CHANGE 2: User profile header */}
    <header className="profile-header">
      <div className="profile-avatar">
        {user.name
          .split(" ")
          .map((part: string) => part[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()}
      </div>

      <div>
        <p className="section-label">USER PROFILE</p>
        <h1>{user.name}</h1>
        <p className="profile-username">
          @{user.username} · User ID: {user.id}
        </p>
      </div>
    </header>

    {/* CHANGE 3: Basic information */}
    <section className="details-card">
      <h2>Basic Information</h2>

      <div className="details-grid">
        <div>
          <span>Full Name</span>
          <p>{user.name}</p>
        </div>

        <div>
          <span>Username</span>
          <p>{user.username}</p>
        </div>

        <div>
          <span>Email</span>
          <p>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
        </div>

        <div>
          <span>Phone</span>
          <p>
            <a href={`tel:${user.phone}`}>{user.phone}</a>
          </p>
        </div>

        <div>
          <span>Website</span>
          <p>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noreferrer"
            >
              {user.website}
            </a>
          </p>
        </div>
      </div>
    </section>

    {/* CHANGE 4: Address information */}
    <section className="details-card">
      <h2>Address Information</h2>

      <div className="details-grid">
        <div>
          <span>Street</span>
          <p>{user.address.street}</p>
        </div>

        <div>
          <span>Suite</span>
          <p>{user.address.suite}</p>
        </div>

        <div>
          <span>City</span>
          <p>{user.address.city}</p>
        </div>

        <div>
          <span>Zipcode</span>
          <p>{user.address.zipcode}</p>
        </div>

        <div>
          <span>Latitude</span>
          <p>{user.address.geo.lat}</p>
        </div>

        <div>
          <span>Longitude</span>
          <p>{user.address.geo.lng}</p>
        </div>
      </div>
    </section>

    {/* CHANGE 5: Company information */}
    <section className="details-card">
      <h2>Company Information</h2>

      <div className="company-details">
        <div>
          <span>Company Name</span>
          <p>{user.company.name}</p>
        </div>

        <div>
          <span>Catch Phrase</span>
          <p>{user.company.catchPhrase}</p>
        </div>

        <div>
          <span>Business Description</span>
          <p>{user.company.bs}</p>
        </div>
      </div>
    </section>

    {/* CHANGE 6: Footer */}
    <footer className="details-footer">
      User Management Dashboard
    </footer>
  </div>
);

}

export default UserDetails;