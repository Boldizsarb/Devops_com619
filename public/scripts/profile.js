function Pois({ title }) {
  let currentUser = [];
  let currentUserUsername = "";

  function editUser(id) {
    alert("shared");
  }
    fetch(`http://localhost:3000/user/verifylogin`, {
      method: "GET",
    })
      //.then((response) =>response.json())
      .then((response) => {
        if (response.status == 404) {
          alert("No User logged In");
        }
        return response.json();
      })
      .then((data) => {
        fetch(
          `http://localhost:3000/user/users/username/${data.username}`,
          {
            method: "GET",
          }
        )
          //.then((response) =>response.json())
          .then((response) => {
            if (response.status == 404) {
              alert("No user information available");
            }
            return response.json();
          })
          .then((data) => {
            currentUser = data;
            console.log(currentUser);
          });
      });
  /////////////////////////////////////////////// (13) till here
  return (
    <div>
      <h3>{title}</h3>
      <div className="d-sm-flex align-items-center mb-4">
        {currentUser.length > 0 ? (
          currentUser.map((item) => (
            <div key={item.id}>
              <p>Username: {item.username}</p>
              <p>Email: {item.email}</p>
              <p>Level: {item.permission_level}</p>
              <p>
                <button
                  className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                  id="recomendbut"
                  onClick={() => editUser(item.id)}
                >
                  Edit
                </button>
              </p>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Pois title="User Information" />);
