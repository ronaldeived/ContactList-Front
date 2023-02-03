import React from "react";
import api from "../services/api";
import { Form, Row, Button, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class AddPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            picture: "",
            contacts: [{ id: "", value: "" }]
        };
    }
    options = [{ id: 1, name: "WhatsApp" }, { id: 2, name: "Phone Number" }, { id: 3, name: "E-mail" }];

    contacts = [{ type: "", value: "" }]
    rowsContacts = undefined || [];

    countContacts = () => {
        return this.countContacts++;
    };

    delay = ms => new Promise(res => setTimeout(res, ms));

    ddlHandleType = (e) => {
        this.options.forEach((o) => {
            if (o.name.includes(e)) {
                this.contacts.push({ type: o.id })
            }
        })
    }

    ddlHandleValue = async (e) => {
        this.contacts[this.contacts.length - 1].value = e;
    }

    add = async (e) => {
        e.preventDefault();
        if (this.state.firstName === "" || this.state.lastName === "") {
            alert("All the fields are mandatory!");
            return;
        }
        debugger
        this.contacts.forEach((item, index) => { if(item.type === "" || item.value === "") this.contacts.splice(index,1) })
        this.state.contacts?.forEach((item, index) => { if(item.type === "" || item.value === "") this.contacts.splice(index,1) })
        this.contacts.splice(0, 1)
        this.state.contacts.push(...this.contacts);

        await api.post("/person", this.state);
        this.props.history.push("/");
    };

    addFormFields = () => {
        this.state.contacts.push(...this.state.contacts, { id: "", value: "" })
        this.contacts.push({type: "", value: ""})
        if (!this.rowsContacts) this.rowsContacts.push({ id: "", value: "" });
        this.contacts.forEach((contact) => {
            console.log(this.contacts)
            this.rowsContacts.push(
                <ListContacts />
            );
        });
    }

    render() {
        
        return (
            <div className="ui fixed menu">
                <div className="ui container center">
                    <Link to="/">
                        <Button variant="outline-primary">Back</Button>
                    </Link>
                    <Form noValidate onSubmit={this.add}>
                        <Row className="mb-3">
                            <Form.Group
                                as={Col}
                                md="4"
                                controlId="validationFormik101"
                                className="position-relative"
                            >
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    onChange={(e) => this.setState({ firstName: e.target.value })}
                                />
                                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                md="4"
                                controlId="validationFormik102"
                                className="position-relative"
                            >
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    onChange={(e) => this.setState({ lastName: e.target.value })}
                                />

                                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group className="position-relative mb-3">
                            <Form.Label>File</Form.Label>
                            <Form.Control
                                type="file"
                                required
                                name="picture"
                                onChange={(e) => this.setState({ picture: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>Error File</Form.Control.Feedback>
                        </Form.Group>
                        {
                            this.state.firstName && this.state.lastName &&
                            <>
                                <Button className="addNewContacts" onClick={() => this.addFormFields()}>Add new contact</Button>
                                {this.rowsContacts}
                            </>

                        }
                        <Button type="submit">Save Person</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

class ListContacts extends React.Component {
    constructor(props) {
        debugger
        super(props);
        this.state = {
            contacts: [{ id: "", value: "" }]
        };
    }

    options = [{ id: 1, name: "WhatsApp" }, { id: 2, name: "Phone Number" }, { id: 3, name: "E-mail" }];

    render() {
        return (
            <Row className="mb-3">
                <DropdownButton variant="dark" title="=====Type=====" onSelect={(e) => { this.ddlHandleType(e) }}>
                    {this.options.map((option) => {
                        const { name, id } = option;
                        return <Dropdown.Item key={id} eventKey={name}>{name}</Dropdown.Item>
                    })}
                </DropdownButton>
                <Form.Label>Value</Form.Label>
                <Form.Group>
                    <Form.Control type="text" name="firstName" className="position-relative"
                        onChange={(e) => {
                            this.ddlHandleValue(e.target.value);
                        }} />
                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
        )
    }
}
