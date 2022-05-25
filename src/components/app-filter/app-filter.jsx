import React from 'react';
import "./app-filter.scss";
import {Dropdown, DropdownButton } from 'react-bootstrap';

const AppFilter = (props) => {

    return (
        <div className='dropdown-wrapper'>
            <DropdownButton id="dropdown-basic-button" title="День:">
                <Dropdown.Item onClick={() => props.onFilterSelect('all')}>Все</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('MONDAY')}>Понедельник</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('TUETHDAY')}>Вторник</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('WEDNESDAY')}>Среда</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('THURSDAY')}>Четверг</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('FRIDAY')}>Пятница</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('SATURDAY')}>Суббота</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('SUNDAY')}>Воскресенье</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default AppFilter;