import React from 'react';
import api from '../services/api';
import { Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class PersonList extends React.Component {
    state = { person: [] };
    headers = { 'Content-Type': 'text/plain' };

    componentDidMount() {
        api.get(`/people`, {}, [this.headers])
            .then(res => {
                const person = res.data;
                this.setState({ person });
            });
    }

    render() {
        return (
            <>
                <PersonTable person={this.state.person} />
            </>
        )
    }
}

class PersonTable extends React.Component {
    render() {
        const rows = [];

        this.props.person.forEach((person) => {
            rows.push(
                <PersonRow person={person} key={person.personId} />
                );
                debugger
        });

        return (
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Picture</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </>
        );
    }
}

class PersonRow extends React.Component {
    async handleClickDelete(personId) {
        const response = await api.delete(`/person/${personId}`);
        if (response.status === 204) <><Alert key="success" variant="success">You deleted the Person with success</Alert></>
        else <><Alert key="danger" variant="danger">Something Wrong happen! Please try again!</Alert></>;
    }

    render() {
        const person = this.props.person;
        return (
            <tr>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.picture}</td>
                <td>
                    <Button variant="danger" size="sm" onClick={() => this.handleClickDelete(person.personId)}>Delete</Button>
                    <Link to={{ pathname: `/editPerson/${person.personId}`, id: person.personId, state: { [person]: person} }}>
                        <Button variant="primary" size="sm">Details</Button>
                    </Link>
                </td>
            </tr>
        );
    }
}

export default PersonList;