"use client";

import { useEffect, useRef, useState } from "react";

const MyComponent = () => {
  return (
    <div>
      <div
        className="[&>:not(h4)]:text-green-500  
        [&>:not(h4)]:text-5xl [&>:not(h3)]:text-cyan-700  
        [&>:not(h3)]:text-3xl"
      >
        <h3>GeeksforGeeks</h3>
        <h4>A Computer Science Portal For Geeks</h4>
      </div>
    </div>
  );
};

export default MyComponent;
