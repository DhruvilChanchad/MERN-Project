import React, {useState , useEffect} from 'react'
import './projectlist.css'
import Projects from './Projects';
import { Pagination } from '../../components/pagination/Pagination';
import axios from 'axios'

const ProjectList = () => {

    const [projectlist ,setProjectlist] = useState([]);
    const [loading , setLoading] = useState([false]);
    const [currentPage , setCurrentPage] = useState(1);
    const [projectPerPage, setProjectPerPage] = useState(5);
    const [searchdata , setSearchData] = useState("");

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            const res = await axios.get('http://localhost:9002/projects');
            console.log(res.data)
            setProjectlist(res.data)
            setLoading(false)
        }

        fetchProject();
    }, [])

    function search(rows) {
        return rows.filter(
            (row) => 
                row.projectName.toLowerCase().indexOf(searchdata) > -1 ||
                row.type.toLowerCase().indexOf(searchdata) > -1 ||
                row.division.toLowerCase().indexOf(searchdata) > -1 ||
                row.category.toLowerCase().indexOf(searchdata) > -1 ||
                row.priority.toLowerCase().indexOf(searchdata) > -1 ||
                row.department.toLowerCase().indexOf(searchdata) > -1 ||
                row.location.toLowerCase().indexOf(searchdata) > -1 ||
                row.status.toLowerCase().indexOf(searchdata) > -1 

        );
    }

    // get Current Projects
    const indexOfLastProjectlist = currentPage * projectPerPage;
    const indexOfFirstProjectlist = indexOfLastProjectlist - projectPerPage;
    const currentProjectlist = projectlist.slice(indexOfFirstProjectlist, indexOfLastProjectlist)

    //Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='projectlist'>
        <div className='container mt-3'>
            <div className="search-container">

                <input type="text" value={searchdata} onChange={(e) => setSearchData(e.target.value)} placeholder='Search...' />

            </div>
            <center><h1 className='text-primary'>My Projects</h1></center>
            <Projects projectlist={search(currentProjectlist)} loading={loading}/>
            <div className="paginate">
                <Pagination projectsPerPage={(projectPerPage)} totalProject={projectlist.length} paginate={paginate} />
            </div>
            <div className='perpageoption' >
                <label htmlFor="perpageoption">Projects Per Page</label>
                <select name="perpageoption" id="perpageoption" value={projectPerPage} onChange={(e)=>setProjectPerPage(e.target.value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="100">All</option>
                </select>
            </div>
        </div>
        </div>
    );
};

export default ProjectList
