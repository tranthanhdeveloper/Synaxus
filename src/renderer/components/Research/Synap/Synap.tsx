import { Handle, Position } from 'reactflow';
import MDEditor from '@uiw/react-md-editor';
import { Button, TextField, CircularProgress, Box } from '@mui/material';
import { NodeProps } from 'reactflow';

interface ResearchNodeData {
  label: string;
  markdownContent: string;
  onMarkdownChange: (value?: string) => void;
  onQuerySubmit: () => void;
  queryText: string;
  setQueryText: (text: string) => void;
  loading: boolean;
  apiKey: string;
}

export default function ResearchNode({ data }: NodeProps<ResearchNodeData>) {
  return (
    <div className="react-flow__node-default custom-node">
      <Handle type="target" position={Position.Top} />
      <Box sx={{ p: 2, border: '1px solid #555', borderRadius: '5px', minWidth: '300px', maxWidth: '500px' }}>
        <h4>{data.label}</h4>
        <div data-color-mode="dark" style={{ marginTop: '8px', marginBottom: '8px' }}>
          <MDEditor
            value={data.markdownContent || ''}
            onChange={data.onMarkdownChange}
            height={200}
          />
        </div>
        <TextField
          label="Query Gemini AI"
          variant="outlined"
          fullWidth
          value={data.queryText}
          onChange={(e) => data.setQueryText(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button
          variant="contained"
          onClick={data.onQuerySubmit}
          disabled={data.loading || !data.apiKey || !data.queryText}
        >
          {data.loading ? <CircularProgress size={24} /> : 'Submit Query'}
        </Button>
      </Box>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
