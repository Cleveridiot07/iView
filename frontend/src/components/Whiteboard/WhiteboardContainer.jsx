import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Rect, Circle } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

const WhiteboardComponent = () => {
  const [shapes, setShapes] = useState([]);
  const [tool, setTool] = useState('pen');
  const [penSize, setPenSize] = useState(5);
  const [color, setColor] = useState('black');
  const [history, setHistory] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    const newShape = {
      id: uuidv4(),
      tool,
      points: [{ x, y }],
      x,
      y,
      width: 0,
      height: 0,
      stroke: color,
      strokeWidth: penSize,
    };
    setShapes([...shapes, newShape]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    const lastShape = shapes[shapes.length - 1];

    if (tool === 'pen') {
      lastShape.points = lastShape.points.concat([{ x, y }]);
    } else {
      lastShape.width = x - lastShape.x;
      lastShape.height = y - lastShape.y;
    }
    shapes.splice(shapes.length - 1, 1, lastShape);
    setShapes([...shapes]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    setHistory([...history, shapes]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    setShapes(history[history.length - 1]);
    setHistory(history.slice(0, -1));
  };

  return (
    <div className='bg-gray-200 rounded-md'>




        <div className='w-full h-15 flex justify-center'>
            <div className='w-[50vw] h-10 flex justify-center items-center gap-5 bg-slate-900 rounded-b-lg shadow-lg'>
                <div onClick={() => setTool('pen')} className='w-9 h-9 flex justify-center items-center rounded-md'>
                    <svg className="h-8 w-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                    </svg>
                </div>
                <div onClick={() => setTool('eraser')} className='w-9 h-9 flex justify-center items-center rounded-md'>
                    <svg class="h-8 w-8 text-gray-200"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M19 19h-11l-4 -4a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9 9" />  <path d="M18 12.3l-6.3 -6.3" /></svg>
                </div>
                <div onClick={() => setTool('circle')} className='w-9 h-9 flex justify-center items-center rounded-md'>
                    <svg class="h-8 w-8 text-gray-200"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" /></svg>
                </div>
                <div onClick={() => setTool('rectangle')} className='w-9 h-9 flex justify-center items-center rounded-md'>
                    <svg class="h-7 w-7 text-gray-200"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>
                </div>
                <div onClick={handleUndo}  className='w-9 h-9 flex justify-center items-center rounded-md'>
                    <svg class="h-8 w-8 text-gray-200"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /></svg>
                </div>
                
            </div>
        </div>

{/*         
hy */}

      {/* <div style={{ marginBottom: '10px' }}>
        <div >
            <button onClick={() => setTool('pen')} type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" >Pen</button>
            <button onClick={() => setTool('eraser')} type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Eraser</button>
            <button onClick={() => setTool('rectangle')} type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Rectangle</button>
            <button onClick={() => setTool('circle')} type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Circle</button>
            <button onClick={handleUndo} type="button" class="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">Undo</button>
            <button type="button" class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">Purple</button>
        </div>

        <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white" >
          Pen Size:
          <input
            className=' bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
            type="range"


            min="1"
            max="20"
            value={penSize}
            onChange={(e) => setPenSize(parseInt(e.target.value))}
          />
        </label>
            
        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <span className="mr-2">Color:</span>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="rounded-md border-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
        </label>

      </div> */}
      <div className='flex'>
            <div className='bg-slate-900 items-center rounded-r-md flex flex-col left w-10 h-[60vh]'>
            <svg class="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="5" cy="12" r="1" />  <circle cx="12" cy="12" r="1" />  <circle cx="19" cy="12" r="1" /></svg>
            </div>
      <Stage
        width={900} 
        height={500}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {shapes.map((shape) => {
            if (shape.tool === 'pen') {
              return (
                <Line
                  key={shape.id}
                  points={shape.points.flatMap(point => [point.x, point.y])}
                  stroke={tool === 'eraser' ? 'white' : shape.stroke}
                  strokeWidth={shape.strokeWidth}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    tool === 'eraser' ? 'destination-out' : 'source-over'
                  }
                  draggable
                />
              );
            } else if (shape.tool === 'rectangle') {
              return (
                <Rect
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  stroke={shape.stroke}
                  strokeWidth={shape.strokeWidth}
                  draggable
                />
              );
            } else if (shape.tool === 'circle') {
              const radius = Math.sqrt(shape.width ** 2 + shape.height ** 2) / 2;
              return (
                <Circle
                  key={shape.id}
                  x={shape.x + shape.width / 2}
                  y={shape.y + shape.height / 2}
                  radius={radius}
                  stroke={shape.stroke}
                  strokeWidth={shape.strokeWidth}
                  draggable
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
      </div>
    </div>
  );
};

export default WhiteboardComponent;
