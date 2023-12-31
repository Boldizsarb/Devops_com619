function useScript() {
	React.useEffect(() => {
		// Toggle the side navigation
		$("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
			$("body").toggleClass("sidebar-toggled");
			$(".sidebar").toggleClass("toggled");
			if ($(".sidebar").hasClass("toggled")) {
				$(".sidebar .collapse").collapse("hide");
			}
		});

		// Close any open menu accordions when window is resized below 768px
		$(window).resize(function () {
			if ($(window).width() < 768) {
				$(".sidebar .collapse").collapse("hide");
			}

			// Toggle the side navigation when window is resized below 480px
			if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
				$("body").addClass("sidebar-toggled");
				$(".sidebar").addClass("toggled");
				$(".sidebar .collapse").collapse("hide");
			}
		});

		// Prevent the content wrapper from scrolling when the fixed side navigation hovered over
		$("body.fixed-nav .sidebar").on(
			"mousewheel DOMMouseScroll wheel",
			function (e) {
				if ($(window).width() > 768) {
					var e0 = e.originalEvent,
						delta = e0.wheelDelta || -e0.detail;
					this.scrollTop += (delta < 0 ? 1 : -1) * 30;
					e.preventDefault();
				}
			}
		);

		// Scroll to top button appear
		$(document).on("scroll", function () {
			var scrollDistance = $(this).scrollTop();
			if (scrollDistance > 100) {
				$(".scroll-to-top").fadeIn();
			} else {
				$(".scroll-to-top").fadeOut();
			}
		});

		// Smooth scrolling using jQuery easing
		$(document).on("click", "a.scroll-to-top", function (e) {
			var $anchor = $(this);
			$("html, body")
				.stop()
				.animate(
					{
						scrollTop: $($anchor.attr("href")).offset().top,
					},
					1000,
					"easeInOutExpo"
				);
			e.preventDefault();
		});
	}, []);
}

function AppWidget({ area }) {
	const [loggedInUser, setLoggedInUser] = React.useState("");
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	async function verifyLogin(event) {
		const loggeduser = await fetch(`http://localhost:3000/user/verifylogin`);
		const user = await loggeduser.json();
		if (user.username) {
			localStorage.setItem("loggedInUser", JSON.stringify(user));
			setLoggedInUser(user.username);
			setIsLoggedIn(true);
		} else {
			setLoggedInUser("");
			setIsLoggedIn(false);
		}
	}

	function handleLogin(username, password) {
		const loginDetails = { username, password };
		fetch("/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginDetails),
		})
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((data) => {
				if (data.error) {
					throw new Error(data.error);
				}
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error during login:", error);
				alert(`Login error: ${error.message}`);
			});
	}

	async function logoutUser(setIsLoggedIn, setCurrentUser) {
		try {
			const response = await fetch("/user/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include", // if you're using session cookies
			});

			if (response.ok) {
				// Logout successful
				alert("You have been logged out.");
				// Optionally redirect to login page or home page
				window.location.reload();
			} else {
				throw new Error("Logout failed");
			}
		} catch (error) {
			console.error("Logout error:", error);
			alert("An error occurred during logout. Please try again.");
		}
	}

	if (area == "sidebar") {
		return (
			<div>
				<SideBar
					verifyLogin={verifyLogin}
					loggedInUser={loggedInUser}
					isLoggedIn={isLoggedIn}
				/>
			</div>
		);
	} else if (area == "topbar") {
		return (
			<div>
				<TopBar
					verifyLogin={verifyLogin}
					loggedInUser={loggedInUser}
					logoutUser={logoutUser}
					isLoggedIn={isLoggedIn}
					handleLogin={handleLogin}
				/>
			</div>
		);
	} else {
		return (
			<div>
				<Footer />
			</div>
		);
	}
}

