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

  // Easier password strength - only check length
  const getPasswordStrength = () => {
    if (!formData.password) return 0;
    if (formData.password.length >= 12) return 100;
    if (formData.password.length >= 8) return 75;
    if (formData.password.length >= 6) return 50;
    if (formData.password.length >= 4) return 25;
    return 0;
  };

  const passwordStrength = getPasswordStrength();

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
              {/* Simple top badge */}
              <div className="absolute top-6 left-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                  <ShieldIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-cyan-400">Secure Signup</span>
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
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        onFocus={() => handleInputFocus('fullName')}
                        onBlur={handleInputBlur}
                        className={`input pl-12 transition-all duration-300 ${
                          focusedField === 'fullName' 
                            ? 'border-cyan-400/50 shadow-lg shadow-cyan-400/10' 
                            : 'border-slate-600/30'
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
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => handleInputFocus('email')}
                        onBlur={handleInputBlur}
                        className={`input pl-12 transition-all duration-300 ${
                          focusedField === 'email' 
                            ? 'border-cyan-400/50 shadow-lg shadow-cyan-400/10' 
                            : 'border-slate-600/30'
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
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onFocus={() => handleInputFocus('password')}
                        onBlur={handleInputBlur}
                        className={`input pl-12 pr-12 transition-all duration-300 ${
                          focusedField === 'password' 
                            ? 'border-cyan-400/50 shadow-lg shadow-cyan-400/10' 
                            : 'border-slate-600/30'
                        }`}
                        placeholder=" Enter your password"
                      />
                      <LockIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === 'password' ? 'text-cyan-400' : 'text-slate-500'
                      }`} />
                      
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors duration-300"
                      >
                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Simplified Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Password strength</span>
                          <span className={passwordStrength >= 75 ? "text-green-400" : passwordStrength >= 50 ? "text-yellow-400" : "text-orange-400"}>
                            {passwordStrength >= 75 ? "Strong" : passwordStrength >= 50 ? "Good" : "Weak"}
                          </span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              passwordStrength >= 75 ? "bg-green-400" : passwordStrength >= 50 ? "bg-yellow-400" : "bg-orange-400"
                            }`}
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-slate-500">
                          {formData.password.length < 6 ? "At least 6 characters recommended" : "Looks good!"}
                        </div>
                      </div>
                    )}
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

               <div className="mt-8 pt-4 pb-4 text-center">
  <p className="text-slate-400">
    Already have an account?{" "}
    <Link to="/login" className="auth-link  inline-flex items-center gap-1">
      Sign in here
      <span className="group-hover:translate-x-1 transition-transform duration-300"> →</span>
    </Link>
  </p>
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