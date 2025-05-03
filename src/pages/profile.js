import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function Profile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    designation: '',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Simulated email from login
  

  useEffect(() => {
    const userEmail =localStorage.getItem("token");
    axios.get(`/api/profileApi?email=${userEmail}`).then((res) => {
      setUser((prev) => ({ ...prev, ...res.data }));
      setImagePreview(res.data.image || null);
    });
  },[]);

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
    await axios.put('/api/profileApi', user);
    alert('Profile updated successfully!');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h4 className="mb-4">Update Profile</h4>
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" className="form-control" value={user.email} readOnly />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" value={user.password} readOnly />
            </div>
            <div className="mb-3">
              <label>Name</label>
              <input type="text" name="name" className="form-control" value={user.name || ''} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Designation</label>
              <input type="text" name="designation" className="form-control" value={user.designation || ''} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Profile Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleImage} />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
