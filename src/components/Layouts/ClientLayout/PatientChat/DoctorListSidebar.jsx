import {
    Box, Grid, List, ListItemButton, ListItemText, ListItemAvatar,
    Avatar, Typography, Chip, Divider
} from "@mui/material";
import { FiberManualRecord as DotIcon, Person as DoctorIcon } from "@mui/icons-material";

export default function DoctorListSidebar({
    appointments,
    activeId,
    setActiveId,
    isConnected
}) {
    return (
        <Grid item sx={{ width: '300px', borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
            <Box sx={{ p: 2.5, borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'primary.main' }}>
                    Tư vấn sức khỏe
                </Typography>
                <Chip
                    icon={<DotIcon style={{ fontSize: 12 }} />}
                    label={isConnected ? "Trực tuyến" : "Mất kết nối"}
                    color={isConnected ? "success" : "default"}
                    size="small"
                    variant="outlined"
                    sx={{ mt: 1, height: 24, fontSize: 11, border: 'none', bgcolor: isConnected ? '#e6fffa' : '#f5f5f5' }}
                />
            </Box>

            <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
                {appointments.length === 0 && (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Bạn chưa có lịch hẹn nào.
                        </Typography>
                    </Box>
                )}

                {appointments.map((app) => (
                    <Box key={app.id}>
                        <ListItemButton
                            selected={activeId === app.id}
                            onClick={() => setActiveId(app.id)}
                            sx={{
                                py: 2,
                                '&.Mui-selected': {
                                    bgcolor: '#e3f2fd',
                                    borderRight: '4px solid',
                                    borderColor: 'primary.main'
                                },
                                '&:hover': { bgcolor: 'grey.50' }
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'primary.main', width: 45, height: 45 }}>
                                    <DoctorIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={app.doctorName}
                                secondary={
                                    <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                                        {new Date(app.appointmentDate).toLocaleDateString('vi-VN')}
                                    </Typography>
                                }
                                primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 'bold' }}
                            />
                        </ListItemButton>
                        <Divider component="li" />
                    </Box>
                ))}
            </List>
        </Grid>
    );
}