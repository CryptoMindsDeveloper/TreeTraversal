import React from 'react';

function StaticTree() {
 
  const nodes = [
    { id: 1, x: 200, y: 50, left: 2, right: 3 },
    { id: 2, x: 100, y: 150, left: 4, right: 5 },
    { id: 3, x: 300, y: 150, left: 6, right: 7 },
    { id: 4, x: 50, y: 250, left: null, right: null },
    { id: 5, x: 150, y: 250, left: null, right: null },
    { id: 6, x: 250, y: 250, left: null, right: null },
    { id: 7, x: 350, y: 250, left: null, right: null },
  ];

  return (
    <svg width="500" height="350" className="mx-auto">
      
      {nodes.map((node) => {
        const leftNode = nodes.find(n => n.id === node.left);
        const rightNode = nodes.find(n => n.id === node.right);

        return (
          <g key={node.id}>
         
            {leftNode && (
              <line
                x1={node.x}
                y1={node.y}
                x2={leftNode.x}
                y2={leftNode.y}
                stroke="black"
              />
            )}

            {rightNode && (
              <line
                x1={node.x}
                y1={node.y}
                x2={rightNode.x}
                y2={rightNode.y}
                stroke="black"
              />
            )}
          </g>
        );
      })}

    
      {nodes.map((node) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r="15" fill="green" stroke="black" />
          <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontSize="12">
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default StaticTree;
