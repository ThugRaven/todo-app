import React from 'react';

export default class GoToTopButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: false,
			fade: false,
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', this.toggleBtn);
	}

	toggleBtn = () => {
		if (window.scrollY > 0 && !this.state.isVisible) {
			this.setState({ isVisible: true, fade: true });
		} else if (window.scrollY === 0 && this.state.isVisible) {
			this.setState({ fade: false });
		}
	};

	componentWillUnmount() {
		window.removeEventListener('scroll', this.toggleBtn);
	}

	handleAnimationEnd = () => {
		if (!this.state.fade && this.state.isVisible) {
			this.setState({ isVisible: false, fade: true });
		}
	};

	render() {
		return (
			<>
				{this.state.isVisible && (
					<button
						className={`up-button ${this.state.fade ? 'fade-in' : 'fade-out'}`}
						onAnimationEnd={this.handleAnimationEnd}
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
}
