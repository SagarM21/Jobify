import moment from "moment";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import JobInfo from "./JobInfo";
import Wrapper from "../assets/wrappers/Job";

const Job = ({
	_id,
	position,
	jobLocation,
	jobType,
	status,
	company,
	createdAt,
}) => {
	const { setEditJob, deleteJob } = useAppContext();

	let date = moment(createdAt);
	date = date.format("MMM Do, YYYY");
	return (
		<Wrapper>
			<header>
				<div className='main-icon'>{company.charAt(0)}</div>
				<div className='info'>
					<h5>{position}</h5>
					<h5>{company}</h5>
				</div>
			</header>
			<div className='content'>
				<div className='content-center'>
					<JobInfo icon={<FaLocationArrow />} text={jobLocation} />
					<JobInfo icon={<FaCalendarAlt />} text={date} />
					<JobInfo icon={<FaBriefcase />} text={status} />
					<div className={`status ${status}`}>{status}</div>
				</div>
				<footer>
					<div className='actions'>
						<Link
							to='/add-job'
							onClick={() => setEditJob(_id)}
							className='btn edit-btn'
						>
							Edit
						</Link>
						<button
							type='button'
							onClick={() => deleteJob(_id)}
							className='btn delete-btn'
						>
							Delete
						</button>
					</div>
				</footer>
			</div>
		</Wrapper>
	);
};

export default Job;
