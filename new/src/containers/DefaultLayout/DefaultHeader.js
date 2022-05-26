import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import { Assets } from "../../assets";
import { alert, removeCookiesValues } from '../../constants/commonFunc';
import Cookies from 'js-cookie'
import { Cookie } from '../../constants/Storage-Cookie/Cookie';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const propTypes = {
  children: PropTypes.node,
};
const MySwal = withReactContent(Swal);
const defaultProps = {};

class DefaultHeader extends Component {
  logoutHandler = (e) => {
    MySwal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-outline-secondary ml-1",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.value) {
        removeCookiesValues();
        this.props.onLogout(e);
      }
    })
  }

  passwordChangeHandler = (e) => {
    this.props.onProfileHandler(e);
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: Assets.brand, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: Assets.miniLogo, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={Assets.admin} className="img-avatar" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem onClick={e => this.passwordChangeHandler(e)}><i className="fa fa-wrench"></i>Change Password</DropdownItem>
              <DropdownItem onClick={e => this.logoutHandler(e)}>
                <i className="cui-account-logout icons"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
