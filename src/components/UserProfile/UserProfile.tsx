import { useState } from "react";

import { useUserStore } from "@/store";

import styles from "./UserProfile.module.scss";

const UserProfile = () => {
  const { user, login, register, logout, isLoading, error } = useUserStore();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(username);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      username,
      name,
      avatar_url: "https://avatar.iran.liara.run/public/23",
      liked_articles: [],
    });
  };

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    logout();
    setName("");
    setUsername("");
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  if (user) {
    return (
      <div className={styles.profile}>
        <div className={styles.profile_name}>
          <img
            src={user.avatar_url}
            alt={`${user.name} avatar`}
            className={styles.profile_avatar}
          />
          <h2 className={styles.profile_title}> {user.name}</h2>{" "}
        </div>
        <div className={styles.profile_profileCard}>
          <div className={styles.profile_info}>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Liked Articles:</strong>{" "}
              {user.liked_articles ? user.liked_articles.length : 0}
            </p>
          </div>
        </div>

        <button onClick={handleLogout} className={styles.profile_logoutBtn}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.profile_form}
      onSubmit={mode === "login" ? handleLogin : handleRegister}
    >
      <h2>{mode === "login" ? "User Login" : "Register"}</h2>

      <div className={styles.formGroup}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
      </div>

      {mode === "register" && (
        <>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
        </>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.buttons}>
        <button type="submit" className="login" disabled={isLoading}>
          {isLoading ? "Loading..." : mode === "login" ? "Login" : "Register"}
        </button>

        <p className={styles.switchText}>
          {mode === "login" ? "New here?" : "Already have an account?"}
          <span onClick={toggleMode} className={styles.switchLink}>
            {mode === "login" ? "Register" : "Log in"}
          </span>
        </p>
      </div>
    </form>
  );
};

export default UserProfile;
