import { PropTypes } from "prop-types";
import classNames from 'classnames';
import { useState } from "react";

const Job = ({ jobs }) => {
  const [roleFilter, setRoleFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  //Filter jobs based on selected option
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "role") setRoleFilter(value);
    if (name === "level") setLevelFilter(value);
    if (name === "language") setLanguageFilter(value);
  };

  //Clear filters
  const handleClearFilters = () => {
    setRoleFilter("");
    setLevelFilter("");
    setLanguageFilter("");
  };

  //Filter jobs to display
  const filteredJobs = jobs.filter((job) => {
    const matchesRole = roleFilter === "" || job.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesLevel = levelFilter === "" || job.level.toLowerCase() === levelFilter.toLowerCase();
    const matchesLanguage = languageFilter === "" || job.languages.map(lang => lang.toLowerCase()).includes(languageFilter.toLowerCase());
    return matchesRole && matchesLevel && matchesLanguage;
  });

  return (
    <>
      <div className="filter">
        <div>
          <p>Specialties</p>
          <select name="role" value={roleFilter} onChange={handleFilterChange}>
            <option value="">Select</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Fullstack</option>
          </select>
        </div>
        <div>
          <p>Experience (level)</p>
          <select name="level" value={levelFilter} onChange={handleFilterChange}>
            <option value="">Select</option>
            <option value="junior">Junior</option>
            <option value="midweight">Midweight</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div>
          <p>Languages</p>
          <select name="language" value={languageFilter} onChange={handleFilterChange}>
            <option value="">Select</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="ruby">RUBY</option>
          </select>
        </div>
        {(roleFilter || levelFilter || languageFilter) && (
          <button className="clear-button" onClick={handleClearFilters}>
            Clear
          </button>
        )}
      </div>

      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <div className={classNames('job', { 'job-featured': job.featured })} key={job.id}>
            <div className="job-description">
              <img className="logo" src={job.logo} alt={job.company}/>
              <div className="desc">
                <div className="title">
                  <span className="name">{job.company}</span>
                  <span className={classNames({ new: job.new })}>
                    {job.new ? 'New!' : ''}
                  </span>
                  <span className={classNames({ feature: job.featured })}>
                    {job.featured ? 'Featured' : ''}
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
                <span className="role">{job.role}</span>
                <span className="level">{job.level}</span>
                <span>
                  {job.languages.map((language, index) => (
                    <span className="language" key={index}>{language}</span>
                  ))}
                </span>
                <span>
                  {job.tools.map((tool, index) => (
                    <span className="tool" key={index}>{tool}</span>
                  ))}
                </span>
              </div>
              <div>
                <button className="apply-button" onClick={()=>alert('Function under development!')}>Apply</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No jobs match the selected filters.</p>
      )}
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
