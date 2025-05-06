import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import withAuth from "./withAuth";
// import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";
// import Users from "@/models/Users";


 function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Simulated email from login

  useEffect(() => {
    const userEmail = localStorage.getItem("token");
    if(userEmail)
    {
    axios.get(`/api/profileApi?email=${userEmail}`).then((res) => {
      setUser((prev) => ({ ...prev, ...res.data }));
      setImagePreview(res.data.image || null);
    });
  }
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({ ...prev, image: reader.result }));
      setImagePreview(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put("/api/profileApi", user);
    alert("Profile updated successfully!");
  };

  return (
    <div className="container mt-3">
        <h2 className="mb-4 fw-bold text-center"> User Information</h2>
        <div className="border rounded-5 shadow bg-white w-50 mx-auto">
          <div className="container mt-4">
            <table className="table table-borderless w-auto mx-auto">
              <tbody>
                <tr>
                  <td colSpan="2" className="text-center">
                    <Image
                      src={imagePreview || "/profile.jpg"}
                      alt="Preview"
                      className=" rounded-circle mb-3 text-dark border"
                      width={100}
                      height={100}
                    />
                  </td>
                </tr>
                {/* Name */}
                <tr>
                  <td className="fs-4 text-center">👤</td>
                  <td>
                    <strong>Name</strong>
                    <p className="mb-0">{user.name || ""}</p>
                  </td>
                </tr>

                {/* Designation */}
                <tr>
                  <td className="fs-4 text-center">💼</td>
                  <td>
                    <strong>Designation</strong>
                    <p className="mb-0">{user.designation || "-----"}</p>
                  </td>
                </tr>

                {/* Email */}
                <tr>
                  <td className="fs-4 text-center">📧</td>
                  <td>
                    <strong>Email</strong>
                    <p className="mb-0">{user.email || ""}</p>
                  </td>
                </tr>

                {/* Password */}
                <tr>
                  <td className="fs-4 text-center">🔒</td>
                  <td>
                    <strong>Password</strong>
                    <p className="mb-0">{user.password ?"********":" "}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="text-center">
                    <button className="btn btn-primary">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default withAuth(Profile)