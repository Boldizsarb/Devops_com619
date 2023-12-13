function Cookies() {
  React.useEffect(() => {
    const cookieWrapper = document.getElementById("popupWrapper"),
      cookieButtons = document.querySelectorAll(".cookieButton");

    if (document.cookie.includes("devops")) {
      cookieWrapper.style.display = "none";
    } else {
      cookieButtons.forEach((cookieButton) => {
        cookieButton.addEventListener("click", () => {
          cookieWrapper.style.display = "none";

          if (cookieButton.id == "acceptBtn") {
            console.log("accept");
            document.cookie = "cookieBy= devops; max-age=" + 60 * 60 * 24 * 30;
          }
        });
      });
    }
  }, []);

  return (
    <div class="popupWrapper" id="popupWrapper">
      <header>
        <h2 id="cookies-consent-heading">Cookies Consent</h2>
      </header>

      <div class="data">
        <p id="cookies-info">
          We use cookies in this website to give you the best experience on our
          site.
        </p>
      </div>

      <div class="cookiesButtons">
        <button class="cookieButton" id="acceptBtn">
          Accept
        </button>

        <button class="cookieButton" id="declineBtn" style={{ float: "right" }}>
          Decline
        </button>
      </div>
    </div>
  );
}

const cookies = ReactDOM.createRoot(document.getElementById("cookies"));
cookies.render(<Cookies />);
