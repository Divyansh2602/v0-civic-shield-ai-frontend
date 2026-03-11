'use client';

import { motion } from 'framer-motion';

interface GraphNode {
  id: string;
  label: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  x: number;
  y: number;
}

interface GraphEdge {
  from: string;
  to: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

const nodes: GraphNode[] = [
  { id: 'main', label: 'http://demo.testfire.net', severity: 'high', x: 50, y: 50 },
  { id: 'n1', label: 'http://demo.testfire.net/default.jsp', severity: 'low', x: 25, y: 35 },
  { id: 'n2', label: 'http://demo.testfire.net/subscribe.jsp', severity: 'medium', x: 75, y: 35 },
  { id: 'n3', label: 'http://demo.testfire.net/sendFeedback', severity: 'critical', x: 25, y: 65 },
  { id: 'n4', label: 'http://demo.testfire.net/status_check.jsp', severity: 'low', x: 75, y: 65 },
  { id: 'n5', label: 'http://demo.testfire.net/feedback.jsp', severity: 'medium', x: 50, y: 80 },
];

const edges: GraphEdge[] = [
  { from: 'main', to: 'n1', severity: 'low' },
  { from: 'main', to: 'n2', severity: 'high' },
  { from: 'main', to: 'n3', severity: 'critical' },
  { from: 'main', to: 'n4', severity: 'low' },
  { from: 'main', to: 'n5', severity: 'medium' },
  { from: 'n3', to: 'n5', severity: 'medium' },
];

export function NetworkGraph() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#ff3366';
      case 'high':
        return '#fbbf24';
      case 'medium':
        return '#3b82f6';
      default:
        return '#00f5a0';
    }
  };

  return (
    <div className="relative w-full h-96 rounded-lg border border-white/10 bg-black/20 overflow-hidden">
      {/* SVG Canvas for Connections */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
          </marker>
        </defs>

        {edges.map((edge, idx) => {
          const fromNode = nodes.find((n) => n.id === edge.from)!;
          const toNode = nodes.find((n) => n.id === edge.to)!;

          return (
            <motion.line
              key={`${edge.from}-${edge.to}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke={getSeverityColor(edge.severity)}
              strokeWidth="2"
              strokeOpacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: idx * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, idx) => (
        <motion.div
          key={node.id}
          className="absolute group"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
          {/* Outer Circle */}
          <div
            className="absolute inset-0 rounded-full border-2"
            style={{
              width: node.id === 'main' ? '48px' : '32px',
              height: node.id === 'main' ? '48px' : '32px',
              borderColor: getSeverityColor(node.severity),
              top: node.id === 'main' ? '-24px' : '-16px',
              left: node.id === 'main' ? '-24px' : '-16px',
              background: getSeverityColor(node.severity) + '15',
              boxShadow: `0 0 20px ${getSeverityColor(node.severity)}40`,
            }}
          />

          {/* Inner Dot */}
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: getSeverityColor(node.severity),
            }}
          />

          {/* Tooltip */}
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block z-10"
            initial={{ opacity: 0, y: -5 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            <div className="bg-black/95 border border-white/20 rounded-lg px-3 py-2 whitespace-nowrap text-xs">
              <p className="text-white font-semibold max-w-xs truncate">{node.label}</p>
              <p className="text-muted-foreground text-xs mt-1">Risk: {node.severity}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
