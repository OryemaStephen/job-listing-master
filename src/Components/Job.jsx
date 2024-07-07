import { PropTypes } from "prop-types";
import classNames from 'classnames';

const Job = ({ jobs }) => {
  return (
    <>
        {jobs.map((job) => (
          <div className={classNames('job', { 'job-featured': job.featured })} key={job.id}>
            <div className="job-descrition">
              <img className="logo" src={job.logo} alt={job.company}/>
              <div className="desc">
                <div className="title">
                  <span className="name">{job.company}</span>
                  <span className={classNames({ new: job.new })}>
                    {job.new?'New!':''}
                  </span>
                  <span className={classNames({ feature: job.featured })}>
                    {job.featured?'Featured':''}
                  </span>
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
              <div>
                <button className="role">{job.role}</button>
                <button className="level">{job.level}</button>
                <span>
                  {job.languages.map((language, index) => (
                    <button className="language" key={index}>{language}</button>
                  ))}
                </span>
                <span>
                  {job.tools.map((tool, index) => (
                    <button className="tool" key={index}>{tool}</button>
                  ))}
                </span>
              </div>
              <div>
                <button className="apply-button">Apply</button>
              </div>
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
      company: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      new: PropTypes.bool.isRequired,
      featured: PropTypes.bool.isRequired,
      position: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      postedAt: PropTypes.string.isRequired,
      contract: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      languages: PropTypes.arrayOf(PropTypes.string).isRequired,
      tools: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default Job;
