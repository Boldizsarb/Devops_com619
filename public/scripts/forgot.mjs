function ForgotPasswordForm(title) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }
    try {
      //Extract the token from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const response = await fetch("/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: password,
          confirmPassword: confirmPassword,
          token: token,
        }),
      });
      if (response.ok) {
        setMessage("Password reset successful!");
        window.location.href = "/login";
      } else {
        setMessage("Password reset failed!");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred");
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <form onSubmit={handleSubmit}>
          <label htmlFor="newPassword">New Password</label>
          <input
            id="New Password"
            type="password"
            name="newPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-control-user"
          />
          <br />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control form-control-user"
          />
          <br />
          <button id="reset-password-button" type="submit" className="btn btn-primary btn-user btn-block">
            Reset Password
          </button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ForgotPasswordForm title="Reset Password" />);
