import React from "react";
import loading from "../assets/loading.gif";
export default function Loading() {
  return (
    <div className="text-center">
        <img src={loading} className="w-25 h-25" alt="" />
    </div>
  );
}