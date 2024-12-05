import { memo, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

const SearchSort = (props: any) => {
    const [sortByText,setSortByText] = useState('Sort by...');
    const [searchText,setSearchText] = useState("");
    const searchMovie = (event: any) => {
        props.handleSearch(event.target.value)
    }

    const sortBy = (e:any) => {
        setSortByText(e);
        props.handleSort(e)
    }
    return (
        <div className='search-wrapper d-flex align-item-center'>
            <Dropdown onSelect={sortBy}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" onChange={sortBy}>{sortByText}</Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Sort by..." role="menuitem"></Dropdown.Item>
                    <Dropdown.Item eventKey="Episode" role="menuitem">Episode</Dropdown.Item>
                    <Dropdown.Item eventKey="Name" role="menuitem">Name</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control type="text" placeholder="Search" onChange={searchMovie} />
        </div>
    )
}

export default memo(SearchSort);