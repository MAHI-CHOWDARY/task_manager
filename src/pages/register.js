import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError(""); // Clear old errors
    try {
      const res = await fetch("/api/auth/registerPage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");
      router.push("/");
      setLoading(false)
    } catch (err) {
      setError(err.message);
      setLoading(false)
    }
  };

  return (
    <Layout title={"Register Page"}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="position-relative" style={{ height: "85vh" }}>
              <Image
                src="/register.jpg"
                alt="Register"
                layout="fill"
                objectFit="cover"
                className="rounded-3"
              />
            </div>
          </div>

          <div className="col-12 col-md-6 border shadow p-5">
            <h2 className="mb-4 text-center">Create an Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading?"Submitting":"Sign Up"}
              </button>

              <div className="mt-3 text-center">
                <small>
                  Already have an account?{" "}
                  <Link href="/" className="text-decoration-none">
                    Login
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
