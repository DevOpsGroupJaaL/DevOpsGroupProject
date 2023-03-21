import { Space, Table, Input, Button, Badge, Tag } from "antd";
import { useState, useEffect } from "react";
import Popup from "./assign.js";
import { render } from "@testing-library/react";
import { getCurrentUser } from "./auth.js";

let data = [];

const getOptions = async () => {
  try {
    const response = await fetch("/api/users");
    const data = await response.json();
    const uniqueUsers = [...new Set(data.res.map((user) => user))];
    return uniqueUsers;
  } catch (error) {
    console.error(error);
  }
};

const DashboardMyFiles = (props) => {
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  useEffect(() => {
    // localStorage.getItem("accessToken")
    // getCurrentUser(localStorage.getItem("accessToken"))
    //   .then((response) => response.text()) 
    //   .then((body) => {
    //     const parsedBody = JSON.parse(body);
    //     let userId = parsedBody.user_id;
    //     fetch(`/api/userOwnedDocuments/${userId}`)
    //       .then((response) => response.text())
    //       .then((body) => {
    //         const parsedBody = JSON.parse(body);
    //         data = parsedBody.res;
    //         setDataSource(data);
    //       });
    //   });
    console.log("MyFiles");
    console.log(props.currentUser.email);

    fetch("/api/users/" + props.currentUser.email) // TODO: replace with current user's email using cognito getcurrentuser get email and use it here... not good but fine for mvp
      .then((response) => response.text())
      .then((body) => {
        const parsedBody = JSON.parse(body);
        let userId = parsedBody.user_id;
        fetch(`/api/userOwnedDocuments/${userId}`)
          .then((response) => response.text())
          .then((body) => {
            const parsedBody = JSON.parse(body);
            const reducedParsedBody = parsedBody.res.reduce((acc, curr) => {
              const index = acc.findIndex((item) => item.document_id === curr.document_id);

              if (index === -1) {
                acc.push({
                  document_id: curr.document_id,
                  document_path: curr.document_path,
                  document_name: curr.document_name,
                  document_status: curr.document_status,
                  owner_user_id: curr.owner_user_id,
                  user_email: [curr.user_email]
                });
              } else {
                acc[index].user_email.push(curr.user_email);
              }

              return acc;
            }, []);
            data = reducedParsedBody.res;
            setDataSource(data);
          });
      });
  }, [props]);

  const columns = [
    {
      title: "File",
      dataIndex: "document_name",
      key: "document_name",
      render: (text, record) => <Button type="link" href={`view?file=${record.document_name}`}>{text}</Button>,
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
                  {tag}
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
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setRecord(record);
              showModal();
            }}
          >
            Share
          </Button>

          <Button
            type="primary"
            onClick={() => {
              console.log(record);
            }}
          >
            Delete
          </Button>
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
      <Popup
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        options={options}
        record={record}
      />
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
