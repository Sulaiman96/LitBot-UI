import logo from "@/assets/images/logo.png";
import {useState, useEffect} from "react";
import {useAuthStatus} from "@/hooks/useAuthStatus.tsx";
import { NavLink } from "react-router";

const MainNavigationBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const status = useAuthStatus();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({behavior: "smooth"});
		}
		setIsMenuOpen(false);
	};

	return (
		<div className={'main-naviagtion'}>
			<div className="py-12 bg-outer-space"></div>
			<nav className="w-full px-4 md:px-8 flex items-center justify-between bg-outer-space text-bone-dark font-nunito fixed top-0 left-0 z-50">
				<div className="logo flex items-center space-x-2">
					<img src={logo} alt="LitBot Logo" className="h-8 w-8"/>
					<span
						className="text-xl font-bold tracking-wide"
						style={{color: "var(--bone-dark)"}}
					>
          LitBot
        </span>
				</div>

				<div className="navigation-links hidden md:flex items-center space-x-9 ml-auto mr-12.5">
					<a
						href="#about"
						className="text-base font-medium hover:underline"
					>
						About
					</a>
					<a
						href="#features"
						className="text-base font-medium hover:underline"
					>
						Features
					</a>
					<a
						href="#pricing"
						className="text-base font-medium hover:underline"
					>
						Pricing
					</a>
				</div>
				{
					status === "unauthenticated" ? (
						<div className="login-or-register-buttons flex items-center space-x-5.5">
							<button className="px-4 py-1 rounded-md text-sm font-semibold bg-bone-dark text-outer-space">
								<NavLink to="/account?action=login">
									Log in
								</NavLink>
							</button>
							<button className="px-4 py-1 rounded-md text-sm font-semibold bg-bone-dark text-outer-space">
								<NavLink to="/account?action=register">
									Create Free Account
								</NavLink>
							</button>
						</div>
					) : (
						<button className="px-4 py-1 rounded-md text-sm font-semibold bg-bone-dark text-outer-space">
							<NavLink to="summarization">
								Dashboard
							</NavLink>
						</button>
					)
				}
			</nav>
		</div>
	);
};

export default MainNavigationBar;
