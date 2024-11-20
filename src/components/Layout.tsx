import React, { useState, useEffect, useContext } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { HomeFilled, InfoCircleFilled, LikeFilled, LoginOutlined, LogoutOutlined, ProductFilled, UserAddOutlined } from '@ant-design/icons';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AccountContext } from '../contexts/AccountContext'; 
import { accountService } from '../services/accountsService';

const { Header, Content, Footer, Sider } = Layout;

interface Category {
  name: string;
}

const LayoutAnt: React.FC = () => {
  const { pathname } = useLocation();
  const [current, setCurrent] = useState<string>(pathname);
  const [selectedMenu, setSelectedMenu] = useState<string>(pathname);
  const [categories, setCategories] = useState<Category[]>([]); 

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Categories/GetAll`);
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, ); 

  const items = [
    {
      key: "/",
      label: <Link to="/">Home</Link>,
      icon: <HomeFilled />,
    },
    {
      key: "/news",
      label: <Link to="/news">News</Link>,
      icon: <ProductFilled />,
    },
    {
      key: '/favorites',
      label: "Favorites",
      icon: <Link to="/favorites"><LikeFilled /></Link>,
    },
    {
      key: "/about",
      label: <Link to="/about">About</Link>,
      icon: <InfoCircleFilled />,
    },
  ];

  const sidebarMenuItems = categories.map((category) => ({
    key: `/news/${category.name}`,
    label: <Link to={`/news/${category.name}`}>{category.name}</Link>,
  }));

  const handleMenuClick = (e: { key: string }) => {
    setCurrent(e.key);
    setSelectedMenu(e.key); // Оновлення вибраного пункту меню
  };

  const context = useContext(AccountContext); 

  // Ensure context is not null before accessing its properties
  if (!context) {
    return null; // Or a fallback UI like a loading spinner or an error message
  }

  const { account, isAuth, clear } = context;

  return (
    <Layout className="LayoutAnt">
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          items={items}
          onClick={handleMenuClick}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <div>
          {isAuth() ? (
            <>
              <span style={{ color: '#bfbfbf', padding: "10px" }}>Hello, {account?.email}</span>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={() => {
                  accountService.logout();
                  clear(); // Очищаємо контекст
                }}
                style={{
                  color: '#bfbfbf',
                  fontSize: '16px',
                  height: 64,
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  type="text"
                  icon={<LoginOutlined />}
                  style={{
                    color: '#bfbfbf',
                    fontSize: '16px',
                    height: 64,
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  type="text"
                  icon={<UserAddOutlined />}
                  style={{
                    color: '#bfbfbf',
                    fontSize: '16px',
                    height: 64,
                  }}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </Header>

      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            items={sidebarMenuItems}
            onClick={(e) => setSelectedMenu(e.key)}
            style={{
              height: '100%',
              borderRight: 0,
            }}
          />
        </Sider>

        <Content
          className="main"
          style={{
            padding: '0 48px',
            margin: '24px 0',
          }}
        >
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default LayoutAnt;
