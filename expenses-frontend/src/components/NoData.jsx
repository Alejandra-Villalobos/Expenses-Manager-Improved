import React from "react";
import { FcDeleteDatabase } from "react-icons/fc";

function NoData() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <FcDeleteDatabase  size={100}/>
      <p className="italic text-gray-500">No data found</p>
    </div>
  );
}

export default NoData;
