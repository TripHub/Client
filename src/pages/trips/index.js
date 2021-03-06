import React from 'react'
import { connect } from 'react-redux'
import { dashboardPageWithLogin } from '../../enhancers'
import { getTrips } from '../../data/entities/actions'
import { selectActiveTrip } from '../../data/entities/selectors'
import Page from '../../components/page/'
import Spinner from '../../components/spinner/'
import { Row } from '../../components/responsive/'
import Icon from '../../components/icon/'
import TripItem from './components/tripItem'

class Trips extends React.Component {
  state = { loading: false }

  componentDidMount () {
    this.setState({ loading: true }, () => {
      this.props.getTrips()
        .then(() => this.setState({ loading: false }))
    })
  }

  render () {
    const { trips, activeTrip } = this.props
    const { loading } = this.state
    return (
      <Page>
        <Row>
          <TripItem to='/new'>
            <Icon name='plus' /> New Trip
          </TripItem>
          {
            loading
              ? <Spinner />
              : Object.values(trips.byId).map(trip =>
                <TripItem
                  key={trip.id}
                  to={`/${trip.id}`}
                  trip={trip}
                  active={activeTrip.id === trip.id} />)
          }
        </Row>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  trips: state.entities.trips,
  activeTrip: selectActiveTrip(state)
})

const mapDispatchToProps = (dispatch) => ({
  getTrips: () => dispatch(getTrips())
})

const TripsPage = dashboardPageWithLogin(Trips)
export default connect(mapStateToProps, mapDispatchToProps)(TripsPage)
