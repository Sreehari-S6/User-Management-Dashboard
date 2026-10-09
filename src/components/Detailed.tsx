import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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


  if (error){
    return(
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>    
    ) 
  } 

 return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 text-blue-600 hover:underline"
        >
          ← Back to Users
        </Link>

        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-6">
          <p className="text-sm text-blue-600 font-semibold mb-2">
            USER PROFILE
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            {user.name}
          </h1>

          <p className="text-gray-500 mt-2">
            @{user.username}
          </p>

          <p className="text-gray-500 mt-1">
            User ID: {user.id}
          </p>
        </div>

        <section className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Basic Information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-800">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium text-gray-800">{user.username}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <a
                href={`mailto:${user.email}`}
                className="font-medium text-blue-600 break-words hover:underline"
              >
                {user.email}
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <a
                href={`tel:${user.phone}`}
                className="font-medium text-blue-600 break-words hover:underline"
              >
                {user.phone}
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-500">Website</p>
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-600 break-words hover:underline"
              >
                {user.website}
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Address Information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Street</p>
              <p className="font-medium text-gray-800">
                {user.address.street}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Suite</p>
              <p className="font-medium text-gray-800">
                {user.address.suite}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium text-gray-800">
                {user.address.city}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Zipcode</p>
              <p className="font-medium text-gray-800">
                {user.address.zipcode}
              </p>
            </div>

           
            <div>
              <p className="text-sm text-gray-500">Latitude</p>
              <p className="font-medium text-gray-800">
                {user.address.geo.lat}
              </p>
            </div>

            
            <div>
              <p className="text-sm text-gray-500">Longitude</p>
              <p className="font-medium text-gray-800">
                {user.address.geo.lng}
              </p>
            </div>
          </div>
        </section>

        
        <section className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Company Information
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-500">Company Name</p>
              <p className="font-medium text-gray-800">
                {user.company.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Catch Phrase</p>
              <p className="font-medium text-gray-800">
                {user.company.catchPhrase}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Business Description
              </p>
              <p className="font-medium text-gray-800">
                {user.company.bs}
              </p>
            </div>
          </div>
        </section>

        
        <p className="text-center text-sm text-gray-500 py-4">
          User Management Dashboard
        </p>

      </div>
    </div>
  );
}

export default UserDetails;