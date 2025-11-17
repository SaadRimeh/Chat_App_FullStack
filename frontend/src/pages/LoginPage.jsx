import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon, EyeIcon, EyeOffIcon, SparklesIcon, ShieldIcon, ZapIcon, GlobeIcon, UsersIcon, RocketIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const handleInputFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleInputBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900 min-h-screen">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Enhanced Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400/40 rounded-full animate-float shadow-lg shadow-cyan-400/20"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-purple-400/40 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/4 left-2/3 w-4 h-4 bg-cyan-400/30 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400/50 rounded-full animate-float" style={{animationDelay: '2.5s'}}></div>
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 95%, cyan 100%),
              linear-gradient(180deg, transparent 95%, purple 100%)
            `,
            backgroundSize: '50px 50px, 50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative w-full max-w-6xl md:h-[800px] h-auto">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row bg-slate-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/30 shadow-2xl shadow-black/30">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30 relative">
              {/* Enhanced Live Status Indicator */}
              <div className="absolute top-6 right-6 flex items-center gap-2 group cursor-pointer">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-ping absolute"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full relative z-10 shadow-lg shadow-green-400/30"></div>
                </div>
                <span className="text-sm font-medium text-green-400 group-hover:text-green-300 transition-colors duration-300">
                  Live
                </span>
                <div className="absolute -inset-2 bg-green-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </div>

               {/* Security Badge */}
              <div className="absolute top-6 left-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                  <ShieldIcon className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Secure Login</span>
                </div>
              </div>
              
              <div className="w-full max-w-md mt-12">
                {/* Enhanced HEADING TEXT */}
                <div className="text-center mb-12">
                  <div className="relative inline-block mb-6 group">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <MessageCircleIcon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-125 transition-transform duration-300">
                      <RocketIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -inset-4 bg-cyan-500/10 rounded-full scale-0 group-hover:scale-100 transition-all duration-500 blur-md"></div>
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 bg-size-200 animate-gradient">
                    Welcome Back!
                  </h2>
                  <p className="text-slate-400 text-lg animate-pulse">Ready to continue your journey?</p>
                </div>

                {/* Enhanced FORM */}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Enhanced EMAIL INPUT */}
                  <div className="group">
                    <label className="auth-input-label flex items-center gap-2">
                      Email Address
                    </label>
                    <div className="relative transition-all duration-500 transform group-hover:scale-[1.02]">
                      <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-md scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${focusedField === 'email' ? 'opacity-100' : ''}`}></div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => handleInputFocus('email')}
                        onBlur={handleInputBlur}
                        className={`input pl-12 transition-all duration-500 relative z-10 ${
                          focusedField === 'email' 
                            ? 'border-cyan-400/70 shadow-2xl shadow-cyan-400/20 bg-slate-800/50' 
                            : 'border-slate-600/30 bg-slate-800/30'
                        }`}
                        placeholder=" johndoe@gmail.com"
                      />
                      <MailIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-500 z-20 ${
                        focusedField === 'email' ? 'text-cyan-400 scale-110' : 'text-slate-500'
                      }`} />
                    </div>
                  </div>

                  {/* Enhanced PASSWORD INPUT */}
                  <div className="group">
                    <label className="auth-input-label flex items-center gap-2">
                      Password
                    </label>
                    <div className="relative transition-all duration-500 transform group-hover:scale-[1.02]">
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
                      <LockIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-500 z-20 ${
                        focusedField === 'password' ? 'text-cyan-400 scale-110' : 'text-slate-500'
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

                  {/* Enhanced SUBMIT BUTTON */}
                  <button 
                    className={`auth-btn group relative overflow-hidden transition-all duration-500 transform hover:scale-[1.02] ${
                      isLoggingIn 
                        ? 'bg-cyan-600/50 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 hover:shadow-2xl hover:shadow-cyan-500/40'
                    }`} 
                    type="submit" 
                    disabled={isLoggingIn}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isLoggingIn ? (
                        <>
                          <LoaderIcon className="w-5 h-5 animate-spin" />
                          <span className="animate-pulse">Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <SparklesIcon className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  </button>
                </form>

                {/* Enhanced Sign Up Link */}
                <div className="mt-10 text-center">
                  <Link to="/signup" className="auth-link group relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Don't have an account?
                      <span className="text-cyan-400 font-bold group-hover:text-cyan-300 transition-colors duration-300">
                        Join Now
                      </span>
                    </span>
                    <div className="absolute inset-0 bg-cyan-400/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-lg"></div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Enhanced FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-8 bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-purple-900/20 relative overflow-hidden">
              {/* Enhanced Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }}></div>
              </div>
              
              {/* Enhanced Animated gradient orbs */}
              <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-pulse group hover:scale-150 transition-transform duration-1000"></div>
              <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl animate-pulse group hover:scale-150 transition-transform duration-1000" style={{animationDelay: '2s'}}></div>
              
              <div className="relative z-10 text-center">
                <div className="relative group">
                  <img
                    src="/login.png"
                    alt="People using mobile devices"
                    className="w-full max-w-md h-auto object-contain transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Enhanced Floating elements */}
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-cyan-400/30 rounded-full animate-bounce shadow-lg shadow-cyan-400/20 group-hover:scale-125 transition-transform duration-300"></div>
                  <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-purple-400/30 rounded-full animate-bounce shadow-lg shadow-purple-400/20 group-hover:scale-125 transition-transform duration-300" style={{animationDelay: '0.3s'}}></div>
                  <div className="absolute top-1/2 -right-8 w-8 h-8 bg-cyan-400/20 rounded-full animate-bounce group-hover:scale-125 transition-transform duration-300" style={{animationDelay: '0.6s'}}></div>
                </div>
                
                <div className="mt-10 space-y-6">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                    Connect Instantly
                  </h3>
                  <p className="text-slate-400 text-xl max-w-md mx-auto leading-relaxed">
                    Seamless access across all your devices with enterprise-grade security
                  </p>

                  <div className="flex justify-center gap-4 mt-8">
                    <span className="auth-badge group hover:scale-110 hover:rotate-3 transition-all duration-300">
                      <ZapIcon className="w-5 h-5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 mr-3" />
                      Lightning Fast
                    </span>
                    <span className="auth-badge group hover:scale-110 hover:-rotate-3 transition-all duration-300">
                      <ShieldIcon className="w-5 h-5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 mr-3" />
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

export default LoginPage;