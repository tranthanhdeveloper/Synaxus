import { useParams, useNavigate, } from 'react-router-dom';
import '@xyflow/react/dist/style.css';
import MindMapCanvas from './MindMapCanvas';
import { Box, LinearProgress } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useRef, useState } from 'react';
import { getResearchById, getResearchMapData, setResearchMapData } from 'renderer/services/StoreService';
import useAppStore from 'renderer/store/store';
import { useSynapCreation } from 'renderer/hooks/useSynapCreation/useSynapCreation';
import { Research } from 'renderer/types/types';
import ResizableSidebar from './Panel/SynapInfo';

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
  const { createSynapNode } = useSynapCreation();
  const [loading, setLoading] = useState(true);
  const research = useRef<Research>(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setNodes, setEdges } = useAppStore(
    useShallow(selector),
  );
  useEffect(() => {
    async function loadResearch() {
      const data = await getResearchById(researchId);
      const mapData = await getResearchMapData(data.path)
      research.current = data;
      setNodes(mapData.research.nodes);
      setEdges(mapData.research.edges);
    }
    loadResearch();
    setLoading(false);
  }, [researchId]);

  useEffect(() => {
    async function updateResearchMapData() {
      if (research.current) {
        const researchMapData = await getResearchMapData(research.current.path);
        researchMapData.research.nodes = nodes;
        await setResearchMapData(research.current.path, researchMapData);
      }
    }
    updateResearchMapData();
  }, [nodes]);


  return (
    <>
      {loading && <Box sx={{ width: '100%' }} >
        <LinearProgress />
      </Box>}
      <div style={{width:'100vw', height: '100vh', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
        <MindMapCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onAddNewNode={createSynapNode}
        />
        <ResizableSidebar/>
      
      </div>
    </>
  );
}
