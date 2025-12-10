import {
    Box, Grid, List, ListItemButton, ListItemText, ListItemAvatar,
    Avatar, Typography, Chip, ListSubheader, Divider
} from "@mui/material";
import { FiberManualRecord as DotIcon } from "@mui/icons-material";

export default function PatientListSidebar({
    appointments,
    activeId,
    setActiveId,
    isConnected
}) {
    const groupedApps = {
        in_progress: appointments.filter(a => a.status === 'in_progress'),
        confirmed: appointments.filter(a => a.status === 'confirmed'),
        completed: appointments.filter(a => a.status === 'completed'),
    };

    const statusLabels = {
        in_progress: 'Đang diễn ra',
        confirmed: 'Chờ tư vấn',
        completed: 'Lịch sử'
    };

    return (
        <Grid item xs={3} sx={{ borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Tư vấn trực tuyến
                </Typography>
                <Chip
                    icon={<DotIcon style={{ fontSize: 12 }} />}
                    label={isConnected ? "Hệ thống Online" : "Mất kết nối"}
                    color={isConnected ? "success" : "error"}
                    size="small"
                    variant="outlined"
                    sx={{ mt: 1, height: 24, fontSize: 11 }}
                />
            </Box>

            {/* List */}
            <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
                {appointments.length === 0 && (
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
                        Chưa có lịch hẹn nào.
                    </Typography>
                )}

                {Object.keys(groupedApps).map((status) => (
                    groupedApps[status].length > 0 && (
                        <Box key={status}>
                            <ListSubheader sx={{ lineHeight: '30px', bgcolor: 'background.paper', fontSize: 11, textTransform: 'uppercase' }}>
                                {statusLabels[status]}
                            </ListSubheader>
                            {groupedApps[status].map((app) => (
                                <ListItemButton
                                    key={app.id}
                                    selected={activeId === app.id}
                                    onClick={() => setActiveId(app.id)}
                                    sx={{
                                        '&.Mui-selected': { bgcolor: 'primary.lighter', borderLeft: '4px solid', borderColor: 'primary.main' }
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: status === 'in_progress' ? 'primary.main' : 'grey.400', width: 36, height: 36, fontSize: 14 }}>
                                            {app.patientName.charAt(0)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={app.patientName}
                                        secondary={app.symptoms || "Tư vấn chung"}
                                        primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
                                        secondaryTypographyProps={{ variant: 'caption', noWrap: true }}
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(app.appointmentDate).getHours()}:{new Date(app.appointmentDate).getMinutes().toString().padStart(2, '0')}
                                    </Typography>
                                </ListItemButton>
                            ))}
                            <Divider />
                        </Box>
                    )
                ))}
            </List>
        </Grid>
    );
}