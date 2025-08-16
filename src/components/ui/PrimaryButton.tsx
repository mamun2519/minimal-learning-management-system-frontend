import React from "react";

const PrimaryButton = ({ title }: { title: string }) => {
  return (
    <button className="bg-primary hover:bg-primary/90 px-4 py-1 rounded text-white">
      {title}
    </button>
  );
};

export default PrimaryButton;
