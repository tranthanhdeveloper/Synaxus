import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import React from "react";

export default function AddNewSynap({ onAddNewNode }: { onAddNewNode: (lable: string) => void }) {
    const [name, setName] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement>();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(undefined);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAddNewNode(name);
        handleClose();
    };


    const open = Boolean(anchorEl);
    const id = open ? 'add-new-synap-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                New Synap
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2, width: 300, borderRadius: 1, boxShadow: 3 }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Box>
            </Popover>
        </div>
    );
}