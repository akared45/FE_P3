// src/components/Chat/DoctorChat/ChatWindow.jsx

import { useEffect } from "react";
import {
  Box, Avatar, Typography, IconButton, Paper, CircularProgress,
  TextField, InputAdornment
} from "@mui/material";
import {
  Close as CloseIcon,
  Person as PersonIcon,
  MedicalServices as MedicalIcon,
  Send as SendIcon
} from "@mui/icons-material";

export default function ChatWindow({
  activeApp,
  messages,
  loading,
  myId,
  text,
  setText,
  handleSend,
  isConnected,
  messagesEndRef,
  onClose
}) {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#f5f7fb', overflow: 'hidden' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', flexShrink: 0 }}>
        {activeApp ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>{activeApp.patientName.charAt(0)}</Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">{activeApp.patientName}</Typography>
              <Typography variant="caption" color="text.secondary">Mã hồ sơ: {activeApp.patientId}</Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="subtitle2" color="text.secondary">Chọn bệnh nhân</Typography>
        )}
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {!activeApp ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.disabled' }}>
            <MedicalIcon sx={{ fontSize: 80, mb: 2, opacity: 0.3 }} />
            <Typography variant="h6">Trung tâm tư vấn</Typography>
            <Typography>Vui lòng chọn hồ sơ bệnh án bên trái</Typography>
          </Box>
        ) : (
          <>
            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><CircularProgress size={24} /></Box>}
            
            {messages.map((msg, i) => {
              const isMe = msg.senderId === myId;
              return (
                <Box key={i} sx={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', mb: 1 }}>
                  {!isMe && <Avatar sx={{ width: 32, height: 32, mr: 1.5, bgcolor: 'grey.400' }}><PersonIcon sx={{ fontSize: 20 }} /></Avatar>}
                  
                  <Box sx={{ maxWidth: '85%' }}> 
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: isMe ? 'primary.main' : 'white',
                        color: isMe ? 'white' : 'text.primary',
                        borderTopRightRadius: isMe ? 0 : 3,
                        borderTopLeftRadius: !isMe ? 0 : 3,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        wordBreak: 'break-word'
                      }}
                    >
                      <Typography variant="body1" sx={{fontSize: '0.95rem', lineHeight: 1.5}}>{msg.content}</Typography>
                    </Paper>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: isMe ? 'right' : 'left', mt: 0.5, fontSize: 11, px: 1 }}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </Box>

      {activeApp && (
        <Box sx={{ p: 2, bgcolor: 'white', borderTop: 1, borderColor: 'divider', flexShrink: 0 }}>
          <TextField
            fullWidth
            placeholder={isConnected ? "Nhập lời khuyên, chỉ định..." : "Đang kết nối lại..."}
            variant="outlined"
            size="medium" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={!isConnected}
            InputProps={{
              sx: { borderRadius: 3, bgcolor: 'grey.50', pr: 1 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleSend} 
                    color="primary" 
                    disabled={!text.trim() || !isConnected}
                    sx={{ bgcolor: text.trim() ? 'primary.main' : 'transparent', color: text.trim() ? 'white' : 'inherit', '&:hover': { bgcolor: 'primary.dark' } }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
      )}
    </Box>
  );
}