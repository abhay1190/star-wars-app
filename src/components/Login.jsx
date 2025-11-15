import { useState } from 'react';
import { login } from '../utils/auth';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    
    if (result.success) {
      onLogin();
    } else {
      setError('Invalid credentials. Try admin/password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      
      <div className="relative z-10 bg-black/60 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-yellow-500/30 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-2 tracking-wider">
            STAR WARS
          </h1>
          <p className="text-yellow-400/70 text-sm tracking-widest">GALACTIC DATABASE</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-yellow-400/90 mb-2 text-sm font-semibold tracking-wide">USERNAME</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/80 text-white rounded-lg border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-yellow-400/90 mb-2 text-sm font-semibold tracking-wide">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/80 text-white rounded-lg border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              placeholder="Enter password"
            />
          </div>
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 shadow-lg shadow-yellow-500/50"
          >
            ACCESS SYSTEM
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs mb-1">Demo Credentials:</p>
          <p className="text-yellow-400 text-xs">
            admin / password | user / pass123 | demo / demo123
          </p>
        </div>
      </div>
      
      <style>{`
        .stars, .stars2, .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        
        .stars {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"><circle cx="1" cy="1" r="1" fill="white"/></svg>') repeat;
          animation: animateStars 50s linear infinite;
        }
        
        .stars2 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3" height="3"><circle cx="1.5" cy="1.5" r="1" fill="white"/></svg>') repeat;
          animation: animateStars 100s linear infinite;
        }
        
        .stars3 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"><circle cx="2" cy="2" r="1.5" fill="white"/></svg>') repeat;
          animation: animateStars 150s linear infinite;
        }
        
        @keyframes animateStars {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
      `}</style>
    </div>
  );
};

export default Login;
