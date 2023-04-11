import { useHistory } from "react-router-dom"

const ManageSpotsCard = ({userSpots}) => {
    const history = useHistory()

    const clickCreateSpotHandler = () => {
        history.push('/spots/new')
    }

    const clickSpotDetailPageHandler = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    return (
        <div>
        <h1>Manage Spots</h1>
        <button>Create a New Spot</button>
        {userSpots.length > 0 ?
        userSpots.map(spot => {
            // console.log(spot)
            return (
                <div key={spot.id}>
                    <img src={spot.previewImage}
                    onClick={() => clickSpotDetailPageHandler(spot.id)}
                    />
                    <p>{`${spot.city}, ${spot.state}`}</p>
                    <p>{`$${spot.price}night`}</p>
                    <p>{spot.avgRating}</p>
                    <button>Update</button>
                    <button>Delete</button>
                </div>
            )
        })
        :
            <button onClick={clickCreateSpotHandler}>Create a New Spot</button>
        }
        </div>
    )
}

export default ManageSpotsCard
