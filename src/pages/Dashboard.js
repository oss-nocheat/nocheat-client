import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import RowTable from "../components/RowTable";
import CardTitle from "reactstrap/es/CardTitle";
import CardText from "reactstrap/es/CardText";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Container from "reactstrap/es/Container";
import axios from "axios";
import {SERVER_URL} from "../assets/js/config";
import io from "socket.io-client";
import Card from "reactstrap/es/Card";

let socket = io(SERVER_URL)
socket.on('success', function (data) {
    console.log(data.message)
})
socket.on('connect', function () {
    // setSocketId(socket.id)
    console.log('socket connected')
})

function StudentsTable(props) {
    const [rows, setRows] = useState()

    function rowClick(event) {
        console.log(props.socket)
    }

    function fetchRows() {
        axios.get(`${SERVER_URL}/exam/${props.examId}/examinees`)
            .then(response => {
                setRows(response.data.result)
                return rows
            })
    }

    useEffect(fetchRows, [])
    props.socket.on('exam_update', fetchRows)

    return <RowTable rows={rows} rowClick={rowClick}/>
}

export default function Dashboard() {
    const [instructor, setInstructor] = useState('')
    const [examName, setExamName] = useState('')
    const [examList, setExamList] = useState()

    function fetchExams() {
        axios.get(SERVER_URL + '/exam')
            .then(response => {
                setExamList(response.data.result)
                console.log(examList)
                return examList
            })
    }

    useEffect(fetchExams, [])

    return (
        <Container>
            <Card>
                <CardBody>
                    <CardTitle>Login</CardTitle>
                    <CardText>
                        <Form inline>
                            <FormGroup>
                                <Label for="studentId" hidden>Instructor</Label>
                                <Input type="text" name="instructor" id="instructor" placeholder="Instructor name"
                                       value={instructor} onChange={e => setInstructor(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examName" hidden>Password</Label>
                                <Input type="text" name="examName" id="examName" placeholder="Examination Name"
                                       value={examName} onChange={e => setExamName(e.target.value)}/>
                            </FormGroup>

                            <Button onClick={CreateExam}>Create Exam</Button>
                        </Form>
                    </CardText>
                </CardBody>
            </Card>
            {examList?.map(exam =>
                <Card>
                    <CardBody>
                        <CardTitle>Test {exam.name}</CardTitle>
                        <CardText>
                            <StudentsTable socket={socket} examId={exam.id}/>
                        </CardText>
                    </CardBody>
                </Card>)}
        </Container>
    )

    function CreateExam() {
        axios.post(SERVER_URL + '/exam', {instructor, name: examName})
            .then(response => console.log(response))
    }
}