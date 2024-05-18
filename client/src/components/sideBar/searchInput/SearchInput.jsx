import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../../zustand-store/useConversation";
import useGetConversation from "../../../hooks/useGetConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversation } = useGetConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search must be 3 character long");
    }
    const foundconversation = conversation.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (foundconversation) {
      setSelectedConversation(foundconversation);
      setSearch("");
    } else {
      toast.error("No conversation found");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button className="btn btn-circle bg-red-500 text-white" type="submit">
        <FaSearch color="black" />
      </button>
    </form>
  );
};

export default SearchInput;
