import { PropTypes } from "prop-types";
import classNames from 'classnames';
import { useState } from "react";

const Job = ({ jobs }) => {
  const [filters, setFilters] = useState([]);

  const handleFilterClick = (filterText) => {
    if (!filters.includes(filterText)) {
      setFilters([...filters, filterText]);
    }
  };

  const handleClearFilters = () => {
    setFilters([]);
  };

  const filteredJobs = filters.length
    ? jobs.filter((job) =>
        filters.every(
          (filter) =>
            job.role === filter ||
            job.level === filter ||
            job.languages.includes(filter) ||
            job.tools.includes(filter)
        )
      )
    : jobs;

  return (
    <>
        <div className="filter">
          <div>
            <p>Specialties</p>
            <select name="role" id="role">
              <option value="select">Select</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
            </select>
          </div>
          <div>
            <p>Experience (level)</p>
            <select name="level" id="level">
              <option value="">Select</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          <div>
            <p>Languages</p>
            <select name="language" id="language">
              <option value="select">Select</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
              <option value="html">HTML</option>
            </select>
          </div>
          {filters.length > 0 && (
            <button className="clear-button" onClick={handleClearFilters}>
              Clear
            </button>
          )}
        </div>
        
        {filteredJobs.map((job) => (
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
                <button className="role" onClick={() => handleFilterClick(job.role)}>{job.role}</button>
                <button className="level" onClick={() => handleFilterClick(job.level)}>{job.level}</button>
                <span>
                  {job.languages.map((language, index) => (
                    <button className="language" key={index} onClick={() => handleFilterClick(language)}>{language}</button>
                  ))}
                </span>
                <span>
                  {job.tools.map((tool, index) => (
                    <button className="tool" key={index} onClick={() => handleFilterClick(tool)}>{tool}</button>
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
