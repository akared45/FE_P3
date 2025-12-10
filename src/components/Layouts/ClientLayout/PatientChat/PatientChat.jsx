import { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss"; 
import { IoChatbubblesOutline } from "react-icons/io5";
import { appointmentApi } from "../../../../services/api";
import { useChat } from "../../../../hooks/useChat";

export default function PatientChat() {
  const [open, setOpen] = useState(false);
  
  const [appointments, setAppointments] = useState([]); 
  
  const [activeId, setActiveId] = useState(null); 
  
  const [text, setText] = useState("");
  const [myId, setMyId] = useState(null);
  const messagesEndRef = useRef(null);

  const { messages, sendMessage, loading } = useChat(activeId);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setMyId(user.id || user._id);

    if (open) {
      appointmentApi.getMyAppointments()
        .then((res) => {
          console.log("Dữ liệu API trả về:", res);
          const validApps = res.data.filter(a => 
            ['confirmed', 'in_progress'].includes(a.status)
          );
          setAppointments(validApps);
        })
        .catch(err => console.error("Lỗi lấy danh sách:", err));
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = () => {
    console.log("1. Đã bấm nút gửi. Text:", text); // <--- Log 1
    console.log("2. Active ID:", activeId);        // <--- Log 2

    if (!text.trim()) {
        console.log("Lỗi: Text rỗng");
        return;
    }
    
    sendMessage(text); 
    console.log("3. Đã gọi hàm sendMessage từ Hook"); // <--- Log 3
    setText("");
  };

  // Tìm thông tin phòng đang chọn để hiển thị trên Header
  const activeRoom = appointments.find(a => a.id === activeId);

  return (
    <>
      {/* Nút Chat Tròn */}
      {!open && (
        <button className={styles.floatingBtn} onClick={() => setOpen(true)}>
          <IoChatbubblesOutline className={styles.floatingIcon} />
        </button>
      )}

      {/* Popup Chat */}
      {open && (
        <div className={styles.chatPopup}>
          <div className={styles.chatBox}>
            
            {/* --- HEADER --- */}
            <header className={styles.header}>
              <div className={styles.headerTitle}>
                {/* Nếu đã chọn phòng thì hiện tên Bác sĩ, chưa thì hiện tiêu đề chung */}
                {activeRoom ? `${activeRoom.doctorName}` : "Danh sách Bác sĩ"}
              </div>
              <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
            </header>

            <div className={styles.body3col}>
              
              {/* --- SIDEBAR TRÁI (DANH SÁCH) --- */}
              <aside className={styles.roomSidebar} style={{width: '30%'}}>
                {appointments.length === 0 && <p style={{padding:10, fontSize:12}}>Chưa có lịch hẹn.</p>}
                
                {appointments.map(app => (
                  <div 
                    key={app.id} 
                    // Nếu ID này đang active thì thêm class active
                    className={`${styles.roomItem} ${activeId === app.id ? styles.activeRoom : ''}`}
                    // Bấm vào thì set Active ID -> Hook useChat sẽ chạy lại
                    onClick={() => setActiveId(app.id)}
                  >
                    {/* Hiển thị tên Bác sĩ từ API */}
                    <div className={styles.roomName}>{app.doctorName}</div>
                    
                    {/* Hiển thị ngày khám */}
                    <small className={styles.roomDate}>
                        {new Date(app.appointmentDate).toLocaleDateString('vi-VN')}
                    </small>
                  </div>
                ))}
              </aside>

              {/* --- KHUNG CHAT (PHẢI) --- */}
              <section className={styles.chatPanel} style={{width: '70%'}}>
                <div className={styles.messages}>
                  {!activeId ? (
                    <div className={styles.welcome}>Vui lòng chọn một bác sĩ để chat.</div>
                  ) : (
                    <>
                      {loading && <p style={{textAlign:'center', fontSize:12, color:'#888'}}>Đang tải tin nhắn...</p>}
                      
                      {messages.map((msg, i) => {
                        // Kiểm tra tin nhắn của mình hay người khác
                        const isMe = msg.senderId === myId;
                        return (
                          <div key={i} className={`${styles.messageRow} ${isMe ? styles.msgMe : styles.msgDoctor}`}>
                            {!isMe && <img src="/avatars/doctor.png" className={styles.msgAvatar} />}
                            <div className={styles.msgBubble}>{msg.content}</div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Input chỉ hiện khi đã chọn phòng */}
                {activeId && (
                  <div className={styles.footer}>
                    <input 
                      className={styles.input} 
                      value={text} 
                      onChange={e => setText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      placeholder="Nhập tin nhắn..."
                    />
                    <button className={styles.sendBtn} onClick={handleSend}>Gửi</button>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}