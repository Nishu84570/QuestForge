import { useState } from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { apiRequest } from '../services/api';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] =
    useState('');
  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const {
        response,
        data,
      } = await apiRequest('/users', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      if (!response.ok) {
        setError(
          data?.message ||
            data?.error ||
            'Registration failed.'
        );
        return;
      }

      setSuccess(
        'Account created successfully! Redirecting to login...'
      );

      setName('');
      setEmail('');
      setPassword('');

      setTimeout(() => {
        navigate('/login', {
          replace: true,
        });
      }, 1200);
    } catch (err) {
      console.error(
        'Registration error:',
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
          Create Account 🚀
        </h1>

        <p>
          Join QuestForge and start your journey.
        </p>

        <form
          onSubmit={handleRegister}
          style={{
            marginTop: '25px',
          }}
        >
          <label
            htmlFor="register-name"
            style={{
              display: 'block',
              marginBottom: '7px',
            }}
          >
            Name
          </label>

          <input
            id="register-name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setError('');
            }}
            autoComplete="name"
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
            htmlFor="register-email"
            style={{
              display: 'block',
              marginBottom: '7px',
            }}
          >
            Email
          </label>

          <input
            id="register-email"
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
            htmlFor="register-password"
            style={{
              display: 'block',
              marginBottom: '7px',
            }}
          >
            Password
          </label>

          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError('');
            }}
            autoComplete="new-password"
            required
            minLength={6}
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

          {success && (
            <div
              className="empty-card"
              style={{
                marginBottom: '15px',
                padding: '12px',
              }}
            >
              <p
                style={{
                  color: '#16a34a',
                  margin: 0,
                }}
              >
                {success}
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
              ? 'Creating account...'
              : 'Create Account'}
          </button>
        </form>

        <p
          style={{
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          Already have an account?{' '}

          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;