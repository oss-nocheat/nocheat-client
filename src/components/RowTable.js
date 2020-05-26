import React, {useEffect} from "react";
import Table from "reactstrap/es/Table";

export default function RowTable(props) {
    return props.rows?.length ? (
        <Table>
            <thead>
            <tr>
                {Object.keys(props.rows[0]).map(key => <th key={key}>{key}</th>)}
            </tr>
            </thead>
            <tbody>
            {props.rows?.map(row => {
                return <tr onClick={props.rowClick} id={row.id}>{Object.values(row).map(((value, i) => <td key={i}>{value}</td>))}</tr>
            })}
            </tbody>
        </Table>
    ) : <></>
}