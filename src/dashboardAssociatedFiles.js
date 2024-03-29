import { Table, Badge, Tag, Button } from 'antd';
import React, { useEffect, useState } from 'react';



let data = [];

const DashboardAssociatedFiles = (props) => {
  const columns = [
    {
      title: "File",
      dataIndex: "document_name",
      key: "document_name",
      render: (text, record) => <Button type="link" href={`view?document_id=${encodeURI(record.document_id)}&file=${encodeURI(record.document_name)}&email=${encodeURI(props.currentUser.email)}`}>{text}</Button>,
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
  ];

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetch("/api/users/" + props.currentUser.email) // TODO: replace with current user's email using cognito getcurrentuser get email and use it here... not good but fine for mvp
      .then((response) => response.text())
      .then((body) => {
        const parsedBody = JSON.parse(body);
        let userId = parsedBody.user_id;
        fetch(`/api/userAccessibleDocuments/${userId}`).then((response) =>
          response.text()
        ).then((body) => {
          let parsedBody = JSON.parse(body);
          data = parsedBody.res;
          setDataSource(data);
        }
        );
      });
  }, []);

  return (
      <Table
        columns={columns}
        pagination={{
          position: 'bottomRight',
        }}
        dataSource={dataSource}
      />
  );
};

export default DashboardAssociatedFiles;
