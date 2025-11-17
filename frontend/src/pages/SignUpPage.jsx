import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon, EyeIcon, EyeOffIcon, CheckCircleIcon, SparklesIcon, ShieldIcon } from "lucide-react";
import { Link } from 'react-router-dom';

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const signup = useAuthStore((state) => state.signup);
  const isSigningUp = useAuthStore((state) => state.isSigningUp);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  const handleInputFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleInputBlur = () => {
    setFocusedField(null);
  };

 


  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-800/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl md:h-[800px] h-auto">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row bg-slate-900/80 backdrop-blur-sm rounded-2xl overflow-hidden">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30 relative">
               {/* Security Badge */}
              <div className="absolute top-6 left-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                  <ShieldIcon className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Secure signup</span>
                </div>
              </div>
              
              <div className="w-full max-w-md mt-8">
                {/* HEADING TEXT */}
                <div className="text-center mb-10">
                  <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                      <MessageCircleIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
                    Join Us Today
                  </h2>
                  <p className="text-slate-400 text-lg">Create your account in seconds</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* FULL NAME */}
                  <div className="group">
                    <label className="auth-input-label flex items-center gap-2">
                      Full Name
                    </label>
                    <div className="relative transition-all duration-300 transform group-hover:scale-[1.02]">
 <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-md scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${focusedField === 'fullName' ? 'opacity-100' : ''}`}></div>

                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        onFocus={() => handleInputFocus('fullName')}
                        onBlur={handleInputBlur}
                       className={`input pl-12 pr-12 transition-all duration-500 relative z-10 ${
                          focusedField === 'fullName' 
                            ? 'border-cyan-400/70 shadow-2xl shadow-cyan-400/20 bg-slate-800/50' 
                            : 'border-slate-600/30 bg-slate-800/30'
                        }`}
                        placeholder=" Saad Rimeh"
                      />
                      <UserIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === 'fullName' ? 'text-cyan-400' : 'text-slate-500'
                      }`} />
                    </div>
                  </div>

                  {/* EMAIL INPUT */}
                  <div className="group">
                    <label className="auth-input-label flex items-center gap-2">

                      Email Address
                    </label>
                    <div className="relative transition-all duration-300 transform group-hover:scale-[1.02]">
                       <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-md scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${focusedField === 'email' ? 'opacity-100' : ''}`}></div>

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => handleInputFocus('email')}
                        onBlur={handleInputBlur}
                       className={`input pl-12 pr-12 transition-all duration-500 relative z-10 ${
                          focusedField === 'email' 
                            ? 'border-cyan-400/70 shadow-2xl shadow-cyan-400/20 bg-slate-800/50' 
                            : 'border-slate-600/30 bg-slate-800/30'
                        }`}
                        placeholder=" example@gmail.com"
                      />
                      <MailIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === 'email' ? 'text-cyan-400' : 'text-slate-500'
                      }`} />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div className="group">
                    <label className="auth-input-label flex items-center gap-2">
                      Password
                    </label>
                    <div className="relative transition-all duration-300 transform group-hover:scale-[1.02]">
                       <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-md scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${focusedField === 'password' ? 'opacity-100' : ''}`}></div>

                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onFocus={() => handleInputFocus('password')}
                        onBlur={handleInputBlur}
                        className={`input pl-12 pr-12 transition-all duration-500 relative z-10 ${
                          focusedField === 'password' 
                            ? 'border-cyan-400/70 shadow-2xl shadow-cyan-400/20 bg-slate-800/50' 
                            : 'border-slate-600/30 bg-slate-800/30'
                        }`}
                        placeholder=" Enter your password"
                      />
                      <LockIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === 'password' ? 'text-cyan-400' : 'text-slate-500'
                      }`} />
                      
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-all duration-300 z-20 hover:scale-110"
                      >
                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>

                    
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button 
                    className={`auth-btn group relative overflow-hidden transition-all duration-500 ${
                      isSigningUp 
                        ? 'bg-cyan-600/50 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 hover:shadow-2xl hover:shadow-cyan-500/25'
                    }`} 
                    type="submit" 
                    disabled={isSigningUp}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSigningUp ? (
                        <>
                          <LoaderIcon className="w-5 h-5 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <SparklesIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Sign in
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-8 bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-cyan-900/20 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}></div>
              </div>
              
              <div className="relative z-10 text-center">
                <div className="relative">
                  <img
                    src="/signup.png"
                    alt="People using mobile devices"
                    className="w-full max-w-md h-auto object-contain transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400/20 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400/20 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Start Your Journey Today
                  </h3>
                  <p className="text-slate-400 text-lg max-w-md mx-auto">
                    Join thousands of users who transformed their experience with our platform
                  </p>

                  <div className="flex justify-center gap-3 mt-6">
                    <span className="auth-badge group hover:scale-110 transition-transform duration-300">
                      <SparklesIcon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 mr-3" />
                         Free Forever
                    </span>
                    <span className="auth-badge group hover:scale-110 transition-transform duration-300">
                      <CheckCircleIcon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 mr-3" />
                      Easy Setup
                    </span>
                    <span className="auth-badge group hover:scale-110 transition-transform duration-300">
                      <LockIcon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 mr-3" />
                      Secure
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;