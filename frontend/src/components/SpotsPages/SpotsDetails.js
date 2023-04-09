import { useParams } from "react-router-dom"

const SpotsDetails = () => {
    const { spotId } = useParams()
    // console.log(spotId)

    return (
        <div>Spots are cool bro.</div>
    )
}

export default SpotsDetails
