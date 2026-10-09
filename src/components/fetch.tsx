import "./fetch.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Userlist() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);

  // CHANGE 1: Added sorting states
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // CHANGE 2: Added filtering states
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  // Fetch users from API (existing functionality)
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        // CHANGE 3: Handle HTTP errors
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

  // Existing search functionality
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
  }, [searchTerm, users]); // CHANGE 4: Added users dependency

 
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
      <h1 className="dashboard-title font-bold text-blue-600">
        User Management Dashboard
      </h1>

      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, username, or email..."
        className="w-full p-3 mb-6 border rounded-lg bg-white"
      />

      <div className="flex flex-wrap gap-4 mb-6">
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="control-input border rounded-lg bg-white"
        >
          <option value="name">Sort by Name</option>
          <option value="username">Sort by Username</option>
          <option value="email">Sort by Email</option>
        </select>

        
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="control-input border rounded-lg bg-white"
        >
          <option value="asc">Ascending (A–Z)</option>
          <option value="desc">Descending (Z–A)</option>
        </select>

        
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="control-input border rounded-lg bg-white"
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

        
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="control-input border rounded-lg bg-white"
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

        <button
          onClick={() => {
            setSearchTerm("");
            setSelectedCity("");
            setSelectedCompany("");
          }}
          className="control-input border rounded-lg bg-white"
        >
          Reset
        </button>
      </div>

      

      {sortedUsers.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No users found
        </p>
      ) : (
        <div className="user-grid">
          {sortedUsers.map((user: any) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300"
            >

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                <Link
                  to={`/user/${user.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.name}
                </Link>
              </h2>

              <div className="space-y-1 text-gray-600">
                <p>
                  <span className="font-semibold">Username:</span>{" "}
                  {user.username}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {user.phone}
                </p>
                <p>
                  <span className="font-semibold">Website:</span>{" "}
                  {user.website}
                </p>
                <p>
                  <span className="font-semibold">Company:</span>{" "}
                  {user.company.name}
                </p>
                <p>
                  <span className="font-semibold">City:</span>{" "}
                  {user.address.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="text-center text-sm text-gray-500 py-6">
        User Management Dashboard
      </footer>
    </div>
  );
}

export default Userlist;
