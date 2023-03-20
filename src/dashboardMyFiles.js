import { Space, Table, Input, Button, Badge, Tag } from "antd";
import { useState, useEffect } from "react";
import Popup from "./assign.js";

let data = [];

const getOptions = async () => {
  try {
    const response = await fetch("/api/users");
    const data = await response.json();
    console.log(data.res);
    const uniqueEmails = [...new Set(data.res.map((user) => user.user_email))];
    return uniqueEmails;
  } catch (error) {
    console.error(error);
  }
};

const DashboardMyFiles = () => {
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  useEffect(() => {
    fetch("/api/users/test@test.com") // TODO: replace with current user's email using cognito getcurrentuser get email and use it here... not good but fine for mvp
      .then((response) => response.text())
      .then((body) => {
        const parsedBody = JSON.parse(body);
        let userId = parsedBody.user_id;
        fetch(`/api/userOwnedDocuments/${userId}`)
          .then((response) => response.text())
          .then((body) => {
            const parsedBody = JSON.parse(body);
            data = parsedBody.res;
            setDataSource(data);
          });
      });
  }, []);

  const columns = [
    {
      title: "File",
      dataIndex: "document_name",
      key: "document_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Associated users",
      dataIndex: "associated_users",
      key: "associated_users",
      // render an antd Tag for each associated user
      render: (list) => (
        <>
          {list !== null ? (
            <Tag color={"red"} key={list}>
              {"No other users associated"}
            </Tag>
          ) : (
            list.map((tag) => {
              return (
                <Tag color={"green"} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "document_status",
      key: "document_status",
      // render a antd Badge with success or error status depending on the value of the document_status {"Signed", "Unsigned""}
      render: (text) => (
        <>
          {text === "Signed" ? (
            <Badge status="success" text={text} />
          ) : (
            <Badge status="error" text={text} />
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={showModal}>
            Share{" "}
          </Button>
          <Popup
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            options={options}
          />
          <Button type="primary">Delete</Button>
        </Space>
      ),
    },
  ];

  const FilterByNameInput = (
    <Input
      placeholder="Input Search Text"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = data.filter((entry) =>
          entry.name.includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );

  return (
    <>
      <Space>
        <div>{FilterByNameInput}</div>
        <Button href="/upload" type="primary">
          Add File
        </Button>
      </Space>
      <Table
        columns={columns}
        pagination={{
          position: "bottomRight",
        }}
        dataSource={data}
      />
    </>
  );
};

export default DashboardMyFiles;
