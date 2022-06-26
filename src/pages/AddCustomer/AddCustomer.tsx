import React, { useState } from "react";
import { Input, Button, Form, List, Avatar, Calendar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import {
  useGetCustomer,
  useAddCustomerData,
  useDeleteCustomer,
} from "../../hooks/useCustomerHooks";
// import Calendar from "../../components/Calendar/Calendar";

type Person = { name: string; description: string };

const AddCustomer: React.FC = () => {
  const [userData, setUserData] = useState<Person>({
    name: "",
    description: "",
  });
  const [calendarOn, setCalendarOn] = useState(false);

  const onSuccess = (data: string) => {
    console.log("====", data);
  };
  const onError = (error: Error) => {
    console.log("====", error);
  };

  const setUserDataHandler = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  //기존에 있던 데이터들 가져오기
  const { isLoading, data, isFetching } = useGetCustomer(onSuccess, onError);

  // 새로 넣을 데이터
  const { mutate: AddCustomer } = useAddCustomerData();
  const { mutate: DeleteCustomerData } = useDeleteCustomer();

  const handleAddCustomer = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    AddCustomer(userData);
  };

  const handleDeleteCutomer = (id: number) => {
    return (event: React.MouseEvent) => {
      DeleteCustomerData(id);
      window.location.reload();
    };
  };

  if (isLoading || isFetching) {
    return <h2>Loading</h2>;
  }

  return (
    <>
      <Form
        name="wrap"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        onSubmitCapture={handleAddCustomer}
      >
        <Form.Item label="유저이름" rules={[{ required: true }]}>
          <Input
            className="width-20"
            placeholder="유저 이름"
            name="name"
            prefix={<UserOutlined />}
            onChange={setUserDataHandler}
          />
        </Form.Item>
        <br />
        <br />
        <Form.Item label="유저 정보" rules={[{ required: true }]}>
          <Input
            placeholder="유저 정보"
            prefix={<UserOutlined />}
            name="description"
            onChange={setUserDataHandler}
          />
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            AddCustomer
          </Button>
        </Form.Item>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={data.data}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.description}
            />
            <Button
              type="primary"
              htmlType="button"
              onClick={handleDeleteCutomer(item.id)}
            >
              delete
            </Button>
          </List.Item>
        )}
      />
      <Button
        type="primary"
        onClick={() => {
          setCalendarOn(!calendarOn);
        }}
      >
        Calendar
      </Button>

      {/* <Calendar /> */}
      <Calendar />
    </>
  );
};

export default AddCustomer;
