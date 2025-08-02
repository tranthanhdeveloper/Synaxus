import { Link, useParams, useNavigate, } from 'react-router-dom';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, Node, useReactFlow, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import './ResearchScreen.css'; // Import the CSS file
import { useCallback, useEffect, useState, useLayoutEffect} from 'react';
import { Research } from './Research';
import { getGeminiIdeas, generateGeminiContent } from './GeminiService';
import MDEditor from '@uiw/react-md-editor';
import { Button, TextField, CircularProgress, Box } from '@mui/material';
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
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
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
          setSelectedNode(storedData.nodes[0]);
        }
      } else {
        const initialNode = { id: '1', position: { x: 250, y: 250 }, data: { label: currentResearch.name, markdownContent: `# ${currentResearch.name}` } };
        setNodes([initialNode]);
        setSelectedNode(initialNode); // Select the root node by default
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
    setSelectedNode(node);
  }, []);

  const onMarkdownChange = useCallback((value?: string) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, markdownContent: value } }
            : node,
        ),
      );
      setSelectedNode((prev) => prev ? { ...prev, data: { ...prev.data, markdownContent: value } } : null);
    }
  }, [selectedNode, setNodes]);

  const onAddNode = useCallback(async () => {
    if (!research) return;

    setLoading(true);
    const ideas = await getGeminiIdeas(research.name, apiKey);
    setLoading(false);

    const newNodes = ideas.map((idea, index) => ({
      id: (nodes.length + index + 1).toString(),
      data: { label: idea.title, markdownContent: idea.explanation },
      position: {
        x: Math.random() * 500 - 250,
        y: Math.random() * 500 - 250,
      },
    }));

    setNodes((nds) => nds.concat(newNodes));
  }, [research, nodes, setNodes, apiKey]);

  const onQuerySubmit = useCallback(async () => {
    if (!queryText || !apiKey || !selectedNode) return;

    setLoading(true);
    const response = await generateGeminiContent(queryText, apiKey);
    setLoading(false);

    const newContent = `\n\n## AI Response\n\n${response}`;
    onMarkdownChange((selectedNode.data.markdownContent || '') + newContent);

    setQueryText('');
  }, [queryText, apiKey, selectedNode, onMarkdownChange]);

  if (!research) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
      >
        <Controls />
        <MiniMap />
        <Background />
        <Box className="sidebar">
          <Link to="/">
            <Button variant="contained" sx={{ mr: 1 }}>Back to Home</Button>
          </Link>
          <Button variant="contained" onClick={onAddNode} disabled={loading || !apiKey} sx={{ mr: 1 }}>
            {loading ? <CircularProgress size={24} /> : 'Generate Ideas'}
          </Button>
          {selectedNode && (
            <>
              <div data-color-mode="dark" style={{ marginTop: '16px', marginBottom: '16px' }}>
                <MDEditor
                  value={selectedNode.data.markdownContent || ''}
                  onChange={onMarkdownChange}
                  height={200}
                />
              </div>
              <TextField
                label="Query Gemini AI"
                variant="outlined"
                fullWidth
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Button variant="contained" onClick={onQuerySubmit} disabled={loading || !apiKey || !queryText || !selectedNode}>
                {loading ? <CircularProgress size={24} /> : 'Submit Query'}
              </Button>
            </>
          )}
        </Box>
      </ReactFlow>
    </div>
  );
}
