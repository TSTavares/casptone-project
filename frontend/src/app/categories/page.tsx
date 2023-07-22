"use client"

import Image from 'next/image'
import styles from '../page.module.css'
import { Card, Button, Modal, Form, Input, Tag, Row, Col } from 'antd';
import { Progress } from 'antd';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useContext, useState } from "react";
import { MyContext } from "../../context/contextProvider";

const fetcher = (url: any) => fetch(url).then(res => res.json())

const { Meta } = Card;

export default function CategoriesPage() {
  // This is for the context 
  const {userName,updateUserName, loggedIn, updateLoggedIn} = useContext(MyContext);

  const { data: transactionData, error, isLoading } = useSWR(`http://localhost:3001/transaction//transaction-by-user?userName=${userName}`, fetcher)

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedTags, setSelectedTags] = useState([]);
 

  const cardsData = [
    { title: 'Rent or Mortgage', image: '/image3/image1-rent.jpg' },
    { title: 'Household Bills', image: '/image3/image2-household bills.jpg' },
    { title: 'Groceries', image: '/image3/image4-groceries.png' },
    { title: 'Transport', image: '/image3/image7-transport.jpg' },
    { title: 'Medical Healthcare', image: '/image3/image5-medical.jpg' },
    { title: 'Education', image: '/image3/image6-education.jpg' },
    { title: 'Personal Care', image: '/image3/image8-personal care.png' },
    { title: 'Entertainment', image: '/image3/image3-entertainment.jpg' },
    { title: 'Income', image: '/image3/Image10 - money-640x400.jpg' },
    { title: 'Savings', image: '/image3/image9-saving.jpg' },
  ];

  const handleCardClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log('Value:', values.value);
      console.log('Note:', values.note);
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const isTagSelected = (tag) => selectedTags.includes(tag);

  return (
  
    <div>
       {loggedIn?
       <div>
        <p>Hello {userName}</p>
        <button onClick={()=>updateLoggedIn(false)}>Logout</button>
        </div>
        :
        <p>Please login</p>
        }
        <div>
          <Image
            className={styles.logoCategoriesPage}
            loader={({ src }) => src}
            src="/image/logomoneyminder.jpg"
            alt="Logo Money Minder"
            width={80}
            height={80}
            />
        </div>
        <div className={styles.navigation}>
          
            <Link href="/">
              <Button className={styles.navigationButton}>Home</Button>
            </Link>
            <Link href="categories">
              <Button className={styles.navigationButton}>Categories</Button>
            </Link>
            <Link href="/dashboard">
              <Button className={styles.navigationButton}>Dashboard</Button>
            </Link>
            <Link href="/login">
              <Button className={styles.navigationButton}>Login</Button>
            </Link>
     
      </div>
      <h1 className={styles.titleCategories}>Categories</h1>
      
      
      <div className={styles.filterContainer}>
        <Tag.CheckableTag
          checked={selectedTags.length === 0}
          onChange={() => setSelectedTags([])}
        >
          All
        </Tag.CheckableTag>
        {cardsData.map((card) => (
          <Tag.CheckableTag
            key={card.title}
            checked={isTagSelected(card.title)}
            onChange={() => handleTagSelect(card.title)}
          >
            {card.title}
          </Tag.CheckableTag>
        ))}
      </div>

      <div className={styles.categoriesContainer}>
        {cardsData
          .filter((card) => selectedTags.length === 0 || isTagSelected(card.title))
          .map((card, index) => (
            <Card className={styles.categoriesCardImage}
            key={index}
            hoverable
            style={{ width: 240 }}
            cover={
              <Image
                loader={({ src }) => src}
                src={card.image}
                alt={card.title}
                width={240}
                height={240}
                
              />
            }
            onClick={handleCardClick}
          >
            <Meta title={card.title} />
          </Card>
        ))}
      </div>

      <Modal
        title="Category"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="value"
            label="Value"
            rules={[
              {
                required: true,
                message: 'Please enter the value',
              },
            ]}
          >
            <Input placeholder="Enter the value" />
          </Form.Item>
          <Form.Item
            name="note"
            label="Note"
            rules={[
              {
                required: true,
                message: 'Please enter a note',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter a note" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  
  );
}






