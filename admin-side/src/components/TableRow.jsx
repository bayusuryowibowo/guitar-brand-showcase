import Pencil from "./icons/Pencil";
import Trash from "./icons/Trash";

export default function TableRow({ data, onEditClick, onDeleteClick }) {
  return (
    <>
      {data.map((el) => (
        <tr
          key={el.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10">
                <img
                  className="w-full h-full rounded-full"
                  src={el.mainImg}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">{el.name}</p>
              </div>
            </div>
          </th>
          <td className="px-6 py-4">{el.Category.name}</td>
          <td className="px-6 py-4">${el.price}</td>
          <td className="px-6 py-4">{el.User.username}</td>
          <td className="px-6 py-4">{el.createdAt}</td>
          <td className="px-6 py-4">{el.updatedAt}</td>
          <td className="flex justify-around items-center px-6 py-6 space-x-3">
            <div onClick={() => onEditClick(el.id)}>
              <Pencil />
            </div>
            <div onClick={() => onDeleteClick(product.id)}>
              <Trash />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
