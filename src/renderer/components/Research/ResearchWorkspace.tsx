import { useParams, useNavigate, } from 'react-router-dom';
import '@xyflow/react/dist/style.css';
import MindMapCanvas from './MindMapCanvas';
import { Box, LinearProgress } from '@mui/material';
import useStore from 'renderer/store/store';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useState } from 'react';
import { getResearchById, getResearchMapData} from 'renderer/services/StoreService';
import useAppStore from 'renderer/store/store';

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

export default function ResearchScreen() {

  const { researchId } = useParams() as { researchId: string };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setNodes, setEdges } = useAppStore(
    useShallow(selector),
  );
  useEffect(() => {
    async function loadResearch() {
      const data = await getResearchById(researchId);
      const mapData = await getResearchMapData(researchId);
      if (data) {
        useAppStore.getState().setNodes(nodes);
        useAppStore.getState().setEdges(edges);
      }
    }
    loadResearch();
    setLoading(false);
  }, [researchId]);

  return (
    <>
      {loading && <Box sx={{ width: '100%' }} >
        <LinearProgress />
      </Box>}
      <div style={{ width: '100vw', height: '100vh' }}>
        <MindMapCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </div>
    </>
  );
}
