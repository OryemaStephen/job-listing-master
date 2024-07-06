import { useEffect, useState } from "react";
import Job from "./Job";


const JobWrapper = () => {
    const [jobs, setJobs] = useState([])

    useEffect(()=>{
        fetch('/data.json')
        .then((response)=>response.json())
        .then((data)=>{
          setJobs(data);
        })
        .catch((error)=>console.log(error))
    },[]);

  return (
    <div className="jobs">
        <Job jobs={jobs} />
    </div>
  )
}

export default JobWrapper;