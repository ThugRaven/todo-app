import React, { useEffect, useState } from 'react';

export default function GoToTopButton(props) {
	const [isVisible, setIsVisible] = useState(false);
	const [fade, setFade] = useState(false);

	useEffect(() => {
		function toggleBtn() {
			if (window.scrollY > 0 && !isVisible) {
				setIsVisible(true);
				setFade(true);
			} else if (window.scrollY === 0 && isVisible) {
				setFade(false);
			}
		}

		window.addEventListener('scroll', toggleBtn);
		return () => {
			window.removeEventListener('scroll', toggleBtn);
		};
	}, [isVisible, fade]);

	function handleAnimationEnd() {
		if (!fade && isVisible) {
			setIsVisible(false);
			setFade(true);
		}
	}

	return (
		<>
			{isVisible && (
				<button
					className={`up-button ${fade ? 'fade-in' : 'fade-out'}`}
					onAnimationEnd={handleAnimationEnd}
				>
					<a href="#todo-list">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 0 24 24"
							width="24px"
							fill="#000000"
							className="up-button__icon"
						>
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
						</svg>
					</a>
				</button>
			)}
		</>
	);
}
