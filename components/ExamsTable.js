import React from 'react'
import { useState } from "react";
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button, IconButton } from '@material-ui/core'
import { AddShoppingCartIcon } from '@material-ui/icons'
import { SocketContext } from "../assets/js/websocket";
import { SERVER_URL } from "../assets/js/config";



function MytableRow(props){
  let socket

  const joinExam = (e) => {
    console.log(props.row.id)
    console.log(socket)
    socket.emit('join', {id: props.row.id})
  }

  return (
    <SocketContext.Consumer>
      {value => {
        socket = value
        return (<TableRow onClick={joinExam}>
                  <TableCell component="th" scope="row">{props.row.id}</TableCell>
                  <TableCell>{props.row.name}</TableCell>
                  <TableCell>{props.row.instructor}</TableCell>
                </TableRow>)
    }}
    </SocketContext.Consumer>
    
  )
}

export default function ExamsTable (props) {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
           {Object.keys(props.rows[0])?.map((key, i) => (<TableCell key={i}>{key}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows?.map((row) => (
            <MytableRow row={row} key={row.id}></MytableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
