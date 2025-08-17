import { Box, Button, Divider, IconButton, TextField } from "@mui/material";

function PromptInput() {

    return (

        <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Type your message..."
                onKeyUp={(e) => e.key === 'Enter' && console.log('Send message')}
            />
            <Divider/>
            <Button variant="contained" onClick={() => console.log('Send message')}>
                Send
            </Button>

        </Box>
    )
}

export default PromptInput;