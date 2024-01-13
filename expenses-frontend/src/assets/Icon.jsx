import React from "react";
import { FcBullish } from "react-icons/fc";

function Icon() {
  return (
    <div className="flex justify-center items-center">
      <div className="p-2 rounded-full border-4 border-emerald-500">
        <FcBullish size={50} />
      </div>
    </div>
  );
}

export default Icon;
