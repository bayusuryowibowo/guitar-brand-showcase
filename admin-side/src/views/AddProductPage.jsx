import { useDispatch, useSelector } from "react-redux";
import ProductForm from "../components/ProductForm";
import { useEffect } from "react";
import { fetchCategories } from "../stores/actions/actionCreator";

export default function AddProductPage() {
  const categories = useSelector((state) => state.category.categories);
  const loadingCategories = useSelector((state) => state.category.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="leading-loose">
        <ProductForm
          isEdit={false}
          categories={categories}
          loadingCategories={loadingCategories}
        />
      </div>
    </div>
  );
}
