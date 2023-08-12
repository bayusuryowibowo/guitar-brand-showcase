import ProductForm from "../components/ProductForm";

export default function EditProductPage() {
  return (
    <div className="w-full">
      <div className="leading-loose">
        <ProductForm isEdit={true} />
      </div>
    </div>
  );
}
