import React from 'react'
import { connect } from 'react-redux'
import { dashboardPageWithLogin } from '../../enhancers'
import { getTrips } from '../../data/trip/list/actions'
import { selectTrips } from '../../data/trip/list/selectors'
import Spinner from '../../components/spinner/'
import TripItem from './components/tripItem'
import TripList from './components/tripList'

class Trips extends React.Component {
  componentDidMount () {
    if (!this.props.trips.length) {
      this.props.getTrips()
    }
  }

  render () {
    const { loading, trips } = this.props
    return (
      <div>
        <TripList>
          <TripItem to='/new'>+ New</TripItem>
          {
            loading
              ? <Spinner />
              : trips.map(trip =>
                <TripItem
                  key={trip.id}
                  to={`/${trip.id}`}
                  trip={trip}
                  memberCount={trip.member_count} />)
          }
        </TripList>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.trip.loading,
  trips: selectTrips(state)
})

const mapDispatchToProps = (dispatch) => ({
  getTrips: () => dispatch(getTrips())
})

export default connect(mapStateToProps, mapDispatchToProps)(dashboardPageWithLogin(Trips))
