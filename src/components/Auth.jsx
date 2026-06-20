import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { ROUTES } from "../constants/routes.js";
import AmazonButton from "./ui/AmazonButton.jsx";
import FormInput from "./ui/FormInput.jsx";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, mode) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signIn") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate(ROUTES.HOME);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#eaeded] px-4 py-8">
      <Link to={ROUTES.HOME} className="mb-6">
        <img
          className="w-28 object-contain"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon logo"
        />
      </Link>

      <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl font-semibold mb-6">Sign in</h1>

        <form onSubmit={(e) => handleSubmit(e, "signIn")} className="space-y-4">
          <FormInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && (
            <p className="text-red-600 text-sm" role="alert">
              {error}
            </p>
          )}

          <AmazonButton
            type="submit"
            className="w-full py-2.5 font-medium"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </AmazonButton>
        </form>

        <p className="mt-5 text-xs text-gray-600 leading-relaxed">
          By signing in you agree to our Conditions of Use and Privacy Notice.
        </p>

        <div className="border-t border-gray-200 mt-6 pt-6">
          <p className="text-sm text-gray-700 mb-3">New to Amazon Clone?</p>
          <AmazonButton
            type="button"
            onClick={(e) => handleSubmit(e, "register")}
            className="w-full py-2.5"
            disabled={loading}
          >
            Create your account
          </AmazonButton>
        </div>
      </div>
    </div>
  );
};

export default Auth;
