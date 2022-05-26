import React, { Component, lazy, Suspense } from 'react';
import {
  Badge, Button,
  Card, CardGroup,
  Col, Modal, ModalFooter, ModalHeader,
  Row,
  Table,
} from 'reactstrap';
import Widget04 from '../../components/Widget/Widget04';
import strings from "../../locals/string.json";
import BarChart from '../../components/Charts/Barchart'
import LineChart from '../../components/Charts/LineChart'
import Service from '../../service/dashboard'
import qs from 'qs';
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from 'react-flatpickr'
import { connect } from "react-redux";
import moment from "moment";
import { getConvertedUTCDateTIme, getTimeDifferenceWithUTC } from '../../constants/validation';
import { dashboardDateFilter } from '../../constants/commonFunc';

const dashboard = strings.Dashboard;

class Dashboard extends Component {
  state = {
    data: {},
    start: moment().subtract(30, "days"),
    end: moment().subtract(0, "days"),
    incomeSummary: [],
    subscriptionByClass: []
  }

  componentDidMount() {
    // this.dashboardSummery();
  }

  dashboardSummery = async () => {
    let dates = await getConvertedUTCDateTIme(this.state.start, this.state.end)
    await Service.dashboardsummary(dashboardDateFilter(dates))
      .then(response => {
        if (response.data.success) {
          this.setState({
            data: response.data.body,
            incomeSummary: response.data.body.incomeSummary !== null ? response.data.body.incomeSummary : [],
            subscriptionByClass: response.data.body.subscriptionByClass !== null ? response.data.body.subscriptionByClass : []
          })
        }
      })
      .finally(fin => {
        this.props.loader(false)
      })
  }

  count = 0
  onDateRangeChange = async (elem) => {
    if (elem !== null) {
      let start = '';
      let end = '';

      elem.map((date, index) => {
        if (index === 0) {
          start = moment(elem[0])
        } else {
          end = moment(elem[1])
        }
      })

      this.count = this.count + 1
      await this.setState({
        start: start,
        end: end
      })

      if (this.count === 2) {
        this.dashboardSummery()
        this.count = 0
      }
    }
  }

  render() {
    let class_names = []
    let subscription_count = []
    let revenueLabelSet = []
    let revenueDataSet = []
    if (this.state.subscriptionByClass.length !== 0) {
      this.state.subscriptionByClass.map((val, index) => {
        class_names.push(val.name)
        subscription_count.push(val.subscriptionCount)
      })
    }

    if (this.state.incomeSummary.length !== 0) {
      this.state.incomeSummary.map((val, index) => {
        revenueLabelSet.push(val.date)
        revenueDataSet.push(val.income)
      })
    }
    const { data } = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md='4'>
            <div className="animated fadeIn">
              <CardGroup className="mb-4">
                <Widget04 icon="icon-people" color="info" header={data.totalPublicUserCount}
                  value={data.totalPublicUserCount}>{dashboard.users}</Widget04>
              </CardGroup>
            </div>
          </Col>
          <Col md='4'>
            <div className="animated fadeIn">
              <CardGroup className="mb-4">
                <Widget04 icon="icon-user-follow" color="info" header={data.totalNewUserInThisMonth}
                  value={data.totalNewUserInThisMonth}>{dashboard.month}</Widget04>
              </CardGroup>
            </div>
          </Col>
          <Col md='4'>
            <div className="animated fadeIn">
              <CardGroup className="mb-4">
                <Widget04 icon="icon-layers" color="info" header={data.totalClasses}
                  value={data.totalClasses}>{dashboard.class}</Widget04>
              </CardGroup>
            </div>
          </Col>
        </Row>

        <Row className={"mt-1 mb-4"}>
          <Col md="4"></Col>
          <Col md="4">
            <Flatpickr
              options={{
                mode: 'range',
                defaultDate: [new Date(), new Date().setDate(new Date().getDate() - 30)]
              }}
              className="form-control flat-custom"
              placeholder={"Select date range"}
              onChange={this.onDateRangeChange}
            />
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <BarChart
              labels={class_names}
              dataset={subscription_count}
              name={""}
              id={"stackId3"}
            />
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <LineChart
              labels={revenueLabelSet}
              dataset={revenueDataSet}
              name={'Revenue Date Wise'}
              color={'#0064e3'}

            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loader: (data) => dispatch({ type: "LOADER", value: data })
});

export default connect(null, mapDispatchToProps)(Dashboard);

