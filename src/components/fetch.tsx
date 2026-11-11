
import "./fetch.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Userlist() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  // CHANGE 1: Dark Mode State
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // CHANGE 2: Apply and save theme
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // CHANGE 3: Fetch Users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // CHANGE 4: Search with Debounce
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const filteredUsers = users.filter(
        (user: any) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setResults(filteredUsers);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, users]);

  // Loading State
  if (loading) {
    return (
      <div className="dashboard-state">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="dashboard-state error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  // CHANGE 5: Search Results
  const displayedUsers = searchTerm.trim() ? results : users;

  // CHANGE 6: City and Company Filtering
  const filteredUsers = displayedUsers.filter((user: any) => {
    const matchesCity =
      selectedCity === "" || user.address.city === selectedCity;

    const matchesCompany =
      selectedCompany === "" || user.company.name === selectedCompany;

    return matchesCity && matchesCompany;
  });

  // CHANGE 7: Sorting
  const sortedUsers = [...filteredUsers].sort((a: any, b: any) => {
    const valueA = a[sortBy].toLowerCase();
    const valueB = b[sortBy].toLowerCase();

    const comparison = valueA.localeCompare(valueB);

    return sortOrder === "asc" ? comparison : -comparison;
  });

  // CHANGE 8: Reset All Filters
  const handleReset = () => {
    setSearchTerm("");
    setResults([]);
    setSelectedCity("");
    setSelectedCompany("");
    setSortBy("name");
    setSortOrder("asc");
  };

  return (
    <div className="dashboard-container">

      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div>
          <h1>User Management Dashboard</h1>
          <p>Total Users: {users.length}</p>
        </div>

        {/* CHANGE 9: Theme Toggle Button */}
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* Search Section */}
      <div className="search-section">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, username, or email..."
        />
      </div>

      {/* Filter Section */}
      <div className="filter-section">

        {/* Sorting */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="username">Sort by Username</option>
          <option value="email">Sort by Email</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending (A-Z)</option>
          <option value="desc">Descending (Z-A)</option>
        </select>

        {/* City Filter */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">All Cities</option>

          {[...new Set(users.map((user: any) => user.address.city))]
            .sort()
            .map((city: string) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>

        {/* Company Filter */}
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">All Companies</option>

          {[...new Set(users.map((user: any) => user.company.name))]
            .sort()
            .map((company: string) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
        </select>

        {/* Reset Button */}
        <button onClick={handleReset}>
          Reset
        </button>

      </div>

      {/* Results Count */}
      <p className="results-count">
        Showing {sortedUsers.length} of {users.length} users
      </p>

      {/* User Cards */}
      {sortedUsers.length === 0 ? (
        <p className="empty-message">
          No users found.
        </p>
      ) : (
        <div className="user-grid">
          {sortedUsers.map((user: any) => (
            <div className="user-card" key={user.id}>

              <h2>{user.name}</h2>

              <p>
                <strong>Username:</strong> {user.username}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Phone:</strong> {user.phone}
              </p>

              <p>
                <strong>Website:</strong> {user.website}
              </p>

              <p>
                <strong>Company:</strong> {user.company.name}
              </p>

              <p>
                <strong>City:</strong> {user.address.city}
              </p>

              <Link
                to={`/user/${user.id}`}
                className="details-link"
              >
                View Details
              </Link>

            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="dashboard-footer">
        User Management Dashboard
      </footer>

    </div>
  );
}

export default Userlist;
