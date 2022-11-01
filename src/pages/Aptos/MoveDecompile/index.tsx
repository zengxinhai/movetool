import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
    Backdrop,
    CircularProgress,
    Stack,
    TextField,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { decompileMoveCode } from "./helper";

const DecompiledResult: FC<{code: string}> = ({ code }) => {
    return (
        <Box sx={{ height: '100%', flexGrow: 1, maxWidth: '100%', overflowY: 'auto' }}>
            <Typography
                sx={{flex: '1 1 100%'}}
                color="inherit"
                variant="subtitle1"
                component="div">
                    { code }
            </Typography>
        </Box>
    );
}

const MoveDecompilePage: FC = () => {
    const {t} = useTranslation();

    const [loading, setLoading] = React.useState(false);
    const [input, setInput] = useState("");
    const [decompileCode, setDecompileCode] = useState("");

    const handleDecompile = async () => {
        try {
            setLoading(true);
            const decompileCode = await decompileMoveCode(input);
            setDecompileCode(decompileCode);
            setLoading(false);
        } catch (e) {
            setDecompileCode("");
            setLoading(false);
            window.console.error(e);
        }
    };
    return (
        <>
            <Backdrop
                sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit" size={160}/>
            </Backdrop>

            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            aria-readonly
                            id="outlined-multiline-static"
                            label={t("aptos.title")}
                            value={input}
                            onChange={(v) => {
                                setInput(v.target.value);
                            }}
                            multiline
                            rows={10}
                        />
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button variant="contained" fullWidth onClick={handleDecompile}>
                        {t("aptos.resolve")}
                    </Button>
                </CardActions>
            </Card>
            
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <DecompiledResult code={decompileCode} />
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}

export default MoveDecompilePage;
