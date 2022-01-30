import React from 'react'
import "./pagination.css"

export const Pagination = ({ projectsPerPage , totalProject , paginate}) => {

    const pageNumbers = [];

    for(let i =1; i <= Math.ceil(totalProject / projectsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <h3 onClick={() => paginate(number) } className='page-link'>
                            {number}
                        </h3>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
