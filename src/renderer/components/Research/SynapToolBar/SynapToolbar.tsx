import { NodeToolbar, NodeToolbarProps } from "reactflow";

export default function SynapToolbar({isVisible, position}: NodeToolbarProps) {
  return (
    <>
      <NodeToolbar
        isVisible={isVisible}
        position={position}
      >
        <button>cut</button>
        <button>copy</button>
        <button>paste</button>
      </NodeToolbar>
    </>
  );
}

