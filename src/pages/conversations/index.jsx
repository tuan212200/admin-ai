import React, { useState, useEffect } from 'react';
import { 
  Input, 
  Layout, 
  List, 
  Typography, 
  Avatar, 
  Badge, 
  Table, 
  Space, 
  Card,
  Button,
  Divider,
  Tag,
  Row,
  Col,
  Tooltip
} from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  ClockCircleOutlined,
  SendOutlined,
  PaperClipOutlined,
  SmileOutlined
} from '@ant-design/icons';
import './styles.css';

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

// Mock data for conversations
const mockConversations = [
  {
    id: 349,
    name: 'Lê Công Luận',
    date: '2025-08-06',
    lastMessage: 'đánh giá tình trạng nhân viên offline tại vùng HCM',
    timestamp: '2025-08-06 15:52:44',
    unread: 0
  },
  {
    id: 348,
    name: 'Lê Công Luận',
    date: '2025-08-06',
    lastMessage: 'Chào anh/chị!',
    timestamp: '2025-08-06 15:50:30',
    unread: 2
  },
  {
    id: 347,
    name: 'Bùi Quốc Việt',
    date: '2025-08-06',
    lastMessage: 'Em xin phép được cung cấp thông tin về nhân viên offline',
    timestamp: '2025-08-06 15:45:12',
    unread: 1
  },
  {
    id: 346,
    name: 'Lê Công Luận',
    date: '2025-08-06',
    lastMessage: 'còn vùng HN thì sao',
    timestamp: '2025-08-06 15:53:09',
    unread: 0
  },
  {
    id: 345,
    name: 'Lê Công Luận',
    date: '2025-08-06',
    lastMessage: 'vùng TPHN',
    timestamp: '2025-08-06 15:53:33',
    unread: 0
  },
];

// Mock data for HCM staff
const hcmStaffData = [
  {
    key: '1',
    npp: 'HUỆ THIÊN PHÚ',
    nhanVien: 'Nguyễn Phi Khanh',
    ghiChu: 'Chưa checkin',
    thoiGianOnline: '0.0'
  },
  {
    key: '2',
    npp: 'HUỆ THIÊN PHÚ',
    nhanVien: 'Trần Xuân Hậu',
    ghiChu: 'Chưa checkin',
    thoiGianOnline: '0.0'
  },
  {
    key: '3',
    npp: 'CẨM HƯƠNG',
    nhanVien: 'Cao Trọng Bảo Duy',
    ghiChu: 'Online 72 phút trước',
    thoiGianOnline: '1754466036.0'
  },
  {
    key: '4',
    npp: 'HUỲNH GIA',
    nhanVien: 'Phạm Yến Trinh',
    ghiChu: 'Online 62 phút trước',
    thoiGianOnline: '1754466617.0'
  },
  {
    key: '5',
    npp: 'CRAFTSMANSHIP',
    nhanVien: 'Trương Văn Minh',
    ghiChu: 'Online 62 phút trước',
    thoiGianOnline: '1754466580.0'
  }
];

// Mock data for other region staff
const otherStaffData = [
  {
    key: '1',
    npp: 'KHÁNH HÀ',
    nhanVien: 'Nguyễn Hữu Nhi',
    ghiChu: 'Chưa checkin',
    thoiGianOnline: '0.0'
  },
  {
    key: '2',
    npp: 'HỮU THỦY HD',
    nhanVien: 'Trần Trung Đàn',
    ghiChu: 'Chưa checkin',
    thoiGianOnline: '0.0'
  },
  {
    key: '3',
    npp: 'MỸ LOAN TG',
    nhanVien: 'Nguyễn Ngọc Lễ',
    ghiChu: 'Chưa checkin',
    thoiGianOnline: '0.0'
  },
  {
    key: '4',
    npp: 'HƯNG PHÁT',
    nhanVien: 'Nguyễn Văn Thắng',
    ghiChu: 'Chưa checkin',
    thoiGianOnline: '0.0'
  }
];

const ConversationsPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredConversations, setFilteredConversations] = useState(mockConversations);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  // Initialize with the first conversation
  useEffect(() => {
    if (mockConversations.length > 0) {
      setSelectedChat(mockConversations[0]);
      
      // Set up mock messages based on the selected conversation
      const initialMessages = [
        {
          id: 1,
          text: 'đánh giá tình trạng nhân viên offline tại vùng HCM',
          sender: 'user',
          timestamp: '2025-08-06 15:52:44'
        },
        {
          id: 2,
          text: 'Chào anh/chị! 😊 Em rất vui được hỗ trợ.\nDưới đây là danh sách nhân viên offline tại khu vực HCM:',
          sender: 'ai',
          timestamp: '2025-08-06 15:53:00',
          staffData: hcmStaffData
        },
        {
          id: 3,
          text: 'còn vùng HN thì sao',
          sender: 'user',
          timestamp: '2025-08-06 15:53:09'
        },
        {
          id: 4,
          text: 'Hiện tại em không tìm thấy thông tin Khu vực mà anh/chị yêu cầu',
          sender: 'ai',
          timestamp: '2025-08-06 15:53:20'
        },
        {
          id: 5,
          text: 'vùng TPHN',
          sender: 'user',
          timestamp: '2025-08-06 15:53:33'
        },
        {
          id: 6,
          text: 'Dạ, em xin phép được cung cấp thông tin về nhân viên offline.\nDưới đây là danh sách nhân viên offline:',
          sender: 'ai',
          timestamp: '2025-08-06 15:53:40',
          staffData: otherStaffData
        }
      ];
      
      setMessages(initialMessages);
    }
  }, []);

  // Filter conversations based on search
  useEffect(() => {
    if (searchValue) {
      const filtered = mockConversations.filter(
        (conv) => conv.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                 conv.lastMessage.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(mockConversations);
    }
  }, [searchValue]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    // In a real app, you would fetch actual messages for this chat
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageText,
        sender: 'user',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      
      setMessages([...messages, newMessage]);
      setMessageText('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: 'Tôi sẽ kiểm tra thông tin và phản hồi lại bạn sớm.',
          sender: 'ai',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  // Table columns for staff data
  const columns = [
    {
      title: 'NPP',
      dataIndex: 'npp',
      key: 'npp',
      width: '25%',
    },
    {
      title: 'Nhân viên',
      dataIndex: 'nhanVien',
      key: 'nhanVien',
      width: '25%',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghiChu',
      key: 'ghiChu',
      width: '35%',
      render: (text) => {
        if (text.includes('Online')) {
          return <Text type="success">{text}</Text>;
        }
        return <Text type="warning">{text}</Text>;
      }
    },
    {
      title: 'Thời gian online cuối cùng',
      dataIndex: 'thoiGianOnline',
      key: 'thoiGianOnline',
      width: '15%',
    },
  ];

  return (
    <Layout style={{ height: 'calc(100vh - 64px)', overflow: 'hidden', paddingTop: '84px' }}>
      <Sider 
        width={300} 
        theme="light" 
        className="conversation-sidebar"
        style={{ 
          overflow: 'auto', 
          borderRight: '1px solid #f0f0f0',
          boxShadow: '2px 0 8px rgba(0,0,0,0.03)',
          height: '100%'
        }}
      >
        <div style={{ padding: '16px' }}>
          <Input
            className="search-input"
            placeholder="Search message..."
            prefix={<SearchOutlined />}
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          
          <List
            itemLayout="horizontal"
            dataSource={filteredConversations}
            renderItem={(item) => (
              <List.Item 
                className="conversation-item"
                style={{ 
                  padding: '12px 16px',
                  cursor: 'pointer',
                  backgroundColor: selectedChat?.id === item.id ? '#e6f7ff' : 'white',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}
                onClick={() => handleSelectChat(item)}
              >
                <List.Item.Meta
                  avatar={
                    <Badge count={item.unread} size="small">
                      <Avatar icon={<UserOutlined />} />
                    </Badge>
                  }
                  title={
                    <Space>
                      <Text strong>{item.name}</Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {item.date}
                      </Text>
                    </Space>
                  }
                  description={
                    <Text 
                      ellipsis={{ tooltip: item.lastMessage }}
                      style={{ 
                        width: '200px', 
                        display: 'block',
                        color: item.unread > 0 ? '#000' : '#8c8c8c',
                        fontWeight: item.unread > 0 ? 500 : 'normal'
                      }}
                    >
                      {item.lastMessage}
                    </Text>
                  }
                />
                <Text type="secondary" className="message-timestamp" style={{ marginLeft: '8px' }}>
                  {item.timestamp.split(' ')[1]}
                </Text>
              </List.Item>
            )}
          />
        </div>
      </Sider>
      
      <Layout className="conversation-main" style={{ background: '#fff', height: '100%' }}>
        {selectedChat ? (
          <>
            <Header style={{ 
              background: '#fff', 
              padding: '0 24px', 
              borderBottom: '1px solid #f0f0f0',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <Avatar 
                size="large" 
                icon={<UserOutlined />}
                style={{ marginRight: '12px' }}
              />
              <div>
                <Text strong style={{ fontSize: '16px' }}>{selectedChat.name}</Text>
                <div>
                  <Text type="secondary" className="message-timestamp">
                    <ClockCircleOutlined style={{ marginRight: '4px' }} />
                    {selectedChat.timestamp}
                  </Text>
                </div>
              </div>
            </Header>
            
            <Content style={{ 
              padding: '24px', 
              overflow: 'auto', 
              display: 'flex', 
              flexDirection: 'column',
              height: 'calc(100% - 128px)' // Subtract header and input area
            }}>
              <div style={{ flex: 1, overflow: 'auto' }}>
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    style={{ 
                      marginBottom: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <Card
                      className={`message-bubble ${message.sender}`}
                      style={{ 
                        borderRadius: '8px',
                        maxWidth: '80%',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                      }}
                      bodyStyle={{ padding: '12px 16px' }}
                    >
                      <div>
                        {message.text.split('\n').map((text, index) => (
                          <div key={index}>{text}</div>
                        ))}
                      </div>
                      
                      {message.staffData && (
                        <div style={{ marginTop: '16px' }}>
                          <Table 
                            className="staff-table"
                            columns={columns} 
                            dataSource={message.staffData}
                            size="small"
                            pagination={false}
                            bordered
                            style={{ marginTop: '8px' }}
                          />
                        </div>
                      )}
                    </Card>
                    <Text type="secondary" className="message-timestamp" style={{ marginTop: '4px' }}>
                      {message.timestamp.split(' ')[1]}
                    </Text>
                  </div>
                ))}
              </div>
            </Content>
            
            <div style={{ 
              padding: '16px 24px', 
              borderTop: '1px solid #f0f0f0',
              background: '#fff'
            }}>
              <Input.TextArea 
                className="message-input"
                placeholder="Type a message..." 
                autoSize={{ minRows: 1, maxRows: 4 }}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                style={{ padding: '8px 16px' }}
              />
              
              <div style={{ display: 'flex', marginTop: '8px', justifyContent: 'space-between' }}>
                <Space>
                  <Button 
                    className="action-button"
                    type="text" 
                    shape="circle" 
                    icon={<PaperClipOutlined />} 
                  />
                  <Button 
                    className="action-button"
                    type="text" 
                    shape="circle" 
                    icon={<SmileOutlined />} 
                  />
                </Space>
                <Button 
                  type="primary" 
                  icon={<SendOutlined />} 
                  onClick={handleSendMessage}
                  shape="round"
                >
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={4}>Welcome to Conversations</Title>
              <Paragraph type="secondary">
                Select a conversation to start messaging
              </Paragraph>
            </div>
          </div>
        )}
      </Layout>
    </Layout>
  );
};

export default ConversationsPage;