import { React, ReactDOM } from "react";
import { SERVER_URL } from "./config";
import { ExamsTable } from "../../components/ExamsTable";

function MytableRow(props) {
    let socket

    const viewExam = (e) => {

    }

    return (
        <SocketContext.Consumer>
            {value => {
                socket = value
                return (<TableRow onClick={viewExam}>
                    <TableCell component="th" scope="row">{props.row.id}</TableCell>
                    <TableCell>{props.row.name}</TableCell>
                    <TableCell>{props.row.instructor}</TableCell>
                </TableRow>)
            }}
        </SocketContext.Consumer>

    )
}

function Root() {
    return (
        <div>
            <ExamsTable></ExamsTable>
        </div>
    )
}

ReactDOM.render(<Root></Root>, document.getElementById("root"))