import React, { useEffect, useRef, useState } from 'react';
import { connectToInterview } from '../../socket/socket'; // Import the updated socket connection function

const WhiteboardContainer = () => {
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const ctxRef = useRef(null);
  const [color, setColor] = useState('#FFFFFF');
  const [isDrawing, setIsDrawing] = useState(false);

  // Get the interviewID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const interviewID = urlParams.get('interviewID');

  useEffect(() => {
    // Connect to the specific interview room
    const { socket } = connectToInterview(interviewID);
    socketRef.current = socket;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    const resizeCanvas = () => {
      const parent = canvas.parentNode;
      // Set canvas size to match its parent container
      canvas.width = parent.offsetWidth;  
      canvas.height = parent.offsetHeight; 
      
      // Setup initial drawing properties
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2;
    };

    // Call resizeCanvas on initial render and whenever the window resizes
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    socketRef.current.on('draw', ({ x, y, color }) => {
      ctx.strokeStyle = color;
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    socketRef.current.on('down', ({ x, y, color }) => {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y);
    });

    return () => {
      socketRef.current.disconnect(); // Disconnect socket on unmount
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [interviewID]); // Re-run the effect if the interviewID changes

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    
    // Use getBoundingClientRect to get the canvas position relative to the page
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    socketRef.current.emit('down', { x, y, color: ctx.strokeStyle });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    
    // Use getBoundingClientRect to get the canvas position relative to the page
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    socketRef.current.emit('draw', { x, y, color: ctx.strokeStyle });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ border: '1px solid #000', display: 'block' }}
      />
    </div>
  );
};

export default WhiteboardContainer;
