import React from "react";
import { MdAddCircle } from "react-icons/md";
import Navbar from "../components/Navbar";
import ShowBanks from "../components/ShowBanks";
import SideMenu from "../components/SideMenu";

function Banks() {
  return (
    <div className="flex bg-emerald-100 overflow-x-hidden">
      <SideMenu page={"banks"} />
      <div className="flex flex-col w-full min-h-screen h-full gap-3 mt-14">
        <Navbar />
        <div className="w-full">
          <section className="flex flex-row justify-center items-center gap-x-5 mt-8">
            <h1 className="text-center font-bold text-2xl p-4">Bank Accounts</h1>
            <button>
              <MdAddCircle size={25} />
            </button>
          </section>
          <ShowBanks />
        </div>
      </div>
    </div>
  );
}

export default Banks;
