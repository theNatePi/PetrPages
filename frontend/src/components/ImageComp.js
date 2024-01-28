import React, { useRef, useEffect, useState } from 'react';
import interact from 'interactjs';

const ImageComponent = ({m_id, m_zIndex, m_rotation, m_x, m_y, m_width, m_height, m_imageURL, onMoveUpdate, onRotate, onChangeURL, onChangeSize, onDoubleTap}) => {
  const thisRef = useRef(null);
  let doubleTapHandled = false;
  let currentImage = m_imageURL;
  let mainWidth = m_width;
  let mainHeight = m_height;
  let mainX = m_x;
  let mainY = m_y;
  let mainRotation = m_rotation;
  let translateString = `translate(${m_x}px, ${m_y}px) rotate(${m_rotation}deg)`;

  const [current_x, setCurrent_x] = useState(0);
  const [current_y, setCurrent_y] = useState(0);

  const handleDoubleTap = () => {
    if (!doubleTapHandled) {
        const deleted = onDoubleTap();
        if (!deleted) {
          // Prompt the user for a new image URL
          const newImageUrl = window.prompt('Enter the new image URL:');
          if (newImageUrl) {
              // Update the image source with the new URL
              thisRef.current.src = newImageUrl;
              onChangeURL(newImageUrl);
              currentImage = newImageUrl;
          }

          const newAngle = window.prompt('Enter rotation angle (in degrees):');
          if (newAngle !== null && !isNaN(newAngle)) {
              // Update the rotation angle if a valid number is entered
              thisRef.current.dataset.angle = newAngle;
              // Apply the rotation transformation
              thisRef.current.style.transform = `translate(${thisRef.current.dataset.x || 0}px, ${thisRef.current.dataset.y || 0}px) rotate(${newAngle}deg)`;
              onRotate(newAngle);
          }
        }
        doubleTapHandled = true; // Set the flag to true after handling double-tap
    }
  };

  useEffect(() => {
    // Initialize the interactjs draggable and resizable behaviors with snapping
    if (thisRef.current) {
      // setCurrent_x(m_x);
      // // setCurrent_y(m_y);
      // onMoveUpdate(m_x, m_y);
      // console.log(m_x, m_y);
      // thisRef.current.style.width = `${m_width}px`;
      // thisRef.current.style.height = `${m_height}px`;
      // thisRef.current.transform = `translate(${m_x}px, ${m_y}px) rotate(${m_rotation}deg)`;
      // thisRef.current.setAttribute('data-x', m_x);
      // thisRef.current.setAttribute('data-y', m_y);
    }





    const interactInstance = interact(thisRef.current)
      .draggable({
        inertia: false,
        autoScroll: true,
        snap: {
          targets: [interact.createSnapGrid({ x: 5, y: 5 })],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }],
        },
        onmove: (event) => {
          const target = event.target;

          const scalingFactor = 1;

          // Get the current position of the square
          const x = current_x + (event.dx * scalingFactor);
          const y = current_y + (event.dy * scalingFactor);

          const match = target.style.transform.match(/rotate\(([-+]?\d+(?:\.\d+)?)deg\)/);
          const currentRotation = match ? parseFloat(match[1]) : 0;

          // Update the initial rotation value to the current rotation


          // Update the square's position attributes
          target.style.transform = `translate(${x}px, ${y}px) rotate(${currentRotation}deg)`;
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);

          onMoveUpdate(x, y);
          setCurrent_x(x);
          setCurrent_y(y);
        },
      })
      .resizable({
        edges: { left: false, right: true, top: false, bottom: true },
        snapSize: {
          targets: [interact.createSnapGrid({ x: 5, y: 5 })],
          range: Infinity,
        },
        restrictSize: {
          min: { width: 50, height: 50 }, // Set the minimum size for the square
        },
        onmove: (event) => {
          const target = event.target;
          let x = parseFloat(target.getAttribute('data-x')) || 0;
          let y = parseFloat(target.getAttribute('data-y')) || 0;

          const match = target.style.transform.match(/rotate\(([-+]?\d+(?:\.\d+)?)deg\)/);
          const currentRotation = match ? parseFloat(match[1]) : 0;

          // Update the width and height of the square based on resizing
          const newWidth = Math.max(event.rect.width, 50);
          const newHeight = Math.max(event.rect.height, 50);

          target.style.width = `${newWidth}px`;
          target.style.height = `${newHeight}px`;

          // Update the square's position attributes
          target.style.transform = `translate(${x}px, ${y}px) rotate(${currentRotation}deg)`;

          onChangeSize(newHeight, newWidth);
        },
      })
      .on('doubletap', handleDoubleTap)
      .on('up', () => {
        // Reset the doubleTapHandled flag when the user releases the touch or mouse button
        doubleTapHandled = false;
      });
    return () => {
        interactInstance.off('doubletap', handleDoubleTap);
    }
  }, [m_id, m_zIndex, m_rotation, m_x, m_y, m_width, m_height, m_imageURL, onMoveUpdate, onRotate, onChangeURL, onChangeSize, onDoubleTap]);

  return (
    <img ref={thisRef}
    src={currentImage} width={mainWidth} height={mainHeight} 
    style={{transform: translateString}}
    ></img>
    );
};

export default ImageComponent;
