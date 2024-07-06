import { PropTypes } from "prop-types";

const Job = ({ jobs }) => {
  return (
    <>
        {jobs.map((job) => (
          <div className="job" key={job.id}>
            <div className="job-descrition">
              <img className="logo" src={job.logo} alt={job.company}/>
              <div className="desc">
                <div className="title">
                  <span>{job.company}</span>
                  <span>{job.new?'New':''}</span>
                  <span>{job.featured?'Featured':''}</span>
                </div>
                <div className="position">
                  {job.position}
                </div>
                <div className="extra-details">
                  <span>{job.postedAt}</span>
                  <span>{job.contract}</span>
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            <div className="skills">
              <span>{job.role}</span>
              <span>{job.level}</span>
              <span>{job.languages}</span>
              <span>{job.tool}</span>
            </div>
          </div>
        ))}
    </>
  );
};

Job.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Job;
