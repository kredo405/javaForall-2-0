import React from 'react';
import "./app-filter.scss";
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

const AppFilter = (props) => {

    return (
        <div className='dropdown-wrapper'>
            <DropdownButton id="dropdown-basic-button" title="День:">
                <Dropdown.Item onClick={() => props.onFilterSelect('all')} href="#/action-1">Все</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('MONDAY')} href="#/action-2">Понедельник</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('TUETHDAY')} href="#/action-3">Вторник</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('WEDNESDAY')} href="#/action-4">Среда</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('THURSDAY')} href="#/action-5">Четверг</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('FRIDAY')} href="#/action-6">Пятница</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('SATURDAY')} href="#/action-7">Суббота</Dropdown.Item>
                <Dropdown.Item onClick={() => props.onFilterSelect('SUNDAY')} href="#/action-8">Воскресенье</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default AppFilter;