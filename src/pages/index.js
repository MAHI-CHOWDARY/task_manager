import Layout from "@/components/layout";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data)
    if (response.status === 200) {
      // Save the token in localStorage
      localStorage.setItem("token", data.user.email);
      router.push("/dashboard"); // Redirect to dashboard after login
    } else {
      setError(data.message);
    }
  };

  return (
    <Layout title="Task Management" description="Your tasks overview">
      <div className="container row mx-auto">
        <h1 className="fw-bold text-center text-secondary-emphasis my-3">Welcome to the Task Management System</h1>
        <div className=".col-12 col-sm-12 col-md-6 col-lg-6">
        <div className="position-relative" style={{height:"80vh"}}>
          <Image
            src="/home.jpg" // Path to your image in the public folder
            alt="Home Image"
            layout="fill"
            objectFit="cover"
            className="rounded-left rounded-2"
          />
        </div>
        </div>
        <div className=".col-12 col-sm-12 col-md-6 col-lg-6 ">
        
          <div className=" border-info shadow  text-center p-5 mt-5">
            <h2 className="fw-bold  text-info-emphasis mb-4">
              Login To Your Account
            </h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
            <input
              className="form-control mt-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <button
              onClick={handleLogin}
              className="btn btn-primary mt-2 text-center rounded-3"
            >
              Login
            </button>
            <div className="mt-4 text-center">
          <p className="text-sm">
            <span>Don&apos;t have an account? </span>
            
              <Link className="text-blue-500 hover:underline" href={"/register"}>Sign Up</Link>
            
          </p>
        </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