function SideBar({ verifyLogin, loggedInUser, isLoggedIn }) {
	verifyLogin();
	return (
		<ul
			className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
			id="accordionSidebar"
		>
			<a
				id="Dev Ops"
				className="sidebar-brand d-flex align-items-center justify-content-center"
				href="index.html"
			>
				<div className="sidebar-brand-icon rotate-n-15">
					<i className="fas fa-laugh-wink"></i>
				</div>
				<div className="sidebar-brand-text mx-3">Dev Ops</div>
			</a>

			<hr className="sidebar-divider my-0" />

			<li className="nav-item active">
				<a id="Main Page" className="nav-link" href="/">
					<i className="fas fa-fw fa-tachometer-alt"></i>
					<span>Main Page</span>
				</a>
			</li>

			{isLoggedIn && loggedInUser != "admin" ? (
				<div>
					<hr className="sidebar-divider" />
					<li className="nav-item">
						<a
							id="All Pois (Points of Interest)"
							className="nav-link"
							href="/public/pois.html"
						>
							<i className="fas fa-fw fa-table"></i>
							<span>All Poi's</span>
						</a>
					</li>
				</div>
			) : (
				""
			)}
			{isLoggedIn && loggedInUser == "admin" ? (
				<div>
					<hr className="sidebar-divider" />

					<li className="nav-item">
						<a
							id="All Pois (Points of Interest)-loggedin"
							className="nav-link"
							href="/public/pois.html"
						>
							<i className="fas fa-fw fa-table"></i>
							<span>All Poi's</span>
						</a>
					</li>

					<hr className="sidebar-divider" />

					<li className="nav-item">
						<a id="Users" className="nav-link" href="/public/users.html">
							<i className="fas fa-fw fa-table"></i>
							<span>Users</span>
						</a>
					</li>
				</div>
			) : (
				""
			)}
			<hr className="sidebar-divider" />
			<li className="nav-item">
				<a id="Swagger API" className="nav-link" href="/api-docs">
					<i className="fas fa-fw fa-wrench"></i>
					<span>Swagger API</span>
				</a>
			</li>

			<hr className="sidebar-divider" />
			<li className="nav-item">
				<a
					id="Monitoring"
					className="nav-link"
					href="https://my.pingdom.com/app/reports/uptime#check=12833055&daterange=7days&tab=result_tab&checkName=Azure%20Cloudapp%20Uksouth%20Comdevops"
				>
					<i className="fas fa-fw fa-wrench"></i>
					<span>Monitoring</span>
				</a>
			</li>

			<hr className="sidebar-divider" />
			<li className="nav-item">
				<a id="Apache Licence" className="nav-link" href="/public/apache.html">
					<i className="fas fa-fw fa-wrench"></i>
					<span>Apache Licence</span>
				</a>
			</li>

			<hr className="sidebar-divider" />
			<div
				className="text-center d-none d-md-inline"
				id="sidebarButtonToggleSideBar"
			>
				<button className="rounded-circle border-0" id="sidebarToggle"></button>
			</div>
		</ul>
	);
}

