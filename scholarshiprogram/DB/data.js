import React from "react";


const rows = [
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Accept",
  },
  {
    key: "2",
    title: "Zoey Lang",
    role: "Technical Lead",
    status: "Pending",
  },
  {
    key: "3",
    title: "Jane Fisher",
    role: "Senior Developer",
    status: "Accepted",
  },
  {
    key: "4",
    title: "William Howard",
    role: "Community Manager",
    status: "Rejected",
  },
];

const columns = [
  {
    key: "title",
    label: "TITLE",
  },  
  {
    key: "status",
    label: "STATUS",
  },
];

export {columns, rows};
