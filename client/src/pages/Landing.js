import React from "react";
import { Logo } from "../components";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						Job <span>tracking</span> app
					</h1>
					<p>
						I'm baby vape semiotics kogi mustache, austin umami next level.
						Activated charcoal biodiesel chia, freegan ramps man braid paleo
						bicycle rights heirloom tilde locavore 90's man bun leggings. Ugh
						you probably haven't heard of them forage lomo, copper mug VHS
						aesthetic hashtag bespoke bushwick.
					</p>
					<Link to='/register' className='btn btn-hero'>
						Login/Register
					</Link>
				</div>
				<img src={main} alt='job hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
};

export default Landing;
