const Loading = ({center}) => {
	return (
		<div className={center ? "loading loading-center" : "loading"}>Loading</div>
	);
};

export default Loading;
