import { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { IoChatbubblesOutline } from "react-icons/io5";
import { appointmentApi } from "../../../../services/api";
import { useChat } from "../../../../hooks/useChat";

export default function DoctorChat() {
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
          const validApps = res.data.filter(a =>
            ['confirmed', 'in_progress', 'completed'].includes(a.status)
          );
          setAppointments(validApps);
        })
        .catch(err => console.error("Lỗi tải danh sách:", err));
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  const activeApp = appointments.find(a => a.id === activeId);

  return (
    <>
      {!open && (
        <button className={styles.floatingBtn} onClick={() => setOpen(true)}>
          <IoChatbubblesOutline className={styles.floatingIcon} />
        </button>
      )}

      {open && (
        <div className={styles.chatPopup}>
          <div className={styles.chatBox}>

            <header className={styles.header}>
              <div className={styles.headerTitle}>
                {activeApp ? `BN. ${activeApp.patientName}` : "Phòng Tư Vấn Trực Tuyến"}
              </div>
              <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
            </header>

            <div className={styles.body3col}>

              <aside className={styles.roomSidebar}>
                <div className={styles.roomHeader}>Bệnh nhân chờ</div>

                {appointments.length === 0 && <p style={{ padding: 10, fontSize: 12 }}>Chưa có lịch hẹn.</p>}

                {appointments.map(app => (
                  <div
                    key={app.id}
                    className={`${styles.roomItem} ${activeId === app.id ? styles.activeRoom : ''}`}
                    onClick={() => setActiveId(app.id)}
                  >
                    <div className={styles.roomName}>{app.patientName}</div>

                    <small style={{ color: '#666', fontSize: 11 }}>
                      {app.symptoms ? app.symptoms.substring(0, 25) + '...' : 'Không có triệu chứng'}
                    </small>
                    <div style={{ fontSize: 10, color: '#999', marginTop: 2 }}>
                      {new Date(app.appointmentDate).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                ))}
              </aside>
              <section className={styles.chatPanel}>
                <div className={styles.messages}>
                  {!activeId ? (
                    <div className={styles.welcome}>Chọn bệnh nhân để bắt đầu tư vấn.</div>
                  ) : (
                    <>
                      {loading && <p style={{ textAlign: 'center', fontSize: 12, color: '#888' }}>Đang tải...</p>}

                      {messages.map((msg, i) => {
                        const isMe = msg.senderId === myId;
                        return (
                          <div key={i} className={`${styles.messageRow} ${isMe ? styles.msgMe : styles.msgDoctor}`}>

                            {!isMe && <img src="/avatars/patient.png" className={styles.msgAvatar} alt="pat" />}

                            <div>
                              <div className={styles.msgBubble}>{msg.content}</div>
                              <div className={styles.msgTime}>
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>
                {activeId && (
                  <div className={styles.footer}>
                    <input
                      className={styles.input}
                      value={text}
                      onChange={e => setText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      placeholder="Nhập lời khuyên..."
                    />
                    <button className={styles.sendBtn} onClick={handleSend}>Gửi</button>
                  </div>
                )}
              </section>
              <aside className={styles.infoSidebar}>
                <div className={styles.infoHeader}>Thông tin ca bệnh</div>

                {activeApp ? (
                  <div style={{ padding: 15, fontSize: 13 }}>
                    <div style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5 }}>
                      {activeApp.patientName}
                    </div>
                    <div style={{ color: '#555', marginBottom: 15 }}>
                      Mã hồ sơ: {activeApp.patientId}
                    </div>

                    <hr style={{ border: '0.5px solid #eee' }} />

                    <p style={{ marginTop: 10 }}><strong>Triệu chứng:</strong></p>
                    <p style={{ background: '#f9f9f9', padding: 8, borderRadius: 5, marginTop: 5 }}>
                      {activeApp.symptoms || "Chưa ghi nhận"}
                    </p>

                    <p style={{ marginTop: 15 }}><strong>Ghi chú nhanh:</strong></p>
                    <textarea
                      style={{ width: '100%', height: 80, marginTop: 5, padding: 5, borderColor: '#ddd' }}
                      placeholder="Ghi chú cá nhân của bác sĩ..."
                    />
                  </div>
                ) : (
                  <div style={{ padding: 15, color: '#888', fontSize: 13, textAlign: 'center' }}>
                    Chọn bệnh nhân để xem hồ sơ.
                  </div>
                )}
              </aside>

            </div>
          </div>
        </div>
      )}
    </>
  );
}