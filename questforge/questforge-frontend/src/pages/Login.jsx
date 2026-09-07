import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { apiRequest } from '../services/api';
import { setAuth } from '../utils/auth';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const { response, data } =
        await apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        });

      if (!response.ok) {
        setError(
          data?.message ||
            data?.error ||
            'Invalid email or password.'
        );

        return;
      }

      if (!data?.token) {
        setError(
          'Login succeeded, but no authentication token was returned.'
        );

        return;
      }

      setAuth(data);

      window.dispatchEvent(
        new Event('questforge-auth-change')
      );

      if (data.role === 'ADMIN') {
        navigate('/admin', {
          replace: true,
        });
      } else {
        navigate('/challenges', {
          replace: true,
        });
      }
    } catch (err) {
      console.error(
        'Login error:',
        err
      );

      setError(
        'Unable to connect to QuestForge backend.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">

      <div className="login-card">

        <p className="eyebrow">
          QUESTFORGE
        </p>

        <h1>
          Welcome Back 👋
        </h1>

        <p>
          Login to continue your quest.
        </p>

        <form
          onSubmit={handleLogin}
          style={{
            marginTop: '25px',
          }}
        >

          <label
            htmlFor="login-email"
            style={{
              display: 'block',
              marginBottom: '7px',
            }}
          >
            Email
          </label>

          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError('');
            }}
            autoComplete="email"
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              boxSizing: 'border-box',
            }}
          />

          <label
            htmlFor="login-password"
            style={{
              display: 'block',
              marginBottom: '7px',
            }}
          >
            Password
          </label>

          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError('');
            }}
            autoComplete="current-password"
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              boxSizing: 'border-box',
            }}
          />

          {error && (
            <div
              className="empty-card"
              style={{
                marginBottom: '15px',
                padding: '12px',
              }}
            >
              <p className="error-text">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
            style={{
              width: '100%',
            }}
          >
            {loading
              ? 'Logging in...'
              : 'Login'}
          </button>

        </form>

        <p
          style={{
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          Don't have an account?{' '}

          <Link to="/register">
            Create one
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;