import { useEffect } from "react";
import ProductForm from "../components/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchDetailProduct,
} from "../stores/actions/actionCreator";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function EditProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading } = useSelector((state) => state.product);
  const { categories, loadingCategories } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchDetailProduct(id));
  }, [dispatch, id]);

  return (
    <>
    <ToastContainer />
    <div className="w-full">
      <div className="leading-loose">
        <ProductForm
          isEdit={true}
          product={product}
          isLoading={loading}
          categories={categories}
          loadingCategories={loadingCategories}
        />
      </div>
    </div>
    </>
  );
}
