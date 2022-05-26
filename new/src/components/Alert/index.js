import React, { useState } from "react"
import { css } from "@emotion/react"
import BeatLoader from "react-spinners/BeatLoader"
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);


function App(props) {
    return (
        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            customClass: {
                confirmButton: "btn btn-danger",
                cancelButton: "btn btn-outline-secondary ml-1",
            },
            buttonsStyling: false,
        }).then(async (result) => {
            return result
        })
    )
}

export default App
