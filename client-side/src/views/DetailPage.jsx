import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchDetailProduct, fetchImage } from "../stores/actions/actionCreator"


export default function DetailPage() {
  const product = useSelector((state) => state.product.product)
  const image = useSelector((state) => state.image.image)

  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchDetailProduct(id))
    dispatch(fetchImage(id))
  }, [dispatch, id])
  
  return (
    <>
    
    </>
  )
}