
import { Form, Input, Button, Select, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { useForm } from 'react-hook-form';

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

const MyForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Model>();

  const onFinish = (values: Model) => {
    console.log('Success:', values);

    reset();
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onFinish)}
      className="mx-auto max-w-md"
    >
      <Form.Item
        label="اسم النموذج"
        name="name"
        rules={[{ required: true, message: 'الرجاء إدخال اسم النموذج' }]}
        className="mb-4"
      >
        <Input
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </Form.Item>

      <Form.Item
        label="وصف النموذج"
        name="description"
        rules={[{ required: true, message: 'الرجاء إدخال وصف النموذج' }]}
        className="mb-4"
      >
        <Input.TextArea
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </Form.Item>

      <Form.Item label="الحالة" name="status" className="mb-4">
        <Select
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="disactive"> Disactive</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="محتوى النموذج" name="content" className="mb-4">
        <Input.TextArea
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </Form.Item>


      <Form.Item className="text-center">
        <Button
          type="primary"
          htmlType="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
        >
          إرسال
        </Button>
      </Form.Item>
    </Form>
  );
};



export default MyForm;