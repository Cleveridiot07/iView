import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const WhiteboardContainer = () => {
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const ctxRef = useRef(null);
  const [color, setColor] = useState('#FFFFFF');
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8080');

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2;
    };

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
      socketRef.current.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
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
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    ctx.lineTo(x, y);
    ctx.stroke();
    socketRef.current.emit('draw', { x, y, color: ctx.strokeStyle });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div>
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