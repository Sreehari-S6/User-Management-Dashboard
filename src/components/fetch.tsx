import "./fetch.css"
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


  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  const displayedUsers = searchTerm.trim() ? results : users;


  const filteredUsers = displayedUsers.filter((user: any) => {
    const matchesCity =
      selectedCity === "" || user.address.city === selectedCity;

    const matchesCompany =
      selectedCompany === "" || user.company.name === selectedCompany;

    return matchesCity && matchesCompany;
  });


  const sortedUsers = [...filteredUsers].sort((a: any, b: any) => {
    const valueA = a[sortBy].toLowerCase();
    const valueB = b[sortBy].toLowerCase();

    const comparison = valueA.localeCompare(valueB);

    return sortOrder === "asc" ? comparison : -comparison;
  });
    
return (
  <div className="dashboard-container">

    <header className="dashboard-header">
      <h1>User Management Dashboard</h1>
      <p>Total Users: {users.length}</p>
    </header>

   
    <div className="search-section">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, username, or email..."
      />
    </div>

   
    <div className="filter-section">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">All Cities</option>
        {[...new Set(users.map((user: any) => user.address.city))]
          .sort()
          .map((city: string) => (
            <option key={city} value={city}>{city}</option>
          ))}
      </select>

      <select
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
      >
        <option value="">All Companies</option>
        {[...new Set(users.map((user: any) => user.company.name))]
          .sort()
          .map((company: string) => (
            <option key={company} value={company}>{company}</option>
          ))}
      </select>

      <button onClick={() => {
        setSearchTerm("");
        setSelectedCity("");
        setSelectedCompany("");
        setSortBy("name");
        setSortOrder("asc");
      }}>
        Reset
      </button>
    </div>

    <p className="results-count">
      Showing {sortedUsers.length} of {users.length} users
    </p>

    {sortedUsers.length === 0 ? (
      <p className="empty-message">No users found.</p>
    ) : (
      <div className="user-grid">
        {sortedUsers.map((user: any) => (
          <div className="user-card" key={user.id}>
            <h2>{user.name}</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
            <p><strong>City:</strong> {user.address.city}</p>

            <Link to={`/user/${user.id}`} className="details-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    )}

    <footer className="dashboard-footer">
      User Management Dashboard
    </footer>
  </div>
);

}

export default Userlist;
