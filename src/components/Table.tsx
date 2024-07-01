import { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, Form, Select } from 'antd';
//import { convertToHTML } from 'draftjs-to-html';
import { DeleteOutlined, EditOutlined, EyeFilled } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
//import { v4 as uuid } from 'uuid';
import './Table.css'
interface Model {
  id: number;
  name: string;
  description: string;
  status: string;
  content: string;
  fontStyle: string;
  alignment: string;
  bold: boolean;
}

const TableComponent: React.FC = () => {
  const [data, setData] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [newRecord, setNewRecord] = useState(null);
  /*const convertDraftToHtml = (contentState:text) => {
    return convertToHTML(contentState);
  };*/

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Model>();
  const showDetailsModal = (record: any) => {
    setSelectedRecord(record);
    setIsDetailsModalVisible(true);
  };
 
  useEffect(() => {
    setData([
      { id: 1, name: 'نموذج 1', description: 'وصف نموذج 1', status: 'active', content: 'محتوى نموذج 1', fontStyle: 'normal', alignment: 'left', bold: false },
      { id: 2, name: 'نموذج 2', description: 'وصف نموذج 2', status: 'disactive', content: 'محتوى نموذج 2', fontStyle: 'italic', alignment: 'center', bold: true },
      
    ]);
  }, []);


  const pagination = {
    current: currentPage,
    pageSize: pageSize,
    total: data.length,
    onChange: (page: any) => setCurrentPage(page),
  };


  const showModal = (record?: Model) => {
    setSelectedModelId(record?.id || null);
    reset(record || {});
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleCreate = () => {
    setIsModalVisible(true);
  };
  /* const onSubmit = (values: Model) => {
     if (newRecord) {
     
       const updatedData = data.map((item) =>
         item.id === newRecord.id
           ? { id: newRecord.id, name: values.name,  }
           : item
       );
       setData(updatedData);
       setNewRecord(null);
     } else {
      
       const newRecord = { id: uuid(), name: values.name,  };
       setData([...data, newRecord]);
       setNewRecord(newRecord);
     }
     setIsModalVisible(false);
     reset();
   };*/

  const handleAdd = (values: any) => {
    const newRecord = { id: data.length + 1, ...values };
    setData([...data, newRecord]);
    setNewRecord(newRecord);
    setIsModalVisible(false);
  };


  const handleDelete = async (key: number) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setData(data.filter((item) => item.id !== key));
    setLoading(false);
  };


  const handleUpdate = async (values: Model) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const updatedData = data.map((item) => {
      if (item.id === values.id) {
        return { ...item, ...values };
      }
      return item;
    });
    setData(updatedData);
    setLoading(false);
    setIsModalVisible(false);
  };


  const showConfirmModal = (id: number) => {
    setSelectedModelId(id);
    setIsConfirmModalVisible(true);
  };


  const handleConfirmDelete = () => {
    if (selectedModelId !== null) {
      handleDelete(selectedModelId);
      setIsConfirmModalVisible(false);
    }
  };


  const columns = [
    {
      title: 'اسم النموذج',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'وصف النموذج',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => (status === 'active' ? <span className="text-white bg-green-800 rounded-xl p-2 font-bold'">Active</span> : <span className="text-white bg-red-600 rounded-xl p-2 font-bold0">DisActive</span>),
    },
    {
      title: 'محتوى النموذج',
      key: 'action',
      render: (text: any, record: any) => (
        <Button className="bg-gray-200" onClick={() => showDetailsModal(record)}>
          <EyeFilled />
        </Button>
      ),
    },
    {

      key: 'edit',
      render: (text: any, record: any) => (
        <Button className="bg-blue-800 font-bold text-white" icon={<EditOutlined />} >
          تعديل
        </Button>

      ),
    },
    {

      key: 'delete',
      render: (text: any, record: any) => (
        <Button className="bg-red-600 font-bold text-white" icon={<DeleteOutlined />} onClick={() => showConfirmModal(record.id)}>
          حذف
        </Button>
      ),
    },
  ];

  return (
    <div dir="rtl" className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">نماذج العقود</h1>
        <Button className="bg-blue-800 font-bold" onClick={handleCreate}>
          إنشاء نموذج
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={newRecord ? [...data, newRecord] : data}
        loading={loading}
        pagination={pagination}
        rowKey="id"

      />

     
      <Modal
        title="إنشاء نموذج عقد"
        visible={isModalVisible}
        onOk={handleAdd}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="deletmodal"
      >
        <Form

          layout="vertical"
        //onFinish={handleSubmit(onSubmit)}

        >
          <Form.Item label="اسم النموذج" name="name" rules={[{ required: true, message: 'الرجاء إدخال اسم النموذج' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="وصف النموذج" name="description" rules={[{ required: true, message: 'الرجاء إدخال وصف النموذج' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="الحالة" name="status">
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="disactive">Disactive </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="محتوى النموذج" name="content"  >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              حفظ
            </Button>
            <Button type="dashed" onClick={handleCancel}>
              إلغاء
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="تفاصيل النموذج"
        visible={isDetailsModalVisible}
        onCancel={() => setIsDetailsModalVisible(false)}
        footer={null}
        className="deletmodal"
      >
        {selectedRecord && (
          <>
            <p><strong>اسم النموذج:</strong> {selectedRecord.name}</p>
            <p><strong>وصف النموذج:</strong> {selectedRecord.description}</p>
            <p><strong>الحالة:</strong> {selectedRecord.status}</p>
          
          </>
        )}
      </Modal>
  
      <Modal
        className='deletmodal'
        title="تأكيد الحذف"
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        onOk={handleConfirmDelete}
        okText="نعم"
        cancelText="لا"


      >
        <p> هل أنت متأكد من حذف نموذج العقد؟</p>
      </Modal>
    </div>
  );
};

export default TableComponent;