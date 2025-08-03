import { Link, useParams, useNavigate, } from 'react-router-dom';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, Node, useReactFlow, ReactFlowProvider, useStoreApi } from 'reactflow';
import ResearchNode from './components/ResearchNode';

const nodeTypes = { researchNode: ResearchNode };
import 'reactflow/dist/style.css';
import './ResearchScreen.css'; // Import the CSS file
import { useCallback, useEffect, useState, useLayoutEffect} from 'react';
import { Research } from './Research';
import { getGeminiIdeas, generateGeminiContent } from './GeminiService';
import { Button, CircularProgress } from '@mui/material';
import { getMindMapData, setMindMapData } from './StoreService';

interface Props {
  apiKey: string;
  researches: Research[];
}

export default function ResearchScreen({ apiKey, researches }: Props) {
  const { id } = useParams();
  const [research, setResearch] = useState<Research | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [queryText, setQueryText] = useState('');
  const { setViewport, getViewport, fitView } = useReactFlow(); // Destructure fitView
  const navigate = useNavigate();

  useEffect(() => {
    const currentResearch = researches.find((r) => r.id === id);
    if (!currentResearch) {
      navigate('/'); // Navigate back to home if research not found
      return;
    }
    setResearch(currentResearch);

    const loadMindMap = async () => {
      const storedData = await getMindMapData(id!);
      if (storedData) {
        setNodes(storedData.nodes);
        setEdges(storedData.edges);
        setViewport(storedData.viewport);
        // Attempt to select the first node if available, or the root node if it exists
        if (storedData.nodes.length > 0) {
          setSelectedNodeId(storedData.nodes[0].id);
        }
      } else {
        const initialNode = { id: '1', type: 'researchNode', position: { x: 250, y: 250 }, data: { label: currentResearch.name, markdownContent: `# ${currentResearch.name}` } };
        setNodes([initialNode]);
        setSelectedNodeId(initialNode.id); // Select the root node by default
      }
    };
    loadMindMap();
  }, [id, setNodes, setEdges, setViewport, researches, navigate]);

  useLayoutEffect(() => {
    if (nodes.length > 0) {
      fitView();
    }
  }, [nodes, fitView]);

  useEffect(() => {
    if (research) {
      const viewport = getViewport();
      setMindMapData(research.id, { nodes, edges, viewport });
    }
  }, [nodes, edges, research, getViewport]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onMarkdownChange = useCallback((value?: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, markdownContent: value } }
          : node,
      ),
    );
  }, [selectedNodeId, setNodes]);

  const onAddNode = useCallback(async () => {
    if (!research) return;

    setLoading(true);
    const ideas = await getGeminiIdeas(research.name, apiKey);
    setLoading(false);

    const newNodes = ideas.map((idea, index) => ({
      id: (nodes.length + index + 1).toString(),
      type: 'researchNode',
      data: { label: idea.title, markdownContent: idea.explanation },
      position: {
        x: Math.random() * 500 - 250,
        y: Math.random() * 500 - 250,
      },
    }));

    setNodes((nds) => nds.concat(newNodes));
  }, [research, nodes, setNodes, apiKey]);

  const onQuerySubmit = useCallback(async () => {
    if (!queryText || !apiKey || !selectedNodeId) return;

    setLoading(true);
    const response = await generateGeminiContent(queryText, apiKey);
    setLoading(false);

    const newContent = `\n\n## AI Response\n\n${response}`;
    onMarkdownChange((nodes.find(node => node.id === selectedNodeId)?.data.markdownContent || '') + newContent);

    setQueryText('');
  }, [queryText, apiKey, selectedNodeId, onMarkdownChange, nodes]);

  if (!research) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            onMarkdownChange: onMarkdownChange,
            onQuerySubmit: onQuerySubmit,
            queryText: queryText,
            setQueryText: setQueryText,
            loading: loading,
            apiKey: apiKey,
          }
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background />
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
          <Link to="/">
            <Button variant="contained" sx={{ mr: 1 }}>Back to Home</Button>
          </Link>
          <Button variant="contained" onClick={onAddNode} disabled={loading || !apiKey} sx={{ mr: 1 }}>
            {loading ? <CircularProgress size={24} /> : 'Generate Ideas'}
          </Button>
        </div>
        
      </ReactFlow>
    </div>
  );
}
