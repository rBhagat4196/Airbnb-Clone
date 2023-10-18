import { useParams } from "react-router-dom"

const Place = () => {
    const {id} = useParams();
  return (
    <div>
      {id}
    </div>
  )
}

export default Place
