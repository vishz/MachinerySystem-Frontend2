import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Assets } from "../../../assets";
import strings from "../../../locals/string.json";
import { validateLogin } from '../../../constants/validation'
import Cookies from 'js-cookie'
import { Cookie } from '../../../constants/Storage-Cookie/Cookie';
import { loginAdmin, notifyMessage } from '../../../constants/commonFunc';
import { CommonMessage } from '../../../constants/commonMessage';
import Service from '../../../service/auth'
import { connect } from "react-redux";
import * as config from '../../../constants/constants';

const login = strings.login;

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  loginHandler = () => {
    this.props.history.push(config.BASE_URL + '/dashboard')
    // if (validateLogin(this.state)) {
    //   this.loginAdmin();
    // }
  }

  loginAdmin = async () => {
    this.props.loader(true)
    await Service.adminlogin(loginAdmin(this.state))
      .then(async response => {
        if (response.data && response.data.access_token !== '') {
          await Cookies.set(Cookie.ACCESSTOKEN, response.data.access_token);
          await Cookies.set(Cookie.REFRESHTOKEN, response.data.refresh_token);
          await Cookies.set(Cookie.ADMINOBJECT, response.data);
          this.props.history.push(config.BASE_URL + '/dashboard')
        } else {
          notifyMessage(CommonMessage.ADMIN_LOGIN_CREDENTIAL_ERROR, 0, 3);
        }
      })

      .finally(fin => {
        this.props.loader(false)
      })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    return (
      <div
        className="app flex-row align-items-center"
        style={{
          backgroundImage: `url(${Assets.backgroundImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '100vw',
          height: '100vh'
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h1>{login.Welcome}</h1>
                      <h2>{login.WOOKSTVAdmin}</h2>
                      <img src={Assets.logo} style={{ marginTop: 10 }} width={200}
                        height={180} />
                    </div>
                  </CardBody>
                </Card>
                <Card className=" py-5 text-center">
                  <CardBody>
                    <Form>
                      <h1>{login.Login}</h1>
                      <p className="text-muted">{login.SignIn}</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" name={"userName"}
                          value={this.state.email} onChange={this.handleChange("email")}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name={"password"}
                          value={this.state.password} onChange={this.handleChange("password")}
                          children={<input type="text" />} />
                      </InputGroup>
                      {/*<Link to={BASE_URL+"/dashboard"} >*/}
                      <Button
                        color="primary"
                        className="px-4"
                        // disabled={userName.value==='' | password.value===''}
                        onClick={() => this.loginHandler()}
                      >
                        {login.LoginButton}
                      </Button>
                      {/*</Link>*/}
                    </Form>
                  </CardBody>
                </Card>

              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loader: (data) => dispatch({
      type: "LOADER",
      value: data
    })
  }
}

export default connect(null, mapDispatchToProps)(Login)
