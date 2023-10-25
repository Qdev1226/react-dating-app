import React from "react"

/* eslint-disable react/prop-types */
export function ConnectionState({ isConnected }) {
    return <p>State: {"" + isConnected}</p>
}