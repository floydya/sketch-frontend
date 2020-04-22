import React from "react";
import { Result, Button } from "antd";

interface IProps {
  errors: string[];
  handleSubmit: () => void;
  isLoading: boolean;
}

const Error: React.FC<IProps> = ({ errors, handleSubmit, isLoading }) => {
  return (
    <Result
      status="error"
      title="Возникла ошибка"
      subTitle={errors.map((el) => (
        <p>{el}</p>
      ))}
      extra={[
        <Button type="primary" onClick={handleSubmit} loading={isLoading}>
          Попробовать снова
        </Button>,
      ]}
    />
  );
};

export default Error;
