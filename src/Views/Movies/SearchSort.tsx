import { memo, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

const SearchSort = (props: any) => {
    const [sortByText,setSortByText] = useState('Sort by...');
    const [searchText,setSearchText] = useState("");
    const searchMovie = (event: any) => {
        setSearchText(event.target.value);
        
    }
    useEffect(() => {
        // here you can increase the time to stop continues fire event
        const searhHndl = setTimeout(() => {
            props.handleSearch(searchText)
        },10)
        return () => clearTimeout(searhHndl);
    },[searchText])
    const sortBy = (e:any) => {
        setSortByText(e);
        props.handleSort(e)
    }
    return (
        <div className='search-wrapper d-flex align-item-center'>
            <Dropdown onSelect={sortBy}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" onChange={sortBy}>{sortByText}</Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Sort by..."></Dropdown.Item>
                    <Dropdown.Item eventKey="Episode">Episode</Dropdown.Item>
                    <Dropdown.Item eventKey="Name">Name</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control type="text" placeholder="Large text" onChange={searchMovie} />
        </div>
    )
}

export default memo(SearchSort);