function TopBar({
	verifyLogin,
	loggedInUser,
	logoutUser,
	isLoggedIn,
	handleLogin,
}) {
	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [error, setError] = React.useState("");

	const handleLoginForm = (event) => {
		event.preventDefault();
		const username = document.getElementById("logUsername").value;
		const password = document.getElementById("logPassword").value;
		handleLogin(username, password);
	};

	const handleSignUp = () => {
		// Check if passwords match
		if (password !== confirmPassword) {
			setError("Passwords don't match!");
			return;
		}

		if (!username || !email || !password) {
			setError("Please fill in all fields");
			return;
		}

		const data = { username, email, password };

		// Send a POST request to the server user validation
		fetch("/user/checkusername", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (response.ok) {
					// If the username is available, send a POST request to the server to create a new user
					fetch("/user/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					})
						.then((response) => {
							if (response.ok) {
								// If the user was created successfully, redirect to the login page
								window.location.href = "/";
							}
						})
						.then(() => {
							// Handle successful signup
							setError("");
						})
						.catch((error) => {
							setError(error.message);
						});
				} else {
					setError("Username is already taken!");
				}
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	verifyLogin();
	console.log(loggedInUser);
	console.log(isLoggedIn);
	document;
	return (
		<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
			<div id="topbarToggleButtonSidebar">
				<button
					id="sidebarToggleTop"
					className="btn btn-link d-md-none rounded-circle mr-3"
				>
					<i className="fa fa-bars"></i>
				</button>
			</div>
			<label id="Main Page" htmlFor="languageSelector">
				Select Language:
			</label>

			<select
				id="languageSelector"
				defaultValue="en"
				style={{ marginLeft: "5px" }}
				onChange={(e) => changeLanguage(e.target.value)}
			>
				<option value="en">English</option>
				<option value="de">Deutsch</option>
				<option value="fr">Français</option>
				<option value="hu">Magyar</option>
				<option value="es">Español</option>
				<option value="pt">Português</option>
				<option value="pl">Polski</option>
			</select>

			{isLoggedIn ? (
				<ul className="navbar-nav ml-auto">
					<li className="nav-item dropdown no-arrow">
						<a
							className="nav-link dropdown-toggle"
							href="#"
							id="userDropdown"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<span
								id="Welcome"
								className="mr-2 d-lg-inline text-gray-600 small"
							>
								Welcome {loggedInUser}
							</span>
							<img
								className="img-profile rounded-circle"
								src="../public/img/undraw_profile.svg"
							></img>
						</a>

						<div
							className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
							aria-labelledby="userDropdown"
						>
							<a id="Profile" className="dropdown-item" href="profile.html">
								<i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
								Profile
							</a>
							<div className="dropdown-divider"></div>
							<a id="Logout" className="dropdown-item" onClick={logoutUser}>
								<i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
								Logout
							</a>
						</div>
					</li>
				</ul>
			) : (
				<ul className="navbar-nav ml-auto">
					<li className="nav-item dropdown no-arrow mx-1">
						<a
							className="nav-link dropdown-toggle text-black-50"
							href="#"
							id="Login"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							LogIn
						</a>

						<div
							className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
							aria-labelledby="alertsDropdown"
						>
							<h6
								id="Please enter your details below"
								className="dropdown-header"
							>
								Please enter your details bellow
							</h6>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<form
									onSubmit={handleLoginForm}
									className="user"
									style={{ width: `100%` }}
								>
									<div className="form-group">
										<input
											type="text"
											placeholder="Enter Username"
											id="logUsername"
											className="form-control form-control-user"
											required
										/>
										<input
											type="password"
											placeholder="Enter Password"
											id="logPassword"
											className="form-control form-control-user"
											required
										/>
										<button
											id="login-button"
											type="submit"
											className="btn btn-primary btn-user btn-block"
										>
											Login
										</button>
									</div>
								</form>
							</a>
							<a
								id="Reset Password"
								className="dropdown-item text-center small text-gray-500"
								href="/public/verify.html"
							>
								Reset Password
							</a>
						</div>
					</li>
					<li className="nav-item dropdown no-arrow mx-1">
						<a
							className="nav-link dropdown-toggle text-black-50"
							href="#"
							id="alertsDropdown"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							SignUp
						</a>

						<div
							className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
							aria-labelledby="alertsDropdown"
						>
							<h6
								id="Please enter your details below"
								className="dropdown-header"
							>
								Please enter your details bellow
							</h6>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<form
									onSubmit={handleSignUp}
									className="user"
									style={{ width: `100%` }}
								>
									<div className="form-group">
										<input
											type="text"
											className="form-control form-control-user"
											placeholder="Enter Username"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											required
										/>
										<input
											type="email"
											className="form-control form-control-user"
											placeholder="Enter Email Address "
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
										<input
											type="password"
											className="form-control form-control-user"
											placeholder="Enter Password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
										<input
											type="password"
											className="form-control form-control-user"
											placeholder="Confirm Password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
										/>
										<input
											type="checkbox"
											id="terms"
											name="terms"
											value="Terms"
											required
										/>
										<label
											id="Please check the box if you agree with our"
											htmlFor="terms"
										>
											Please check the box if you agree with our{" "}
											<a id="Termsofuse" href="/public/terms.html">
												Terms of Use
											</a>
										</label>

										<button
											id="signup-button"
											type="submit"
											className="btn btn-primary btn-user btn-block"
										>
											Sign Up
										</button>
										{error && <p className="error">{error}</p>}
									</div>
								</form>
							</a>
						</div>
					</li>
				</ul>
			)}
		</nav>
	);
}

function Footer() {
	useScript();
	return (
		<footer className="sticky-footer bg-white">
			<div className="container my-auto">
				<div id="copyright-info" className="copyright text-center my-auto">
					<span>Copyright &copy; AE1 - Dev Ops team 2023</span>
				</div>
			</div>
			<a className="scroll-to-top rounded" href="#page-top">
				<i className="fas fa-angle-up"></i>
			</a>
		</footer>
	);
}

const sidebar = ReactDOM.createRoot(document.getElementById("sidebar"));
const topbar = ReactDOM.createRoot(document.getElementById("topbar"));
const footer = ReactDOM.createRoot(document.getElementById("footer"));

sidebar.render(<AppWidget area="sidebar" />);
topbar.render(<AppWidget area="topbar" />);
footer.render(<AppWidget area="footer" />);
