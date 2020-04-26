import React from "react";

import classes from "./Activation.module.less";
import { Button } from "antd";

interface IProps {
  handleSubmit: () => void;
  isLoading: boolean;
}

const Activate: React.FC<IProps> = ({ handleSubmit, isLoading }) => {
  return (
    <section className={classes.activation}>
      <div className={classes.activation__header}>
        <h3>Подтверждение почтового адреса</h3>
        <p>
          Для того, чтобы воспользоваться нашим сайтом - необходимо подтвердить
          адрес электронной почты.
        </p>
      </div>
      <div className={classes.activation__button}>
        <Button
          type="primary"
          size="large"
          onClick={handleSubmit}
          loading={isLoading}
        >
          Подтвердить
        </Button>
      </div>
    </section>
  );
};

export default Activate;
