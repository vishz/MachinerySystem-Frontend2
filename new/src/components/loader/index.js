import React, { useState } from "react"
import { css } from "@emotion/react"
import BeatLoader from "react-spinners/BeatLoader"
import './styles.css'
import { connect } from "react-redux";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position:absolute;
  top:50%;
  left:50%;
`

function App(props) {
    let [loading, setLoading] = useState(true)
    let [color, setColor] = useState("#0064E3")
    return (
        <>
            {props.loader ? <div className={'loader-container'}>
                <BeatLoader color={color} loading={loading} css={override} size={20} />
            </div> : false}
        </>
    )
}

const mapStateToProps = (state) => ({
    loader: state.user.loader
})

export default connect(mapStateToProps, null)(App)
