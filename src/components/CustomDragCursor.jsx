// import { useEffect, useState } from "react";

// export default function CustomDragCursor({ isDragging, isOverCarousel }) {
//   const [pos, setPos] = useState({ x: 0, y: 0 });
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const moveHandler = (e) => {
//       setPos({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", moveHandler);
//     return () => window.removeEventListener("mousemove", moveHandler);
//   }, []);

//   useEffect(() => {
//     setIsVisible(isOverCarousel);
//   }, [isOverCarousel]);

//   if (!isVisible) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: pos.y,
//         left: pos.x,
//         transform: "translate(-50%, -50%)",
//         pointerEvents: "none",
//         zIndex: 9999,
//         transition: "opacity 0.2s ease",
//         opacity: isVisible ? 1 : 0,
//       }}
//     >
//       <img
//         src={isDragging ? "/cursor-drag.svg" : "/cursor-default1.svg"}
//         alt="custom cursor"
//         draggable="false"
//         style={{
//           width: "60px",
//           height: "60px",
//         }}
//       />
//     </div>
//   );
// }