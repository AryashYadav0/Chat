import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, LoaderIcon } from 'lucide-react';
import { useState } from "react";

function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">

            {/* FORM CLOUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back</h2>
                  <p className="text-slate-400">Login to access your account</p>
                </div>

                {/* form  */}

                <form onSubmit={handleSubmit} className="space-y-6">


                  {/* Email  */}
                  <div>
                    <label htmlFor="" className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>

                  {/* Password  */}
                  <div>
                    <label htmlFor="" className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="*****"
                      />
                    </div>
                  </div>

                  {/* submit button  */}
                  <button type="submit" className="auth-btn" disabled={isLoggingIn}>
                    {isLoggingIn ? <LoaderIcon className="animate-spin mx-auto w-full h-5 text-center" /> : ("Login")}
                  </button>

                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* IMAGE COLUMN - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <img src="/signup.png" alt="Login Image" className="w-full h-auto object-contain" />
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  )
}

export default LoginPage