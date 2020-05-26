import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import CardText from "reactstrap/es/CardText";
import Container from "reactstrap/es/Container";
import io from "socket.io-client"
import RowTable from "../components/RowTable";
import {SERVER_URL} from "../assets/js/config";
import axios from "axios";

function ExamsTable(props) {
    const [rows, setRows] = useState()

    function rowClick(event) {
        let examId = event.target.parentNode.id
        console.log(props.socket)
        props.socket.emit('exam_join', {examId})
        console.log('exam_join' + examId)
    }

    function fetchRows() {
        axios.get(SERVER_URL + '/exam')
            .then(response => {
                setRows(response.data.result)
                return rows
            })
    }

    useEffect(fetchRows, [])
    props.socket.on('exam_update', fetchRows)

    return <RowTable rows={rows} rowClick={rowClick}/>
}

let socket = io(SERVER_URL)
socket.on('success', function (data) {
    console.log(data.message)
})
socket.on('connect', function () {
    // setSocketId(socket.id)
    console.log('socket connected')
})
export default function Exam() {
    const [studentId, setStudentId] = useState('')
    const [studentName, setStudentName] = useState('')

    return (
        <Container>
            <p>{socket.id}</p>
            <p>{studentId}</p>
            <p>{studentName}</p>
            <Card>
                <CardBody>
                    <CardTitle>Login</CardTitle>
                    <CardText>
                        <Form inline>
                            <FormGroup>
                                <Label for="studentId" hidden>Email</Label>
                                <Input type="text" name="studentId" id="studentId" placeholder="Student ID"
                                       value={studentId} onChange={e => setStudentId(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="studentName" hidden>Password</Label>
                                <Input type="text" name="studentName" id="studentName" placeholder="Name"
                                       value={studentName} onChange={e => setStudentName(e.target.value)}/>
                            </FormGroup>

                            <Button onClick={registerStudent}>Register</Button>
                        </Form>
                    </CardText>
                </CardBody>

            </Card>
            <ExamsTable socket={socket}/>
        </Container>
    )

    function registerStudent(event) {
        console.log(`register ${studentId} ${studentName} ${socket.id}`)
        socket.emit('register', {id: studentId, name: studentName})
    }


}