function Cookies() {

  function acceptCookies(){}

  function cookiesDenied(){}

  return (
    <div 
    style={{ position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        background: "#2f3640",
        color: "#f5f6fa",
        padding: "0 32px",
        borderRadius: "8px",
        transition: "400ms" }}>
            <p>
            We use cookies in this website to give you the best experience on our site and show you relevant ads. To find out more, read our
            </p>
            <button
              className="d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              id="accept"
              value=""
              onClick={acceptCookies}
            >
                Accept
            </button>

            <button
              className="d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              id="denie"
              value=""
              onClick={cookiesDenied}
              style={{float: "right"}}
            >
                Denie
            </button>
        
    </div>
  );
}

const cookies = ReactDOM.createRoot(document.getElementById("cookies"));
cookies.render(<Cookies />);
