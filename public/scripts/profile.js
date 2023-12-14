function Profile({ title }) {
  function editUser(id) {
    alert("shared", { id });
  }

  async function getUserDetails() {
    const username = await (
      await fetch(`http://comdevops.uksouth.cloudapp.azure.com/user/verifylogin`)
    ).json();
    if (username.username) {
      const userDetails = await (
        await fetch(
          `http://comdevops.uksouth.cloudapp.azure.com/user/users/username/${username.username}`
        )
      ).json();
      if (userDetails) {
        return userDetails;
      }
    } else {
      alert("You need to be logged in to use this page");
      window.location.href = "/";
    }
  }

  return (
    <div>
      <LoadProfile
        getUserDetails={getUserDetails}
        title={title}
        edirUser={editUser}
      />
    </div>
  );
}

function LoadProfile({ getUserDetails, title, editUser }) {
  getUserDetails()
    .then((response) => {
      if (response.status == 404) {
        alert("No details available");
      }
      return response;
    })
    .then((data) => {
      console.log(data);
      document.getElementById(
        "profileContent"
      ).innerHTML = `<div key=${data.id}>
      <p id="profile-username"><b>Username:</b> ${data.username}</p>
      <p id="profile-email"><b>Email:</b> ${data.email}</p>
      <p id="profile-level"><b>Level:</b> ${data.permission_level}</p>
      <p>
      </p>
    </div>`;
    });

  return (
    <div>
      <h3>{title}</h3>
      <div
        className="d-sm-flex align-items-center mb-4"
        id="profileContent"
      ></div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Profile title="User Information" />);
