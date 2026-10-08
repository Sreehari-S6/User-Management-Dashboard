import {useEffect, useState} from 'react';
// Search functionality with debounce
function Userlist(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([])

    useEffect(() => {
        async function fetchUsers(){
            try{
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch posts");
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setResults([]);
            return
        }
        const timer=setTimeout(async()=>{
            const res=await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${searchTerm}`);        
            const data=await res.json();
            setResults(data);
        }, 10);
        return() => clearTimeout(timer);
    }, [searchTerm]);


    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

   const displayedUsers = searchTerm ? results : users;

return (
  <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
      User List
    </h1>

    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search users..."
      className="w-full p-3 mb-6 border rounded-lg"
    />

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {displayedUsers.map((user:any) => (
        <div
          key={user.id}
          className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {user.name}
          </h2>

          <div className="space-y-1 text-gray-600">
            <p><span className="font-semibold">Username:</span> {user.username}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone}</p>
            <p><span className="font-semibold">Website:</span> {user.website}</p>
            <p><span className="font-semibold">Company:</span> {user.company.name}</p>
            <p><span className="font-semibold">City:</span> {user.address.city}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Userlist;