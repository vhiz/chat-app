import { FiSearch } from "react-icons/fi";

export default function SearchContainer() {
  return (
    <div className="flex w-full">
      <form action="" className="flex w-full items-center gap-x-5">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full rounded-full p-4"
        />
        <button className="btn btn-primary text-white rounded-full">
            <FiSearch size={'1rem'}/>
        </button>
      </form>
    </div>
  );
}
